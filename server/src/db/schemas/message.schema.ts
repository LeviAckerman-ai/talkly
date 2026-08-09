import { model, Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'rooms',
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Message = model('messages', messageSchema);
