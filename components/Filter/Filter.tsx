import { JobItem } from "@/types/Job"
import { ChangeEvent, Dispatch, SetStateAction } from "react"

type Props = {
    name: String,
    filterTitles: String[],
    setFilteredJobs: Dispatch<SetStateAction<JobItem[] | []>>,
    jobs: JobItem[]
}


const Filter = ({ name, filterTitles, setFilteredJobs, jobs }: Props) => {
    let filtered = jobs

    const setFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        // if the job_type filter is changed
        if (e.target.name === "job_type") {
            filtered = jobs.filter(job => job.job_type.toLowerCase() === e.target.value)
            if (e.target.value === "job type") {
                filtered = jobs
            }
        }

        // if the experience 
        if (e.target.name === "experience") {
            if (e.target.value !== "experience") {
                const filterYears = e.target.value.split("(")[1].split(" ")[0].split("-")

                filtered = jobs.filter(job => {
                    if (filterYears[0] === "5+") {
                        return job.experience > 5
                    }
                    return job.experience >= +filterYears[0] && job.experience <= +filterYears[1]
                })
            } else {
                filtered = jobs
            }
        }
        setFilteredJobs(filtered)
    }


    return (
        <select name={`${name}`} className='p-4 rounded cursor-pointer bg-white' onChange={setFilter}>
            {
                filterTitles.map((filterTitle, index) => {
                    return (
                        <option key={index} value={`${filterTitle.toLowerCase()}`} className="p-4">{filterTitle}</option>
                    )
                })
            }
        </select>
    )
}

export default Filter