import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer>
            <p className='bg-gradient-to-r from-sky-500 to-indigo-500 text-center bg-clip-text text-transparent py-6'>All Rights Reserved | <Link href={"/"}>SkillLInk</Link> &copy; 2023</p>
        </footer>
    )
}

export default Footer