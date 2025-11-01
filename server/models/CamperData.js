import mongoose from "mongoose";

const CamperDataSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const CamperData = mongoose.model("CamperData", CamperDataSchema);
export default CamperData;
