"use client"

import { cities } from '@/data/cities'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

type FormData = {
    fullname: string,
    username: string,
    email: string,
    password: string,
    city: string,
    date_of_birth: string
}

const Signup = () => {
    const [emailError, setEmailError] = useState<string>("")
    const [usernameError, setUsernameError] = useState<string>("")

    // zod schema for form vaildation
    const schema: ZodType<FormData> = z.object({
        fullname: z.string().min(4).max(50),
        username: z.string().toLowerCase().min(4).max(20),
        email: z.string().email(),
        password: z.string().min(8),
        city: z.string().min(1),
        date_of_birth: z.string()
    })

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

    const signUp = async (data: FormData) => {
        const response = await fetch('/api/auth/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const resData = await response.json()
        if (resData.error) {
            resData.error.toLowerCase().includes("email") ? setEmailError(resData.error) : setEmailError("")
            resData.error.toLowerCase().includes("username") ? setUsernameError(resData.error) : setUsernameError("")
        }
        if (resData.success) {
            localStorage.setItem("auth-token", resData.token)
            window.location.href = "/"
        }
    }

    return (
        <main className='flex justify-center items-center py-12 px-6'>
            <form className='border-blue-200 border-2 rounded-[10px] w-full max-w-[800px] p-4' method='POST' onSubmit={handleSubmit(signUp)}>
                <h2 className='text-blue-500 sm:text-[2rem] x-sm:text-[1.5rem] font-[700] text-center mb-12'>Signup to SkillLink!</h2>
                <div className='flex gap-4 flex-wrap mb-4'>
                    <div className='flex flex-col gap2 flex-1 w-full min-w-[250px]'>
                        <label htmlFor='fullname' className="text-blue-500 font-[600] pl-1 cursor-pointer">Fullname</label>
                        <input className='py-2 px-4 bg-transparent border-blue-200 border-2 rounded mt-2 outline-none' type="text" id='fullname' placeholder='Ex: Muhammad Imtiaz' {...register("fullname")} />
                        {errors.fullname && <span className="text-[12px] text-red-500">{errors.fullname.message}</span>}
                    </div>
                    <div className='flex flex-col gap2 flex-1 w-full min-w-[250px]'>
                        <label htmlFor='username' className="text-blue-500 font-[600] pl-1 cursor-pointer">Username</label>
                        <input className='py-2 px-4 bg-transparent border-blue-200 border-2 rounded mt-2 outline-none' type="text" id='username' placeholder='Ex: imtiaz0307' {...register("username")} />
                        {<span className="text-[12px] text-red-500">{errors?.username?.message || usernameError}</span>}
                    </div>
                </div>
                <div className='flex gap-4 flex-wrap mb-4'>
                    <div className='flex flex-col gap2 flex-1 w-full min-w-[250px]'>
                        <label htmlFor='email' className="text-blue-500 font-[600] pl-1 cursor-pointer">Email Address</label>
                        <input className='py-2 px-4 bg-transparent border-blue-200 border-2 rounded mt-2 outline-none' type="email" id='email' placeholder='abc@xyz.com' {...register("email")} />
                        {<span className="text-[12px] text-red-500">{errors?.email?.message || emailError}</span>}
                    </div>
                    <div className='flex flex-col gap2 flex-1 w-full min-w-[250px]'>
                        <label htmlFor='password' className="text-blue-500 font-[600] pl-1 cursor-pointer">Password</label>
                        <input className='py-2 px-4 bg-transparent border-blue-200 border-2 rounded mt-2 outline-none' type="password" id='password' placeholder='Enter your password' {...register("password")} />
                        {errors.password && <span className="text-[12px] text-red-500">{errors.password.message}</span>}
                    </div>
                </div>
                <div className='flex gap-4 flex-wrap mb-4'>
                    <div className='flex flex-col gap2 flex-1 w-full min-w-[250px]'>
                        <label htmlFor='city' className="text-blue-500 font-[600] pl-1 cursor-pointer">City</label>
                        <select className='py-2 px-4 bg-transparent border-blue-200 border-2 rounded mt-2 outline-none' id='city' {...register("city")} >
                            {
                                cities.map(city => <option key={city} value={city.includes("Select") ? "" : city.toLowerCase()} >{city}</option>)
                            }
                        </select>
                        {errors.city && <span className="text-[12px] text-red-500">{errors.city.message}</span>}
                    </div>
                    <div className='flex flex-col gap2 flex-1 w-full min-w-[250px]'>
                        <label htmlFor='date_of_birth' className="text-blue-500 font-[600] pl-1 cursor-pointer">Date of birth</label>
                        <input className='py-2 px-4 bg-transparent border-blue-200 border-2 rounded mt-2 outline-none' type="date" id='date_of_birth' {...register("date_of_birth")} />
                        {errors.date_of_birth && <span className="text-[12px] text-red-500">{errors.date_of_birth.message}</span>}
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