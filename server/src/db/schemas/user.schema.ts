import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 30,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model('users', userSchema);
