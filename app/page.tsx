import Image from "next/image";
import { features } from "@/data/features";
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import Link from "next/link";
import JobListItem from "@/components/JobListItem/JobListItem";
import { jobs } from "@/data/Jobs";

export default function Home() {
  return (
    <main>
      {/* hero section */}
      <section className="px-12 min-h-[600px] max-h-600 flex justify-between gap-4 overflow-hidden bg-gradient-to-r from-sky-500 to-indigo-500">
        {/* hero left */}
        <div className="flex-[2] flex flex-col justify-center">
          <h1 className="text-[8rem] font-bold leading-none text-white">SkillLink</h1>
          <h3 className="text-[2rem] font-[600] leading-tight my-4 text-white">Linking Talent. Unlocking Potential.</h3>
          <p className="text-gray-200 mb-20">The ultimate job board connecting top talent with amazing opportunities. Our platform leverages cutting-edge technology and vast industry connections to match job seekers with their dream career and help companies find the perfect fit. Unlock your full potential today with SkillLink.</p>
          {/* search form */}
          <form className="flex p-2 items-center border-blue-400 border-2 rounded-xl overflow-hidden bg-white">
            <input type="text" placeholder="Search for jobs, talents, and more.." className="bg-transparent w-full outline-none text-lg pl-2" />
            <button type="submit" className="bg-blue-500 text-white py-2 px-8 text-lg rounded">Search</button>
          </form>
        </div>
        {/* hero right */}
        <div className="flex-[1] flex items-start justify-center h-full min-w-[400px]">
          <Image src={'/hero.png'} alt={"Guy standing confidentally"} height={10000} width={10000} draggable="false" className="w-[100%] h-full object-cover" />
        </div>
      </section>

      {/* features section */}
      <section className="min-h-[300px] py-8 px-12">
        <h2 className="text-blue-500 text-[3rem] font-[600] text-center mb-10">Why SkillLink?</h2>

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
      <section className="py-8 px-12 flex flex-col items-center bg-gradient-to-t from-sky-100 to-indigo-500">
        <h2 className="text-white text-[3rem] font-[600] text-center mb-10">Recommended Jobs!</h2>
        {/* jobs */}
        <div className="flex flex-col items-center w-full gap-8">
          {/* job */}
          {
            jobs.map((job, index) => <JobListItem key={index} job={job} />)
          }
        </div>
        <Link href={"/"} className="bg-blue-500 text-white py-4 px-12 text-lg rounded mt-10">See More</Link>
      </section>
    </main>
  )
}