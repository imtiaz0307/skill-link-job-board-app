import Image from "next/image"
import Link from "next/link"

type Resource = {
    resource: {
        banner: String,
        title: String,
        description: String,
        link: String
    }
}

const ResourceCard = ({ resource }: Resource) => {
    return (
        <div className="border-blue-200 border-2 rounded-[10px] p-2 w-full min-w-[290px] max-w-[370px] flex flex-col">
            <div className="overflow-hidden rounded-[10px]">
                <Image src={`${resource.banner}`} alt={`${resource.title}`} width={1920} height={1080} className="w-full rounded-[10px] transition-all duration-200 hover:scale-105" />
            </div>
            <h2 className="text-lg font-[600] mt-2">{resource.title}</h2>
            <p className="text-gray-500 text-[.8rem] mb-10">{resource.description}</p>
            <Link href={`${resource.link}`} target="_blank" className="bg-blue-500 text-white text-sm py-3 px-6 rounded w-fit self-center">Watch Now!</Link>
        </div>
    )
}

export default ResourceCard