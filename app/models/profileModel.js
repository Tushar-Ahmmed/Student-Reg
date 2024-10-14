import mongoose from "mongoose";
const { Schema } = mongoose;

const profileSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId},
    first_name: { type: String, required: true, trim: true},
    last_name: { type: String, required: true, trim: true},
    date_of_birth: { type: Date, required: true},
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true},
    phone_number: { type: String, trim: true},
    address: { type: String, trim: true},
    enrollment_date: { type: Date, required: true},
    major: { type: String, trim: true,},
    year_of_study: { type: String, enum: ['1st', '2nd', '3rd', '4th']},
    gpa: { type: Number, min: 0.0, max: 4.0},
    photo_url: { type: String, trim: true}
    },
    {
        timestamps:true,
        versionKey:false
    }
)

const ProfileModel = mongoose.model('profiles', profileSchema);

export default  ProfileModel
