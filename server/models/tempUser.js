import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
   fullname: {
    type: String,
  },
    password:{
        type:String,
        required: function () {
            return !this.googleId;
        },
    },
    googleId: {
  type: String,
  unique: true,
  sparse: true
},
})

UserSchema.pre('save',async function (next){
    if(!this.isModified('password')||!this.password) 
        return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('User',UserSchema);
export default User;