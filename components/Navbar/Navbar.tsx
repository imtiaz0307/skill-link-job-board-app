import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-12 h-20 bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
            <Link href={'/'} className="text-4xl  font-bold">
                SkillLink
            </Link>
            <ul className="flex items-center gap-8">
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/jobs"}>Jobs</Link>
                </li>
                <li>
                    <Link href={"/resources"}>Resources</Link>
                </li>
                <li>
                    <Link href={"/about"}>About Us</Link>
                </li>
                <li>
                    <Link href={"/contact"}>Contact Us</Link>
                </li>
                <li>
                    <Link href={"/login"} className="bg-white text-blue-500 font-[600] py-3 px-10 rounded">Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar