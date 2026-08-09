import { InferSchemaType, model, PaginateModel, Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  },
);

roomSchema.plugin(paginate);

type RoomType = InferSchemaType<typeof roomSchema>;
export const Room = model<RoomType, PaginateModel<RoomType>>('rooms', roomSchema);
