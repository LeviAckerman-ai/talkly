import { InferSchemaType, model, PaginateModel, Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

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

messageSchema.plugin(paginate);

type MessageType = InferSchemaType<typeof messageSchema>;
export const Message = model<MessageType, PaginateModel<MessageType>>('messages', messageSchema);
