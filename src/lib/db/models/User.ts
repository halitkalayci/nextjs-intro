import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<IUser>(
    {
        name: {type: String, required: true, minlength: 2},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, minlength: 8},
    },
    {timestamps: true}
);

UserSchema.pre('save', async function(next){
     const user = this as HydratedDocument<IUser>;

     if(!user.isModified('password')) return next();

     const salt = await bcrypt.genSalt(10);
     // "124835813312.194125812" abc123
     // "679345929429334.493295923" abc123
     const hash = await bcrypt.hash(user.password, salt);

     user.password = hash;
     next();
});


export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
