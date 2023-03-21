"use client"

import ResourceCard from "@/components/ResourceCard/ResourceCard";
import { resources } from "@/data/resources";
import { useState } from "react";

const Resources = () => {
    const [currentCount, setCurrentCount] = useState(1)
    return (
        <main>
            <section className="lg:px-12 sm:px-8 x-sm:px-4 py-12 flex flex-col items-center mx-auto max-w-[1300px]">
                <h2 className="sm:text-[4rem] x-sm:text-[2rem] font-[700] text-blue-500 text-center">Get Skilled!</h2>
                <p className="sm:text-[1.5rem] x-sm:text-[1rem] text-center text-gray-500 mb-[4rem]">We provide you the way to learn from the best resources out there!</p>
                {/* resourcess */}
                <div className="flex flex-wrap gap-8 justify-center">
                    {/* resource */}
                    {
                        resources.slice(0, currentCount * 6).map((resource, index) => <ResourceCard key={index} resource={resource} />)
                    }
                </div>
                <button className="bg-blue-500 text-white py-4 px-12 text-lg rounded mt-16 hover:bg-blue-600 transition-all duration-150" onClick={() => setCurrentCount(prev => prev + 1)} hidden={currentCount === resources.length / 6}>Load More</button>
            </section>
        </main>
    )
}

export default Resources;