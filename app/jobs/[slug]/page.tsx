"use client"

import Link from "next/link";
import { FcMoneyTransfer } from 'react-icons/fc'
import { MdLocationPin } from "react-icons/md"
import { BsFillBriefcaseFill, BsCalendar2XFill } from "react-icons/bs"
import { TbBulb } from "react-icons/tb"
import { GrUserWorker } from "react-icons/gr"
// import Image from "next/image";
import JobListItem from "@/components/JobListItem/JobListItem";
import { JobItem } from "@/types/Job";
import ApplyToJob from "@/components/ApplyToJob/ApplyToJob";
import { useEffect, useState } from "react";

type Param = {
    params: {
        slug: string
    }
}

const JobPage = ({ params }: Param) => {
    const [refresh, setRefresh] = useState<Number>(0)
    const [job, setJob] = useState<JobItem | null>(null)
    const [jobs, setJobs] = useState<JobItem[] | []>([])
    const { slug } = params;

    useEffect(() => {
        fetch(`/api/jobs/${slug}`)
            .then(res => res.json())
            .then(data => setJob(data))
    }, [refresh])

    useEffect(() => {
        fetch('/api/jobs')
            .then(res => res.json())
            .then(data => setJobs(data))
    }, [])



    // job experience converter
    const jobEperienceString = (experience: number) => {
        if (experience < 2) return "Entry Level"

        else if (experience > 2 && experience <= 5) return "Mid Level"

        return "Senior Level"
    }

    return (
        <main>
            {
                job
                &&
                <section className="lg:px-12 sm:px-8 x-sm:px-4 md:flex-row x-sm:flex-col py-10 flex gap-4 max-w-[1300px] mx-auto">
                    <div className="p-4 border-blue-200 border-2 rounded-[10px] md:max-w-[500px] sm:w-full md:min-w-[300px] flex-1">
                        {/* job title */}
                        <h1 className="text-[2rem] font-[600] text-blue-500">{job?.job_title}</h1>
                        {/* company and experience details */}
                        <h2>
                            <span>at </span>
                            <Link href={""} className="underline font-[600]">{job?.company_title}</Link>
                            <span className="text-sm"> {`(${jobEperienceString(job?.experience)})`}</span>
                        </h2>
                        {/* other job details */}
                        <div className="text-gray-600 text-sm py-4 flex flex-col gap-2">
                            <p className="flex gap-1 items-center">
                                <FcMoneyTransfer />
                                <span>Salary: {job?.salary_range.from.toLocaleString()} PKR to {job?.salary_range.to.toLocaleString()} PKR</span>
                            </p>
                            <p className="flex gap-1 items-center">
                                <MdLocationPin className="text-blue-500" />
                                <span>Location: {job?.city}</span>
                            </p>
                            <p className="flex gap-1 items-center">
                                <BsFillBriefcaseFill className="text-blue-500" />
                                <span>Job type: {job?.job_type}</span>
                            </p>
                            <p className="flex gap-1 items-center">
                                <BsCalendar2XFill className="text-red-500" />
                                <span>Apply before: {new Date(job?.deadline).toLocaleDateString()}</span>
                            </p>
                            <p className="flex gap-1 items-center">
                                <TbBulb className="text-orange-500" />
                                <span>Skills : {job?.skills_required?.length! > 0 && job?.skills_required.map((skill: string, index: number) => `${skill}${index !== job?.skills_required.length - 1 ? "," : "."} `)}</span>
                            </p>
                            <p className="flex gap-1 items-center">
                                <GrUserWorker />
                                <span>{job?.applications?.length} candidates have already applied.</span>
                            </p>
                        </div>
                        {/* button */}
                        <div className="flex items-center gap-4 mt-4 mb-8 px-4">
                            <ApplyToJob slug={slug} setRefresh={setRefresh} refresh={refresh} />
                        </div>
                        {/* recruiter */}
                        {/* <div className="flex gap-2 items-center p-2 border-blue-200 border-2 rounded-[10px]">
                        <Image className="rounded-full h-[40px] w-[40px] object-cover" src={job.author.img} alt={job.author.name} width={60} height={60} />
                        <p className="flex flex-col leading-none gap-2">
                            <Link href={""}>{job.author.name}</Link>
                            <span className="text-[12px]">is recruiting.</span>
                        </p>
                    </div> */}
                        {/* job description */}
                        <div className="p-2">
                            <h2 className="text-lg font-[600] underline mb-2">Job Description:</h2>
                            <p>{job?.description}</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-[2.5rem] font-[600] text-blue-500 text-center mb-8">Related Jobs</h2>
                        <div className="flex flex-col gap-4">
                            {
                                jobs.length > 0
                                &&
                                jobs.filter(curJob => curJob.slug !== slug).slice(0, 5).map((job, index) => <JobListItem key={index} job={job} />)
                            }
                        </div>
                    </div>
                </section>
            }
        </main>
    )
}

export default JobPage