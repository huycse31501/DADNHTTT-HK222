import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import statsRoutes from "./routes/stats.js";
import fetch from 'node-fetch';
import net from "net"
//import
import User from "./models/User.js";
import Watering from "./models/Watering.js";
import Area from "./models/Area.js";
import Tree from "./models/Tree.js";
import OverallStat from "./models/OverallStat.js";
import {
  dataUser, dataTree, dataArea, dataWater, dataOverallStat
} from "./data/index.js";
// CONFIG
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/stats", statsRoutes);
/* MONGOOSE SETUP */
mongoose.set('strictQuery', true);
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    const updaterealtimehumid = async () => {
      const result = await fetch('https://io.adafruit.com/api/v2/vananh2110211/feeds/bbc-humi/data?limit=1&fbclid=IwAR3WniSZGbLZd17s-iWReI85XJA5PLYnhzDHnjOTICjJSia7llxHfhM-1yA')
      .then(response => response.json())
        .then(data => data[0]?.value)
        .then(data => Tree.updateOne({ tid: "500001" }, { $set: {humidity: data} }));
    };
    const updaterealtimetemp = async () => {
      const result = await fetch('https://io.adafruit.com/api/v2/vananh2110211/feeds/bbc-temp/data?limit=1')
      .then(response => response.json())
        .then(data => data[0]?.value)
        .then(data => Tree.updateOne({ tid: "500001" }, { $set: {temperature: data} }));
    };
    const updaterealtimelight = async () => {
      const result = await fetch('https://io.adafruit.com/api/v2/vananh2110211/feeds/bbc-light/data?limit=1')
      .then(response => response.json())
        .then(data => data[0]?.value)
        .then(data => Tree.updateOne({ tid: "500001" }, { $set: {light: data} }));
    };
    setInterval(updaterealtimehumid, 3000)
    setInterval(updaterealtimetemp, 3000)
    setInterval(updaterealtimelight, 3000)
    /* Add Data One Time */
    // User.insertMany(dataUser);
    // Area.insertMany(dataArea);
    // Tree.insertMany(dataTree);
    // Watering.insertMany(dataWater);
    // OverallStat.insertMany(dataOverallStat);
  })
  .catch((error) => console.log(`${error} did not connect`));
