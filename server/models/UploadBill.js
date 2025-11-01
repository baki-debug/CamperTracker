import mongoose from "mongoose";

const UploadBillSchema = new mongoose.Schema({
  path: { type: String, required: true },
  filename: { type: String, required: true },
});

const UploadBill = mongoose.model("UploadBill", UploadBillSchema);
export default UploadBill;
