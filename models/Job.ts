import { Schema, models, model } from "mongoose"

const jobSchema = new Schema(
    {
        // currently dont have recruiter account functionality so i'll uncomment it later
        // user_id: {
        //     type: Schema.Types.ObjectId,
        //     ref: "user" 
        // },
        job_title: {
            type: String,
            required: true
        },
        company_title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        vacancies: {
            type: Number,
            default: 1
        },
        city: {
            type: String,
            required: true
        },
        experience: {
            type: Number,
            required: true
        },
        job_type: {
            type: String,
            required: true,
            enum: ["Remote", "Hybrid", "On-site"]
        },
        applications: {
            type: Array,
            default: []
        },
        skills_required: {
            type: Array,
            default: []
        },
        salary_range: {
            from: {
                type: Number
            },
            to: {
                type: Number
            }
        },
        deadline: {
            type: Date,
            default: new Date()
        }
    },
    {
        timestamps: true
    }
)

export const Job = models.job || model("job", jobSchema)