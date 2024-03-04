import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, unique: true },
});

const User = model('User', userSchema);

export default User;
