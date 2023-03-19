enum Job_Type {
    "Remote",
    "On-site",
    "Hybrid"
}

type Candidate = {
    resume: string,
    name: string,
    city: string,
    email: string,
    contact_number: string,
    skills: string[]
}

export type JobItem = {
    _id: string,
    job_title: string;
    company_title: string;
    description: string;
    slug: string;
    vacancies: number;
    city: string;
    experience: number;
    job_type: Job_Type;
    applications: Candidate[] | [];
    skills_required: string[];
    salary_range: {
        from: number;
        to: number;
    };
    deadline: string;
};