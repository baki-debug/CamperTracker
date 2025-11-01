import React, { useRef, useContext, useState } from "react";
import { CamperContext } from "../context/camperContext";
import { useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";

const Bills = () => {
  const { loading, uploadBill, bills, deleteBill } = useContext(CamperContext);
  const [bill, setBill] = useState(null);
  const fileInputRef = useRef(null); // 1. Create a ref

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!bill) return;
    await uploadBill(bill);
    setBill(null); // Clear state
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 3. Clear file input
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center pb-10">
        <div className="mx-auto h-20 w-20 animate-spin rounded-full border-6 border-dashed border-[#E5989B]"></div>
        <section className="text-center">
          <h2 className="mt-4 text-3xl text-zinc-700">Hold on</h2>
          <p className="text-2xl text-zinc-500">
            Camper Tracker is starting...
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center bg-[#FFF2EB]">
      <div className="my-10 flex flex-col gap-6">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-center text-5xl font-semibold text-[#E5989B]"
        >
          Camper Bills
        </h1>
        <section className="flex flex-col">
          <h2 className="text-2xl">Upload Bills</h2>
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef} // 2. Attach ref
              onChange={(e) => setBill(e.target.files[0])}
              className="file-input block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 file:border-r-2 file:pr-1 file:font-bold focus:outline-none"
            />
            <button
              className="analog-btn cursor-pointer bg-[#FFD6BA] px-3 py-1 text-2xl hover:bg-[#ffcdac]"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </section>
      </div>
      <div className="mb-10">
        <h2 className="text-center text-2xl font-semibold">Uploaded Bills</h2>
        {bills.map((bill) => (
          <div
            key={bill._id}
            className="my-5 flex items-center justify-center gap-1"
          >
            <img
              className="w-[65%] rounded-lg border-2 object-cover"
              src={import.meta.env.VITE_API_URL + "/" + bill.path}
            />
            <button
              onClick={() => deleteBill(bill._id)}
              className="cursor-pointer"
            >
              <MdDelete className="text-4xl" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bills;
