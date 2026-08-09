import { InferSchemaType, model, PaginateModel, Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

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

userSchema.plugin(paginate);

type UserType = InferSchemaType<typeof userSchema>;
export const User = model<UserType, PaginateModel<UserType>>('users', userSchema);
