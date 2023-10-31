"use client";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ boatBookings, boatId, perDayCost }: any) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(null);
  const [showSuccess, setShowSuccess] = useState(false)

  // Array of dates to disable (example: February 1st, 2023 and March 15th, 2023)
  const checkInDates = boatBookings.map(
    (booking: { checkInDate: Date; checkOutDate: Date }) =>
      new Date(booking.checkInDate)
  );
  const checkOutDates = boatBookings.map(
    (booking: { checkInDate: Date; checkOutDate: Date }) =>
      new Date(booking.checkOutDate)
  );

  const disabledDates: Date[] = [...checkInDates, ...checkOutDates];

  // Function to disable specific dates
  const isDateDisabled = (date: Date) => {
    return disabledDates.every(
      (disabledDate) => date.toDateString() !== disabledDate.toDateString()
    );
  };

  const handleChange = (date: Date) => {
    setSelectedDate(date);
    disabledDates.push(date);
  };

  const showToast = () => {
    return Toastify({text: "This is a toast",duration: 3000}).showToast();
  }


  const handleSubmit = async (e: any) => {
    const newSelectedDate1 = new Date(
      selectedDate!.getTime() + 5 * 60 * 60 * 1000
    );
    const newSelectedDate2 = new Date(
      selectedDate2!.getTime() + 5 * 60 * 60 * 1000
    );
    const timeDifference =
      newSelectedDate2.valueOf() - newSelectedDate1.valueOf();

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const totalPrice = daysDifference > 0 ? perDayCost * daysDifference : perDayCost

    e.preventDefault();

    const formData = {
      checkInDate: newSelectedDate1,
      checkOutDate: newSelectedDate2,
      itemId: boatId,
      userId: 1,
      total: totalPrice,
    };
    try {
        const response = await fetch('/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Request was successful
          setShowSuccess(true)
          setTimeout(()=> {
            setShowSuccess(false)
          }, 2000)
          const data = await response.json();
          console.log('API Response:', data);
        } else {
          // Handle errors
          console.error('API Error:', response.statusText);
        }
      } catch (error) {
        console.error('Request failed:', error);
      }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <h2>Dates: </h2>
        <div className="flex gap-x-4 mb-4 items-center border rounded-sm border-slate-200 p-2 justify-center">
          <div>
            <DatePicker
              className="w-36 px-1"
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              minDate={new Date()}
              filterDate={isDateDisabled}
              id="checkInDate"
              name="checkInDate"
              placeholderText="Check-In Date"
            />
          </div>
          <div className="text-slate-500 text-2xl">{">"}</div>
          <div>
            <DatePicker
              className="w-36 px-1 "
              selected={selectedDate2}
              onChange={(date: Date) => setSelectedDate2(date)}
              minDate={new Date()}
              filterDate={isDateDisabled}
              id="checkOutDate"
              name="checkOutDate"
              placeholderText="Check-Out Date"
            />
          </div>
        </div>

        <button className="px-4 py-2 bg-green-800 text-white rounded-lg w-full">
          Book Now
        </button>
      </form>
      {showSuccess && <p className="bg-green-300 border rounded-lg p-2 mt-2">Booking Created Successfully!</p>}

      

    </div>
  );
};

export default BookingForm;
