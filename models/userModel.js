import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    provider: {
      type: String,
      default: "credentials",
    },
  },

  { timestamps: true }
);

const User = models.user || mongoose.model("user", userSchema);
export default User;
