import { useContext, useEffect, useState } from "react";
import { Calendar as Calendarpack } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CamperContext } from "../context/camperContext";

const Calendar = ({ addCamper }) => {
  const [markedDates, setMarkedDates] = useState([]);

  const [selectedDate, setSelectedDate] = useState();

  const { campers, removeCamper } = useContext(CamperContext);

  useEffect(() => {
    const dates = campers.map((camper) => new Date(camper.date));
    setMarkedDates(dates);
  }, [campers]);

  const tileClassName = ({ date, view }) => {
    // Only apply class in 'month' view
    if (view === "month") {
      // Check if the current calendar tile's date matches any of our marked dates
      const hasCamperEntry = markedDates.some(
        (markedDate) =>
          date.getFullYear() === markedDate.getFullYear() &&
          date.getMonth() === markedDate.getMonth() &&
          date.getDate() === markedDate.getDate(),
      );
      if (hasCamperEntry) {
        return "has-camper-entry"; // Custom class to highlight the date
      }
    }
    return null;
  };

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Calendarpack
        maxDate={new Date()}
        tileClassName={tileClassName}
        onClickDay={(value, event) => {
          setSelectedDate(value);
          // console.log(value);
        }}
      />

      {selectedDate && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-semibold">
            Selected Date: {selectedDate.toDateString()}
          </h2>
          <div className="text-lg">
            {markedDates.some(
              (date) =>
                date.getFullYear() === selectedDate.getFullYear() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getDate() === selectedDate.getDate(),
            ) ? (
              <>
                <p>Camper received on this date.</p>
                <button
                  onClick={() =>
                    removeCamper(formatDateToYYYYMMDD(selectedDate))
                  }
                  className="analog-btn rounded-m mt-4 cursor-pointer bg-[#FFD6BA] px-3 py-1 text-2xl hover:bg-[#ffcdac]"
                >
                  Remove Camper for this date
                </button>
              </>
            ) : (
              <>
                <p>No camper received on this date.</p>
                <button
                  onClick={() => addCamper(formatDateToYYYYMMDD(selectedDate))}
                  className="analog-btn rounded-m mt-4 cursor-pointer bg-[#FFD6BA] px-3 py-1 text-2xl hover:bg-[#ffcdac]"
                >
                  Add Camper for this date
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
