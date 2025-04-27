import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword(password:string):Promise<boolean>
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

UserSchema.methods.comparePassword = async function(password:string) : Promise<boolean>
{
    const user = this as HydratedDocument<IUser>;

    // ""   $2b$10$f7GNXb9BvxZVzX6HbAPuq.
    // 2nZg3GSeehgB2x.bGsJ5.qakYGMu.Ie
    // "abcd12345" + 2nZg3GSeehgB2x.bGsJ5.qakYGMu.Ie
    //  "abcd123452nZg3GSeehgB2x.bGsJ5.qakYGMu.Ie" -> f7GNXb9BvxZVzX6HbAPuq
    return await bcrypt.compare(password, user.password);
}

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
