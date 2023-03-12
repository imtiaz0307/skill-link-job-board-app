"use client"

import ResourceCard from "@/components/ResourceCard/ResourceCard";
import { resources } from "@/data/resources";
import { useState } from "react";

const Resources = () => {
    const [currentCount, setCurrentCount] = useState(1)
    return (
        <main>
            <section className="px-12 py-12 flex flex-col items-center">
                <h2 className="text-[4rem] font-[700] text-blue-500 text-center">Get Skilled!</h2>
                <p className="text-[1.5rem] text-center text-gray-500 mb-[4rem]">We provide you the way to learn from the best resources out there!</p>
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