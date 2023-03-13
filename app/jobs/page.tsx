"use client"

import Filter from '@/components/Filter/Filter'
import JobListItem from '@/components/JobListItem/JobListItem'
import { jobs } from '@/data/Jobs'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Jobs = {
    company: string,
    author: {
        name: string,
        img: string,
        profile_link: string
    },
    title: string,
    slug: string,
    description: string,
    vacancies: number,
    location: string,
    job_type: string,
    applicants: number,
    skills_required: string[],
    experience: number,
    salary_range: {
        from: number,
        to: number,
    },
    deadline: string,
}


const Jobs = () => {
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [jobsToShow, setJobsToShow] = useState<Jobs[]>([])
    const search = useSearchParams()
    const query = search?.get("query")

    useEffect(() => {
        if (query) {
            const filteredJobs: Jobs[] = jobs.filter((job): job is Jobs & { title: string } => {
                return job.title.toLowerCase().includes(query) || job.slug.toLowerCase().includes(query)
            });
            setJobsToShow(filteredJobs)
        } else {
            setJobsToShow(jobs)
        }
    }, [])

    return (
        <main>
            {/* hero section */}
            <section className='px-12 py-16 min-h-[400px] text-center bg-gradient-to-r from-sky-500 to-indigo-500'>
                <h2 className='text-[4rem] font-[600] text-white'>Search Jobs!</h2>
                <p className='text-center mb-16 text-[1.5rem] text-gray-200'>Enter the job title and city we will find the best for you!</p>
                {/* search form */}
                <form className='flex items-end gap-4 max-w-[1000px] mx-auto bg-white rounded-[10px] p-4'>
                    <div className='flex flex-col gap-2 text-left flex-1'>
                        <label htmlFor="jobTitle" className='pl-1 cursor-pointer text-blue-500 font-[600]'>Job Title</label>
                        <input type="search" placeholder='Ex: Software Engineer' id="jobTitle" className='border-blue-200 border-2 p-2 rounded-[10px] outline-none' />
                    </div>
                    <div className='flex flex-col gap-2 text-left flex-1'>
                        <label htmlFor="jobLocation" className='pl-1 cursor-pointer text-blue-500 font-[600]'>Location</label>
                        <input type="search" placeholder='Ex: Sukkur' id="jobLocation" className='border-blue-200 border-2 p-2 rounded-[10px] outline-none' />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded mb-[3px]">Search</button>
                </form>
            </section>

            {/* jobs section */}
            <section className='px-12 py-12 flex gap-4'>
                {/* filters */}
                <div className='flex flex-col gap-4  bg-gradient-to-r from-sky-500 to-indigo-500  max-w-[250px] px-4 py-8 rounded-[10px] h-fit sticky top-[1rem]'>
                    {/* salary range filter */}
                    <Filter filterTitles={["Salary Range", "10,000 - 30,000", "30,000 - 50,000", "50,000 - 100,000", "100,000+"]} />
                    {/* job type filter */}
                    <Filter filterTitles={["Job Type", "Remote", "On-site", "Hybrid"]} />
                    {/* location filter */}
                    <Filter filterTitles={["Location", "Punjab", "Sindh", "Balochistan", "KPK", "AJK"]} />
                    {/* experience level filter */}
                    <Filter filterTitles={["Experience Level", "Intern", "Entry Level (0-2 years)", "Mid Level (2-5 years)", "Senior Level (5+ years)"]} />
                    {/* posted at filter */}
                    <Filter filterTitles={["Posted At", "Today", "A week ago", "A month ago", "More than a month ago"]} />
                </div>
                {
                    jobsToShow.length > 0
                        ?
                        <div className='flex-1 flex flex-col gap-6 items-center'>
                            {
                                jobsToShow.slice(page * limit - limit, page * limit).map((job, index) => <JobListItem key={index} job={{ title: job.title as string, salary_range: job.salary_range, location: job.location, job_type: job.job_type, deadline: job.deadline, slug: job.slug }} />)
                            }
                            <div className='flex items-center gap-2'>
                                {
                                    page !== 1
                                        ?
                                        <span className='h-[40px] w-[40px] flex justify-center items-center rounded-full border-blue-200 border-2 cursor-pointer text-xl' onClick={() => setPage(prev => prev - 1)}>&larr;</span>
                                        :
                                        ""
                                }
                                {
                                    [...Array(Math.ceil(jobsToShow.length / limit))].map((_, index) => {
                                        return <span className={`h-[40px] w-[40px] flex justify-center items-center rounded-full border-blue-200 border-2 cursor-pointer ${index + 1 === page ? "bg-blue-500 text-white" : ""}`} key={index} onClick={() => setPage(index + 1)}>{index + 1}</span>
                                    })
                                }
                                {
                                    jobsToShow.length > 10 && Math.ceil(jobs.length / limit) !== page
                                        ?
                                        <span className='h-[40px] w-[40px] flex justify-center items-center rounded-full border-blue-200 border-2 cursor-pointer text-xl' onClick={() => setPage(prev => prev + 1)}>&rarr;</span>
                                        :
                                        ""
                                }
                            </div>
                        </div>
                        :
                        <p className='text-center my-4 w-full'>No such jobs available.</p>
                }
            </section>
        </main>
    )
}

export default Jobs