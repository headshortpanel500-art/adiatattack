import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false },
  // ✅ নতুন রোল ফিল্ড অ্যাড করা হলো
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;