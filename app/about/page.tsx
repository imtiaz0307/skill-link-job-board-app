const About = () => {
    return (
        <main>
            <section className="lg:px-12 sm:px-8 x-sm:px-4 py-16 flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500">
                <h1 className="md:text-[8rem] sm:text-[6rem] x-sm:text-[3rem] font-bold leading-none text-white text-center">What Is <br /> SkillLink?</h1>
            </section>
            <section className="lg:px-12 sm:px-8 x-sm:px-4 py-16 max-w-[700px] mx-auto">
                {/* intro */}
                <h2 className="text-[2.5rem] text-blue-500 font-[600]">Introduction:</h2>
                <p className="text-gray-500 text-[1.1rem] font-[500] mb-10">Welcome to SkillLink, the ultimate platform for job seekers and recruiters alike. Our mission is to connect talented individuals with the right job opportunities, helping them achieve their career goals and grow professionally.</p>

                {/* job board */}
                <h2 className="text-[2.5rem] text-blue-500 font-[600]">Job Board:</h2>
                <p className="text-gray-500 text-[1.1rem] font-[500] mb-10">Our job board is the cornerstone of our platform, providing a comprehensive database of job opportunities from a wide range of industries and sectors. We work with some of the best employers in the business to bring you the latest job openings and help you take the next step in your career.<br /><br />
                    Our job board is easy to use and search, allowing you to quickly find the right job opportunities based on your skills, experience, and qualifications. You can filter jobs by location, industry, salary range, and more, ensuring that you only see the most relevant job listings.<br /><br />
                    Recruiters can easily post job openings on our job board, providing detailed descriptions of the position, the required qualifications, and the application process. Our powerful search tools allow them to find the most qualified candidates for their job vacancies quickly and easily.</p>

                {/* talent search */}
                <h2 className="text-[2.5rem] text-blue-500 font-[600]">Talent Search:</h2>
                <p className="text-gray-500 text-[1.1rem] font-[500] mb-10">Our talent search feature is designed to help recruiters find the best candidates for their job vacancies. Recruiters can search through our talent database based on various criteria, including job title, skills, experience, and location.<br /><br />
                    Our talent search tool is intuitive and easy to use, providing recruiters with a comprehensive list of qualified candidates for their job vacancies. Recruiters can also review each candidate's profile, resume, and portfolio, ensuring that they have all the information they need to make the right hiring decisions.</p>

                {/* resource center */}
                <h2 className="text-[2.5rem] text-blue-500 font-[600]">Resource Center:</h2>
                <p className="text-gray-500 text-[1.1rem] font-[500] mb-10">At SkillLink, we believe in empowering talents to achieve their career goals and grow professionally. That's why we have created a comprehensive resource center that provides insights, tips, and resources to help you succeed in your career.<br /><br />
                    Our resource center covers a wide range of topics, including resume writing, interview preparation, career development, job search strategies, and more. We regularly update our resources to ensure that you have access to the latest industry trends and best practices.<br /><br />
                    Whether you're just starting your career or are a seasoned professional, our resource center is the perfect place to find valuable insights and tips to help you succeed in your chosen field.</p>

                {/* talent community */}
                <h2 className="text-[2.5rem] text-blue-500 font-[600]">Talent Community:</h2>
                <p className="text-gray-500 text-[1.1rem] font-[500] mb-10">At SkillLink, we believe in the power of community, which is why we have created a vibrant and active talent community. Our community is a place where job seekers and professionals can connect, share insights and best practices, and support each other on their career journeys.<br /><br />
                    Our community members include job seekers, professionals, industry experts, recruiters, and more. As a member of our community, you'll have access to exclusive events, webinars, and networking opportunities that can help you grow your career and build your professional network.</p>

                {/* concolusion */}
                <h2 className="text-[2.5rem] text-blue-500 font-[600]">Conclusion:</h2>
                <p className="text-gray-500 text-[1.1rem] font-[500] mb-10">Whether you're a job seeker or a recruiter, SkillLink is the ultimate platform to help you achieve your career goals. Our job board, talent search, resource center, and talent community provide a comprehensive suite of tools and resources to help you succeed in your chosen field. So why wait? Sign up for SkillLink today and take the first step towards your dream career!</p>
            </section>
        </main>
    )
}

export default About;