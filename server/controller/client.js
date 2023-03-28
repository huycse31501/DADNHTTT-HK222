import Area from "../models/Area.js"
import Tree from "../models/Tree.js"
import Watering from "../models/Watering.js";
import User from "../models/User.js";
export const getArea = async (req, res) => {
    try {
      const area = await Area.find({});
        res.status(200).json(area);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
};

export const getTree = async (req, res) => {
  try {
      const { search = "" } = req.query;
      const tree = await Tree.find({
        $or: [
          { tid: { $regex: new RegExp(search, "i") } },
          { type: { $regex: new RegExp(search, "i") } },
          { areabelong: { $regex: new RegExp(search, "i") } },
        ],
      })
      res.status(200).json(tree);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

export const getWatering = async (req, res) => {
  try {
    const { search = "" } = req.query;
    const Waterings = await Watering.find({
      $or: [
      { wid: { $regex: new RegExp(search, "i") } },
      { arid: { $regex: new RegExp(search, "i") } },
    ],
    })

    res.status(200).json({
      Waterings,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGardener = async (req, res) => {
  try {
    const { search = "" } = req.query;
    const Gardeners = await User.find({"role": "Gardener"})

    res.status(200).json({
      Gardeners,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAvg = async (req, res) => {
  try {
    const avg = await Tree.aggregate(
      [
        {
          $group:
            {
              _id: null,
              humidity: {$avg: "$humidity" },
              temperature: { $avg: "$temperature" },
              light: {$avg: "$light"}
            }
        }
      ]
   )
    res.status(200).json({
      avg,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

