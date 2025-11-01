import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CamperData from "./models/CamperData.js";
import multer from "multer";
import UploadBill from "./models/UploadBill.js";
dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Basic route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Add a camper
app.post("/api/addCamper", async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    const existingDate = await CamperData.findOne({ date: date.slice(0, 10) });
    if (existingDate) {
      return res
        .status(400)
        .json({ error: "Camper for this date already exists" });
    }

    const newCamper = new CamperData({ date: date.slice(0, 10) });

    await newCamper.save();

    res.status(201).json({ message: "Camper added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add camper", details: err });
  }
});

// Remove a camper
app.delete("/api/removeCamper", async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    const deletedCamper = await CamperData.findOneAndDelete({
      date: date.slice(0, 10),
    });

    if (!deletedCamper) {
      return res.status(404).json({ error: "Camper not found for this date" });
    }

    res.status(200).json({ message: "Camper removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove camper", details: err });
  }
});

app.delete("/api/deleteBill", async (req, res) => {
  try {
    const { bill } = req.body;

    await UploadBill.findByIdAndDelete(bill);
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete camper", details: err });
  }
});

// Get all campers
app.get("/api/getCampers", async (req, res) => {
  try {
    const campers = await CamperData.find();
    res.status(200).json({ campers });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch campers", details: err });
  }
});

// Get all bills
app.get("/api/getBills", async (req, res) => {
  try {
    const bills = await UploadBill.find();

    if (!bills) {
      return res.status(404).json({ error: "No bills found" });
    }

    res.status(200).json({ bills });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bills", details: err });
  }
});

// Upload a bill
app.post("/api/uploadBill", upload.single("bill"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const { path, filename } = req.file;
    const bill = await UploadBill.create({ path, filename });
    res.status(200).json({ message: "Bill uploaded successfully", bill });
  } catch (err) {
    console.error("Error uploading bill:", err);
    res.status(500).json({ error: "Failed to upload bill", details: err });
  }
});

// Get a specific bill by ID
// app.get("/api/getBill/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const biil = await UploadBill.findById(id);

//     if (!biil) {
//       return res.status(404).json({ error: "No bill found" });
//     }

//     res.status(200).json({ biil });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch bills", details: err });
//   }
// });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Failed:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
