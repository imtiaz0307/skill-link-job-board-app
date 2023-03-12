import React from 'react'

const Mailing = () => {
    return (
        <section className="flex flex-col justify-center items-center p-4 min-h-[300px] bg-gradient-to-r from-sky-500 to-indigo-500">
            <h2 className="text-center text-[2rem] font-[700] text-white">Subscribe To Our Mailing List!</h2>
            <h4 className="text-center text-[.8rem] mb-8 text-white">Never miss any blog post, get notified whenever we posts something.</h4>
            <form className="flex justify-center items-center bg-white p-2 rounded-[10px] w-full max-w-[600px]">
                <input className="bg-transparent w-full outline-none text-sm pl-2 max-w-[600px]" type="email" placeholder='Enter your email address.' />
                <button type='submit' className="bg-blue-500 text-white py-2 px-8 text-sm rounded">Subscribe</button>
            </form>
        </section>
    )
}

export default Mailing