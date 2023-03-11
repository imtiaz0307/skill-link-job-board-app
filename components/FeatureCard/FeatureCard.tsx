import React from 'react'
import { IconType } from 'react-icons'

type Feature = {
    feature: {
        icon: IconType,
        title: String,
        desc: String
    }
}

const FeatureCard = ({ feature }: Feature) => {
    return (
        <div className="p-5 transition ease-in-out bg-gradient-to-r from-sky-500 to-indigo-500 text-white max-w-[280px] flex flex-col items-center rounded-xl cursor-pointer hover:bg-gradient-to-l hover:to-indigo-500 hover:from-sky-500 duration-150 hover:scale-[1.01]" title={`${feature.title}`}>
            <feature.icon className="text-8xl" />
            <h3 className="text-2xl font-[600] mt-4">{feature.title}</h3>
            <p className="text-center text-gray-200 text-sm">{feature.desc}</p>
        </div>
    )
}

export default FeatureCard