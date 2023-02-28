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
    /* Add Data One Time */
    // User.insertMany(dataUser);
    // Area.insertMany(dataArea);
    // Tree.insertMany(dataTree);
    // Watering.insertMany(dataWater);
    // OverallStat.insertMany(dataOverallStat);
  })
  .catch((error) => console.log(`${error} did not connect`));