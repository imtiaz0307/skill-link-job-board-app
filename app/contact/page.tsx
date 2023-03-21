const Contact = () => {
    return (
        <main>
            <section className="lg:px-12 sm:px-8 x-sm:px-4 py-16 flex-col flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500">
                <h3 className="sm:text-[1.5rem] x-sm:text-[1rem] font-[500] text-center mb-3 text-white">Have any suggestions, queries or any sort of question?</h3>
                <h1 className="md:text-[8rem] sm:text-[6rem] x-sm:text-[3rem] font-bold leading-none text-white text-center">Tell Us Here!</h1>
            </section>
            <section className="flex justify-center items-center">
                <form className="w-full max-w-[700px] my-16 px-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-blue-500 text-[1.1rem] font-[500] pl-1" htmlFor="name">Enter your name</label>
                        <input className="bg-gray-100 py-3 px-4 text-lg border-b-2 outline-none border-blue-500 rounded mb-6" type="text" id="name" placeholder="Ex: John Doe" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-blue-500 text-[1.1rem] font-[500] pl-1" htmlFor="email">Enter your email</label>
                        <input className="bg-gray-100 py-3 px-4 text-lg border-b-2 outline-none border-blue-500 rounded mb-6" type="email" id="email" placeholder="abc@xyz.com" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-blue-500 text-[1.1rem] font-[500] pl-1" htmlFor="message">Write your message</label>
                        <textarea className="bg-gray-100 py-3 px-4 text-lg border-b-2 outline-none border-blue-500 rounded mb-6 resize-none h-36" id="message" placeholder="Write your message here!" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-4 px-12 text-lg rounded w-full">Submit</button>
                </form>
            </section>
        </main>
    )
}

export default Contact