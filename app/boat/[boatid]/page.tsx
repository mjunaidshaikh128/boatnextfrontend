import Image from "next/image";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faIdCard, faBroom, faWaterLadder, faShower, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import DatePickerComp from "./components/DatePickerComp";
import BookingForm from "./components/BookingForm";
import Link from "next/link";
import DynamicFaIcon from "./components/DynamicFaIcon";

async function getBoat(boatid: any) {
  const res = await fetch(`http://localhost:3000/item/${boatid}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getAllBookings() {
  const res = await fetch(`http://localhost:3000/booking`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }: { params: { boatid: string } }) {
  const boat = await getBoat(params.boatid);
  // console.log("Boat", boat);

  const bookings = await getAllBookings();
  const boatId = +params.boatid;
  const boatBookings = bookings.filter(
    (booking: { itemId: number }) => booking.itemId === boatId
  );
  // console.log("Boat Booking", boatBookings);

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        {/* <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div> */}
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="bg-white py-24 sm:py-32 lg:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-3xl font-semibold tracking-wider">
                {boat.name}
              </h2>
              {/* {Grid for images} */}
              <div className="grid grid-cols-2 gap-x-1 mt-2">
                <div>
                  <Link href={boat.images[0]} target="blank" className="">
                    <Image
                      src={`https://res.cloudinary.com/dtsuwtlgx${boat.images[0]}`}
                      alt="Main Image"
                      width={500}
                      height={500}
                      className="object-cover overflow-hidden h-auto w-full transform hover:scale-105 transition ease-out duration-500"
                    />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {boat.images[1] && (
                    <div>
                      <Image
                        src={`https://res.cloudinary.com/dtsuwtlgx${boat.images[1]}`}
                        alt="Image 1"
                        width={500}
                        height={500}
                        className="object-cover overflow-hidden h-auto w-full transform hover:scale-105 transition ease-out duration-500"
                      />
                    </div>
                  )}
                  {boat.images[2] && (
                    <div>
                      <Image
                        src={`https://res.cloudinary.com/dtsuwtlgx${boat.images[2]}`}
                        alt="Image 2"
                        width={500}
                        height={500}
                        className="object-cover overflow-hidden h-auto w-full transform hover:scale-105 transition ease-out duration-500"
                      />
                    </div>
                  )}
                  {boat.images[3] && (
                    <div>
                      <Image
                        src={`https://res.cloudinary.com/dtsuwtlgx${boat.images[3]}`}
                        alt="Image 3"
                        width={500}
                        height={500}
                        className="object-cover overflow-hidden h-auto w-full transform hover:scale-105 transition ease-out duration-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-x-8">
                <div className="col-span-2">
                  <div className="mt-4 flex justify-between py-4">
                    <div>
                      <h4 className="font-semibold text-md">
                        {boat.type.name} owned by {boat.owner.name}
                      </h4>
                      <ul className="flex gap-x-2">
                        <li>{boat.capacity} people</li>
                        <li>{boat.cabins} cabins</li>
                        <li>{boat.berths} berths</li>
                        <li>{boat.bathrooms} bathrooms</li>
                      </ul>
                    </div>
                    <div>
                      <Image
                        src="/boat.jpg"
                        width={100}
                        height={100}
                        alt={""}
                        className="rounded-full object-cover overflow-hidden h-12 w-12"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-x-4 border-y border-gray-200 py-4">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">With a Skipper</h4>
                      <p className="text-gray-500">You will be accompanied by a skipper</p>
                    </div>
                  </div>
                  <div className="py-4">
                    <h2 className="text-3xl font-semibold">Description</h2>
                    <p className="italic mt-4">{boat.description}</p>
                  </div>
                  {/* Equipments */}
                  <div className="py-6">
                    <h2 className="text-3xl font-semibold">
                      Equipments of the {boat.type.name.toLowerCase()}
                    </h2>
                    <ul className="grid grid-cols-2 gap-4 mt-3 p-2">
                      {boat.equipments.map(
                        (equip: {
                          iconClass: string;
                          id: Key | null | undefined;
                          name:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | PromiseLikeOfReactNode
                            | null
                            | undefined;
                        }) => (
                          <li
                            className="flex items-center space-x-2"
                            key={equip.id}
                          >
                            <div>
                              <DynamicFaIcon name={equip.iconClass} />
                            </div>
                            <div>{equip.name}</div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  {/* Services */}
                  <div className="py-6 shadow-sm">
                    <h2 className="text-3xl font-semibold">Services</h2>
                    <ul className="grid grid-cols-2 gap-4 mt-3 p-2">
                      {boat.services.map(
                        (service: {
                          id: Key | null | undefined;
                          iconClass: string;
                          name:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | PromiseLikeOfReactNode
                            | null
                            | undefined;
                        }) => (
                          <li
                            className="flex items-center space-x-2"
                            key={service.id}
                          >
                            <div>
                              <DynamicFaIcon name={service.iconClass} />
                            </div>
                            <div>{service.name}</div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  {/* Features */}
                  <div className="py-6">
                    <h2 className="text-3xl font-semibold">Features</h2>
                    <ul className="grid grid-cols-2 gap-4 mt-3 p-2">
                      <li className="">
                        Model:{" "}
                        <span className="font-semibold">{boat.model}</span>
                      </li>
                      <li className="">
                        Year: <span className="font-semibold">{boat.year}</span>
                      </li>
                      <li className="">
                        Capacity:{" "}
                        <span className="font-semibold">{boat.capacity}</span>
                      </li>
                      <li className="">
                        Length:{" "}
                        <span className="font-semibold">{boat.length}</span>
                      </li>
                      <li className="">
                        Draft:{" "}
                        <span className="font-semibold">{boat.draft}</span>
                      </li>
                      <li className="">
                        Year: <span className="font-semibold">{boat.year}</span>
                      </li>
                      <li className="">
                        Cabins:{" "}
                        <span className="font-semibold">{boat.cabins}</span>
                      </li>
                      <li className="">
                        Berths:{" "}
                        <span className="font-semibold">{boat.berths}</span>
                      </li>
                      <li className="">
                        Bathrooms:{" "}
                        <span className="font-semibold">{boat.bathrooms}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h2 className="text-3xl font-semibold mb-4">Calendar</h2>

                    <DatePickerComp boatBookings={boatBookings} />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mt-4 border p-4 rounded-md shadow-2xl sticky top-20">
                    <h2 className="text-xl font-semibold mb-4">
                      Add dates for booking
                    </h2>

                    <BookingForm
                      boatBookings={boatBookings}
                      boatId={params.boatid}
                      perDayCost={boat.perDayCost}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
