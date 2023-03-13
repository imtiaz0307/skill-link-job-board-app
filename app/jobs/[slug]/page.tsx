import { jobs } from "@/data/Jobs";
import Link from "next/link";
import { FcMoneyTransfer } from 'react-icons/fc'
import { MdLocationPin } from "react-icons/md"
import { BsFillBriefcaseFill, BsCalendar2XFill } from "react-icons/bs"
import { TbBulb } from "react-icons/tb"
import { GrUserWorker } from "react-icons/gr"
import Image from "next/image";

type Param = {
    params: {
        slug: string
    }
}

const JobPage = ({ params }: Param) => {
    const { slug } = params;
    const job = jobs.filter(job => job.slug === slug)[0]

    // job experience converter
    const jobEperienceString = (experience: number) => {
        if (experience < 2) return "Entry Level"

        else if (experience > 2 && experience <= 5) return "Mid Level"

        return "Senor Level"
    }

    return (
        <main>
            <section className="px-12 py-10 flex gap-4">
                <div className="p-4 border-blue-200 border-2 rounded-[10px] max-w-[500px]">
                    {/* job title */}
                    <h1 className="text-[2rem] font-[600] text-blue-500">{job.title}</h1>
                    {/* company and experience details */}
                    <h2>
                        <span>at </span>
                        <Link href={""} className="underline font-[600]">{job.company}</Link>
                        <span className="text-sm"> {`(${jobEperienceString(job.experience)})`}</span>
                    </h2>
                    {/* other job details */}
                    <div className="text-gray-600 text-sm py-4 flex flex-col gap-2">
                        <p className="flex gap-1 items-center">
                            <FcMoneyTransfer />
                            <span>Salary: {job.salary_range.from.toLocaleString()} PKR to {job.salary_range.to.toLocaleString()} PKR</span>
                        </p>
                        <p className="flex gap-1 items-center">
                            <MdLocationPin className="text-blue-500" />
                            <span>Location: {job.location}</span>
                        </p>
                        <p className="flex gap-1 items-center">
                            <BsFillBriefcaseFill className="text-blue-500" />
                            <span>Job type: {job.job_type}</span>
                        </p>
                        <p className="flex gap-1 items-center">
                            <BsCalendar2XFill className="text-red-500" />
                            <span>Apply before: {job.deadline}</span>
                        </p>
                        <p className="flex gap-1 items-center">
                            <TbBulb className="text-orange-500" />
                            <span>Skills : {job.skills_required.map(skill => `${skill}, `)}</span>
                        </p>
                        <p className="flex gap-1 items-center">
                            <GrUserWorker />
                            <span>{job.applicants} candidates have already applied.</span>
                        </p>
                    </div>
                    {/* button */}
                    <div className="flex items-center gap-4 mt-4 mb-8 px-4">
                        <button className="border-blue-500 border-[1px] bg-blue-500 text-white py-2 px-6 text-sm rounded">Apply Now</button>
                        <button className="border-blue-500 border-[1px] bor text-blue-500 py-2 px-6 text-sm rounded">Save</button>
                    </div>
                    {/* recruiter */}
                    <div className="flex gap-2 items-center p-2 border-blue-200 border-2 rounded-[10px]">
                        <Image className="rounded-full h-[40px] w-[40px] object-cover" src={job.author.img} alt={job.author.name} width={60} height={60} />
                        <p className="flex flex-col leading-none gap-2">
                            <Link href={""}>{job.author.name}</Link>
                            <span className="text-[12px]">is recruiting.</span>
                        </p>
                    </div>
                    {/* job description */}
                    <div className="p-2">
                        <h2 className="text-lg font-[600] underline mb-2">Job Description:</h2>
                        <p>{job.description}</p>
                    </div>
                </div>
                <div>related jobs will be shown here</div>
            </section>
        </main>
    )
}

export default JobPage