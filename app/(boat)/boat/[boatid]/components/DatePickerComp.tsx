"use client"
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function DatePickerComp({boatBookings}: any) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  
  // Array of dates to disable (example: February 1st, 2023 and March 15th, 2023)
    const checkInDates = boatBookings.map((booking: { checkInDate: Date; checkOutDate: Date; }) => new Date(booking.checkInDate))
    const checkOutDates = boatBookings.map((booking: { checkInDate: Date; checkOutDate: Date; }) => new Date(booking.checkOutDate))

  const disabledDates: Date[] = [...checkInDates, ...checkOutDates];

  // Function to disable specific dates
  const isDateDisabled = (date: Date) => {
    return disabledDates.every((disabledDate) =>
      date.toDateString() !== disabledDate.toDateString()
    );
  };

  return (
    <div className="">
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        minDate={new Date()}
        filterDate={isDateDisabled}
        monthsShown={2}
        inline
      />
    </div>
  );
}

export default DatePickerComp