import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
    uid: {
        type: String,
        required: true,
        min: 6,
        max: 100,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
        },
    username: {
        type: String,
        required: true,
        min: 5,
    },
    password: {
      type: String,
      required: true,
      min: 1,
    },
    phone: String,
    dob: String,
    gardenerID: Array,
    areamanage: Array,
    managerID: String,
    degree: String,
    experience: Number,
    role: {
      type: String,
      enum: ["Manager", "Gardener"],
      default: "Manager",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
