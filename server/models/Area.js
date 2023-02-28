import mongoose from "mongoose";

const Areaschema = new mongoose.Schema(
    {
        aid: String,
        name: String,
        size: String,
        description: String,
        typeoftree: Array,
        numberoftree: Number,
        posx: String,
        posy: String,
        monthlyData: [
            {
                month: String,
                totalwater: Number,
                totaltree: Number,
            }
        ],
        dailyData: [
            {
                date: String,
                totalwater: Number,
                totaltree: Number,
            }
        ]
    }, {timestamps:true}
);

const Area = mongoose.model("Area", Areaschema)
export default Area;