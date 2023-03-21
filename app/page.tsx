"use client"

import Image from "next/image";
import { features } from "@/data/features";
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import Link from "next/link";
import JobListItem from "@/components/JobListItem/JobListItem";
import { resources } from "@/data/resources";
import ResourceCard from "@/components/ResourceCard/ResourceCard";
import { useEffect, useRef, useState } from "react";
import { JobItem } from "@/types/Job";

export default function Home() {
  const [jobs, setJobs] = useState<JobItem[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const redirectLinkRef = useRef<HTMLAnchorElement | null>(null)

  // getting all the jobs
  useEffect(() => {
    const getJobs = async () => {
      const response = await fetch('/api/jobs')
      const data = await response.json()
      setJobs(data)
    }
    getJobs()
  }, [])

  // search handler
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchQuery) return;
    if (redirectLinkRef.current) {
      redirectLinkRef.current.click()
    }
    setSearchQuery("")
  }

  return (
    <main>
      {/* hero section */}
      <section className="flex justify-center bg-gradient-to-r from-sky-500 to-indigo-500">
        <div className="max-w-[1300px] lg:px-12 sm:px-8 x-sm:px-4 min-h-[600px] max-h-600 flex justify-between gap-4 overflow-hidden">
          {/* hero left */}
          <div className="flex-[2] flex flex-col justify-center">
            <h1 className="lg:text-[8rem] sm:text-[5rem] x-sm:text-[3.5rem] font-bold leading-none text-white">SkillLink</h1>
            <h3 className="lg:text-[2rem] sm:text-[1.6rem] x-sm:text-[1.1rem] font-[600] leading-tight my-4 text-white">Linking Talent. Unlocking Potential.</h3>
            <p className="text-gray-200 mb-20 lg:text-[1rem] sm:text-[.9rem] x-sm:text-[.8rem]">The ultimate job board connecting top talent with amazing opportunities. Our platform leverages cutting-edge technology and vast industry connections to match job seekers with their dream career and help companies find the perfect fit. Unlock your full potential today with SkillLink.</p>
            {/* search form */}
            <form className="flex p-2 items-center border-blue-400 border-2 rounded-xl overflow-hidden bg-white" onSubmit={searchHandler}>
              <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Enter the job title and see the magic..." className="bg-transparent w-full outline-none lg:text-lg pl-2 sm:text-base x-sm:text-sm " />
              <button type="submit" className="bg-blue-500 text-white py-2 sm:px-8 x-sm:px-5 x-sm:text-sm sm:text-lg rounded">Search</button>
              <Link href={{ pathname: "/jobs", query: { query: searchQuery } }} ref={redirectLinkRef} hidden></Link>
            </form>
          </div>
          {/* hero right */}
          <div className="flex-[1] flex items-start justify-center h-full min-w-[400px] sm:hidden lg:block x-sm:hidden">
            <Image src={'/hero.png'} alt={"Guy standing confidentally"} height={10000} width={10000} draggable="false" className="w-[100%] h-full object-cover" />
          </div>
        </div>
      </section>

      {/* features section */}
      <section className="min-h-[300px] py-12 lg:px-12 sm:px-8 x-sm:px-4">
        <h2 className="text-blue-500 sm:text-[3rem] x-sm:text-[2rem] font-[600] text-center mb-10">Why SkillLink?</h2>

        {/* features */}
        <div className="flex justify-center flex-wrap gap-6">
          {/* feature */}
          {
            features.map((feature, index) => {
              return <FeatureCard key={index} feature={feature} />
            })
          }
        </div>
      </section>

      {/* jobs section */}
      <section className="py-8 lg:px-12 sm:px-8 x-sm:px-4 flex flex-col items-center bg-gradient-to-t from-sky-100 to-indigo-500">
        <h2 className="text-white sm:text-[3rem] x-sm:text-[2rem] font-[600] text-center mb-10">Recommended Jobs!</h2>
        {/* jobs */}
        <div className="flex flex-col items-center w-full gap-8">
          {/* job */}
          {
            jobs.length > 0
            &&
            jobs.slice(0, 10).map((job, index) => <JobListItem key={index} job={job} />)
          }
        </div>
        <Link href={"/jobs"} className="bg-blue-500 text-white py-4 px-12 text-lg rounded mt-10">See More</Link>
      </section>

      {/* resources section */}
      <section className="py-12 lg:px-12 sm:px-8 x-sm:px-4 max-w-[1300px] mx-auto">
        <h2 className="text-blue-500 sm:text-[3rem] x-sm:text-[2rem] font-[600] text-center mb-10">Recommended Resources!</h2>
        {/* resourcess */}
        <div className="flex flex-wrap gap-8 justify-center">
          {/* resource */}
          {
            resources.slice(0, 6).map((resource, index) => <ResourceCard key={index} resource={resource} />)
          }
        </div>
        <div className="flex justify-center">
          <Link href={"/resources"} className="bg-blue-500 text-white py-4 px-12 text-lg rounded mt-10">See More</Link>
        </div>
      </section>
    </main>
  )
}