import mongoose,{Schema} from "mongoose";

const postSchema = new Schema(
    {
        type: String,
        name: String,
        money: {
            type: Number,
            set: v => parseFloat(v.toFixed(2)),
          },
        record: Date,
    },
    {
        timestamps: true
    }
)
const Post = mongoose.models.Post || mongoose.model("Post",postSchema,"data");
export default Post;