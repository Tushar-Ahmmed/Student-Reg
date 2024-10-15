import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {type: String, required: true, trim: true, unique: true},
    password_hash: {type: String,required: true,},
    is_active: {type: Boolean, default: true,},
    otp:{type:String, default:0, required:true}
    },
    {
    timestamps:true,
    versionKey:false
    }
)

const UserModel = mongoose.model('users', userSchema);

export default UserModel
