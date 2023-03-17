import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        contact_number: {
            type: String,
            default: ""
        },
        password: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        date_of_birth: {
            type: Date,
            required: true
        },
        resume: {
            type: String,
            default: ""
        },
        interests: {
            type: Array,
            default: []
        },
        skills: {
            type: Array,
            default: []
        },
        applied_jobs: {
            type: Array,
            default: []
        },
        searched_keywords: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.models.user || mongoose.model("user", userSchema)