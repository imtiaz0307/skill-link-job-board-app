import mongoose from "mongoose"

export const dbConnection = async () => {
    mongoose.connect(process.env.MONGO_URI!)
        .then(() => console.log("Database connected!"))
        .catch(() => console.log("Something went wrong while connecting to the database."))
}