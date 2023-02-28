import mongoose from "mongoose";

const Treeschema = new mongoose.Schema(
    {
        tid: String,
        type: String,
        areabelong: String,
        age: Number,
        humidity: String,
        light: String,
        temperature: String,
    }, {timestamps:true}
);

const Tree = mongoose.model("Tree", Treeschema)
export default Tree;