import User from "../models/User.js"
import OverallStat from "../models/OverallStat.js";
import Watering from "../models/Watering.js";
import Tree from "../models/Tree.js"

export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.find({ uid: [id] });
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};


export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "February";
    const currentYear = 2023;
    const currentDay = "2023-03-01";

    /* Recent Transactions */
    const waterings = await Watering.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find();

    const {
      totaltree,
      yearlywateringtime,
      monthlyData,
      wateramountbyarea,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === "2021-01-02";
    });
    res.status(200).json({
      totaltree,
      yearlywateringtime,
      monthlyData,
      wateramountbyarea,
      thisMonthStats,
      todayStats,
      waterings,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

