import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const managerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profile_img: {
      profile_img_url: { type: String, default: "/images/default-user.png" },
      public_id: { type: String },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    dob: { type: String, required: true },
    salary: { type: Number, required: true },
    work_status: {
      type: String,
      enum: ["working", "resigned", "terminated"],
      default: "working",
    },
  },
  { timestamps: true },
);

managerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const Manager = mongoose.model("Manager", managerSchema);

export default Manager;
