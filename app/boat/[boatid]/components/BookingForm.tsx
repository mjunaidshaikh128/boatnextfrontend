"use client";
import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

const BookingForm = ({ boatBookings, boatId, perDayCost }: any) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [total, setTotal] = useState({
    totalPrice: null,
    numberOfDays: 0,
  });
  const router = useRouter();

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
    if (showSuccess) {
      showToast();
      router.refresh();
    }
  }, [showSuccess]);

  // useEffect(() => {
  //   //Runs on the first render
  //   //And any time any dependency value changes
  //   if (selectedDate && selectedDate2) {

  //   }
  // }, [selectedDate, selectedDate2]);

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
    if (selectedDate! > date) {
      showErrorToast("Check Out Date cannot be smaller than Check In Date :)");
      return;
    } else {
      setSelectedDate2(date);

      const newSelectedDate1 = new Date(
        selectedDate!.getTime() + 5 * 60 * 60 * 1000
      );
      const newSelectedDate2 = new Date(
        date!.getTime() + 5 * 60 * 60 * 1000
      );
      const timeDifference =
        newSelectedDate2.valueOf() - newSelectedDate1.valueOf();

      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const totalPrice =
        daysDifference === 0 ? perDayCost : perDayCost * (daysDifference + 1);

      setTotal({
        totalPrice: totalPrice,
        numberOfDays: daysDifference + 1,
      });
    }
  };

  const showToast = () => {
    return Toastify({
      text: "Booking created successfully!",
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  };

  const showErrorToast = (text: string) => {
    return Toastify({
      text: text,
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #FF4A52, #FF0101)",
        color: "#fff",
      },
    }).showToast();
  };

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
    const totalPrice =
    daysDifference === 0 ? perDayCost : perDayCost * (daysDifference + 1);

    e.preventDefault();

    const formData = {
      checkInDate: newSelectedDate1,
      checkOutDate: newSelectedDate2,
      itemId: boatId,
      userId: 1,
      total: totalPrice,
    };
    try {
      const response = await fetch("/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Request was successful
        setShowSuccess(true);
        const data = await response.json();
        console.log("API Response:", data);
      } else {
        // Handle errors
        console.error("API Error:", response.statusText);
        showErrorToast("Error while booking, Please try again");
      }
    } catch (error) {
      console.error("Request failed:", error);
      showErrorToast("Error while booking, Please try again");
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <h2>Dates: </h2>
        <div className="flex gap-x-4 mb-4 mt-2 items-center border rounded-sm border-slate-200 justify-center">
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
              autoComplete="off"
            />
          </div>
          <div className="text-slate-500 text-2xl">{">"}</div>
          <div>
            <DatePicker
              className="w-36 px-1 "
              selected={selectedDate2}
              onChange={(date: Date) =>
                handleChange(date)
              }
              minDate={new Date()}
              filterDate={isDateDisabled}
              id="checkOutDate"
              name="checkOutDate"
              placeholderText="Check-Out Date"
              autoComplete="off"
            />
          </div>
        </div>
        {selectedDate && selectedDate2 && (
          <div className={`flex flex-col items-start gap-y-2 mb-2`}>
            <div className="bg-orange-200 rounded-md text-gray-500 px-2 py-1 text-sm">
              Total Cost = Per day cost * Number of Days
            </div>
            <div className="font-semibold tracking-wider">
              {`$${total.totalPrice} = $${perDayCost} x ${total.numberOfDays}`}
            </div>
          </div>
        )} 

        <button className="px-4 py-2 bg-[#48ac98] hover:bg-[#398979] transition ease-in-out duration-300 text-white rounded-lg w-full">
          Book Now
        </button>
      </form>
      {/* {showSuccess && <p className="bg-green-300 border rounded-lg p-2 mt-2">Booking Created Successfully!</p>} */}
    </div>
  );
};

export default BookingForm;
