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
import DatePickerComp from "./components/DatePickerComp";
import BookingForm from "./components/BookingForm";
import Link from "next/link";

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
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="bg-white py-24 sm:py-32 lg:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-3xl font-semibold tracking-wider">
                {boat.name}
              </h2>
              {/* images */}
              {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1">
                  <Image
                    src={boat.images[0]}
                    alt="Main Image"
                    width={500}
                    height={500}
                    className="object-cover h-48 w-96"
                  />
                </div>
                <div className="lg:col-span-3 grid grid-cols-3 gap-4">
                  {boat.images[1] && (
                    <div>
                      <Image
                        src={boat.images[1]}
                        alt="Image 1"
                        width={500}
                        height={500}
                        className="object-cover h-48 w-96"
                      />
                    </div>
                  )}
                  {boat.images[2] && (
                    <div>
                      <Image
                        src={boat.images[2]}
                        alt="Image 2"
                        width={500}
                        height={500}
                        className="object-cover h-48 w-96"
                      />
                    </div>
                  )}
                  {boat.images[3] && (
                    <div>
                      <Image
                        src={boat.images[3]}
                        alt="Image 3"
                        width={500}
                        height={500}
                        className="object-cover h-48 w-96"
                      />
                    </div>
                  )}
                </div>
              </div> */}

              {/* {Grid for images} */}
              <div className="border grid grid-cols-2 gap-x-1 mt-2">
                <div>
                  <Link href={boat.images[0]} target="blank" className="">
                    <Image
                      src={boat.images[0]}
                      alt="Main Image"
                      width={500}
                      height={500}
                      className="object-cover overflow-hidden h-auto w-full transform hover:scale-105 transition ease-out duration-500"
                    />
                  </Link>
                </div>
                <div className="border grid grid-cols-2 gap-1">
                  {boat.images[1] && (
                    <div>
                      <Image
                        src={boat.images[1]}
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
                        src={boat.images[2]}
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
                        src={boat.images[3]}
                        alt="Image 3"
                        width={500}
                        height={500}
                        className="object-cover overflow-hidden h-auto w-full transform hover:scale-105 transition ease-out duration-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-3xl font-semibold">Description</h2>
                <p className="italic mt-4">{boat.description}</p>
              </div>
              <div className="grid grid-cols-3">
                <div className="col-span-2">
                  {/* Equipments */}
                  <div className="mt-4 p-3">
                    <h2 className="text-3xl font-semibold">
                      Equipments of the {boat.type.name.toLowerCase()}
                    </h2>
                    <ul className="grid grid-cols-2 gap-4 mt-3">
                      {boat.equipments.map(
                        (equip: {
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
                          <li className="underline" key={equip.id}>
                            {equip.name}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  {/* Services */}
                  <div className="mt-6  bg-slate-200 rounded-lg p-3 shadow-sm border-slate-300">
                    <h2 className="text-3xl font-semibold">Services</h2>
                    <ul className="grid grid-cols-2 gap-4 mt-3">
                      {boat.services.map(
                        (service: {
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
                          <li className="underline" key={service.id}>
                            {service.name}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  {/* Features */}
                  <div className="mt-6  bg-slate-200 rounded-lg p-3 shadow-sm border-slate-300">
                    <h2 className="text-3xl font-semibold">Features</h2>
                    <ul className="grid grid-cols-2 gap-4 mt-3">
                      <li className="underline">Model: {boat.model}</li>
                      <li className="underline">Year: {boat.year}</li>
                      <li className="underline">Capacity: {boat.capacity}</li>
                      <li className="underline">Length: {boat.length}</li>
                      <li className="underline">Draft: {boat.draft}</li>
                      <li className="underline">Year: {boat.year}</li>
                      <li className="underline">Cabins: {boat.cabins}</li>
                      <li className="underline">Berths: {boat.berths}</li>
                      <li className="underline">Bathrooms: {boat.bathrooms}</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h2 className="text-3xl font-semibold mb-4">Calendar</h2>

                    <DatePickerComp boatBookings={boatBookings} />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mt-4 border p-2 rounded-md shadow-2xl">
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
