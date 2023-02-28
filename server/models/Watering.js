import mongoose from "mongoose";

const WateringSchema = new mongoose.Schema(
  {
    wid: String,
    arid: String,
    wateramount: Number,
    numberoftree: Number,
  },
  { timestamps: true }
);

const Watering = mongoose.model("Watering", WateringSchema);
export default Watering;