import { cities } from '@/data/cities'
import Link from 'next/link'
import React from 'react'

const Signup = () => {
    return (
        <main className='flex justify-center items-center py-12 px-6'>
            <form className='border-blue-200 border-2 rounded-[10px] w-full max-w-[800px] p-4'>
                <h2 className='text-blue-500 text-[2rem] font-[700] text-center mb-12'>Signup to SkillLink!</h2>
                <div className='flex gap-4 flex-wrap mb-4'>
                    <div className='flex flex-col gap2 flex-1 w-full min-w-[250px]'>
                        <label htmlFor='name' className="text-blue-500 font-[600] pl-1 cursor-pointer">Fullname</label>
                        <input className='py-2 px-4 bg-transparent border-blue-200 border-2 rounded mt-2 outline-none' type="text" id='name' placeholder='Ex: Muhammad Imtiaz' />
                    </div>
                    <div className='flex flex-col gap2 flex-1 w-full min-w-[250px]'>
                        <label htmlFor='username' className="text-blue-500 font-[600] pl-1 cursor-pointer">Username</label>
                        <input className='py-2 px-4 bg-transparent border-blue-200 border-2 rounded mt-2 outline-none' type="text" id='username' placeholder='Ex: imtiaz0307' />
                    </div>
                </div>
                <div className='flex gap-4 flex-wrap mb-4'>
                    <div className='flex flex-col gap2 flex-1 w-full min-w-[250px]'>
                        <label htmlFor='email' className="text-blue-500 font-[600] pl-1 cursor-pointer">Email Address</label>
                        <input className='py-2 px-4 bg-transparent border-blue-200 border-2 rounded mt-2 outline-none' type="email" id='email' placeholder='abc@xyz.com' />
                    </div>
                    <div className='flex flex-col gap2 flex-1 w-full min-w-[250px]'>
                        <label htmlFor='password' className="text-blue-500 font-[600] pl-1 cursor-pointer">Password</label>
                        <input className='py-2 px-4 bg-transparent border-blue-200 border-2 rounded mt-2 outline-none' type="password" id='password' placeholder='Enter your password' />
                    </div>
                </div>
                <div className='flex gap-4 flex-wrap mb-4'>
                    <div className='flex flex-col gap2 flex-1 w-full min-w-[250px]'>
                        <label htmlFor='city' className="text-blue-500 font-[600] pl-1 cursor-pointer">City</label>
                        <select className='py-2 px-4 bg-transparent border-blue-200 border-2 rounded mt-2 outline-none' id='city'>
                            {
                                cities.map(city => <option key={city} value={city.includes("Select") ? "" : city.toLowerCase()} >{city}</option>)
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap2 flex-1 w-full min-w-[250px]'>
                        <label htmlFor='date_of_birth' className="text-blue-500 font-[600] pl-1 cursor-pointer">Date of birth</label>
                        <input className='py-2 px-4 bg-transparent border-blue-200 border-2 rounded mt-2 outline-none' type="date" id='date_of_birth' />
                    </div>
                </div>
                <div className='flex justify-center mt-8'>
                    <button type='submit' className='bg-blue-500 text-white py-4 px-16 rounded'>Signup</button>
                </div>
                <p className='pt-4 text-sm text-center'>Already have an account? <Link href={"/auth/signup"} className="text-blue-600 underline">Login</Link></p>
            </form>
        </main>
    )
}

export default Signup