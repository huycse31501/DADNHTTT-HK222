import mongoose from "mongoose";

const OverallStatschema = new mongoose.Schema(
    {
        totaltree: Number,
        yearlytotalwater: Number,
        yearlywateringtime: Number,
        year: Number,
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
        ],
        wateramountbyarea: {
            type: Map,
            of: Number,
        },
    }, {timestamps:true}
);

const OverallStat = mongoose.model("OverallStat", OverallStatschema)
export default OverallStat;