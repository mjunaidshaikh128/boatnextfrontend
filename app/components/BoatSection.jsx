"use client";
import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import { useState, useEffect } from "react";
import { FaBed } from "react-icons/fa";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function BoatSection({ boats, locations }) {
  const queryParams = new URLSearchParams();
  const [isSearch, setIsSearch] = useState(false);
  const [capacity, setCapactiy] = useState(0);
  const [price, setPrice] = useState(0);
  const [filteredBoats, setFilteredBoats] = useState(boats);
  const [checkedValues, setCheckedValues] = useState(
    new Array(locations.length).fill(false)
  );

  // useEffect(() => {
  //   const newParams = params + locationParams
  //   setParams(newParams)
  //   console.log("Params ", params);
  // }, [locationParams])

  const getFilteredBoats = async () => {
    const res = await fetch(
      `http://localhost:3000/item/findByFilter?${queryParams.toString()}`,
      { cache: "no-cache" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const getSearchedBoats = async (query) => {
    const res = await fetch(
      `http://localhost:3000/item/search?query=${query}`,
      { cache: "no-cache" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const handleSearch = async (query) => {
    setIsSearch(true);

    // console.log(query);
    // setSearchParam(query)
    const filterBoats = await getSearchedBoats(query)
    // const filterBoats = boats.filter((bt) =>
    //   bt.name.toLowerCase().includes(query.toLowerCase())
    // );
    setFilteredBoats(filterBoats);
    // console.log(filteredBoats);
  };

  const handleLocationChange = async (index) => {
    const updatedCheckedValues = [...checkedValues];
    updatedCheckedValues[index] = !updatedCheckedValues[index];
    setCheckedValues(updatedCheckedValues);

    const checkedCheckboxes = updatedCheckedValues
      .map((value, index) => (value ? locations[index] : null))
      .filter((value) => value !== null);
    if (checkedCheckboxes.length > 0) {
      checkedCheckboxes.map((loc, index) => {
        queryParams.append("location", loc.id);
        
        console.log(queryParams.toString());
      });
      

      const filterBoats = await getFilteredBoats();
      setFilteredBoats(filterBoats);
    } else {
      setFilteredBoats(boats);
    }
  };

  const handleCapacityChange = async (e) => {
    setCapactiy(e.target.value);
    queryParams.append("capacity", e.target.value);
    const filterBoats = await getFilteredBoats();
    setFilteredBoats(filterBoats);
  };

  const handlePriceChange = async (e) => {
    setPrice(e.target.value);
    queryParams.append("price", e.target.value);
    const filterBoats = await getFilteredBoats();
    setFilteredBoats(filterBoats);


  }
  // const handleLocationChange = (index) => {
  //   const updatedCheckedValues = [...checkedValues];
  //   updatedCheckedValues[index] = !updatedCheckedValues[index];
  //   setCheckedValues(updatedCheckedValues);
  //   console.log(checkedValues);

  //   const checkedCheckboxes = updatedCheckedValues
  //     .map((value, index) => (value ? locations[index] : null))
  //     .filter((value) => value !== null);
  //   console.log(checkedCheckboxes);
  //   if (checkedCheckboxes.length > 0) {
  //     const filterBoats = boats.filter((bt) =>
  //       checkedCheckboxes.find((loc) => loc.id === bt.locationId)
  //     );
  //     setFilteredBoats(filterBoats);
  //   } else {
  //     setFilteredBoats(boats);
  //   }
  // };
  return (
    <div className="flex bg-white py-12">
      <div className="mx-auto max-w-3xl  hidden md:block py-8">
        <h2 className="text-md font-semibold tracking-tight text-gray-900 sm:text-2xl">
          Filters
        </h2>
        <div className="mt-2">
          <h3>Filter By Location</h3>
          <ul className="mt-2 space-y-2">
            {locations.map((location, index) => (
              <li className="p-2 flex gap-x-2 rounded-lg" key={location.id}>
                <input
                  type="checkbox"
                  name="location"
                  id={location.id}
                  checked={checkedValues[index]}
                  onChange={() => handleLocationChange(index)}
                />
                <label htmlFor={location.id}>{location.address}</label>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3>Filter By Capacity</h3>
          <input
            type="range"
            name="capacity"
            id="capacity"
            min={0}
            max={2000}
            step={100}
            value={capacity}
            onChange={handleCapacityChange}
          />
          <p>{capacity}</p>
        </div>
        <div className="mt-6">
          <h3>Filter By Price</h3>
          <input
            type="range"
            name="price"
            id="price"
            min={0}
            max={1000}
            step={100}
            value={price}
            onChange={handlePriceChange}
          />
          <p>{price}</p>
        </div>
        {/* <div className="mt-2">
          <h3>Filter By City</h3>
          <ul className="mt-2 space-y-2">
            {cities.map((city, index) => (
              <li
                className="p-2 flex gap-x-2 rounded-lg"
                key={index}
              >
                <input
                  type="checkbox"
                  name="location"
                  id={city}
                  checked={checkedCities[index]}
                  onChange={() => handleCitiesChange(index, city)}
                />
                <label htmlFor={city}>{city}</label>
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-4">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Boats Available
          </h2>

          <Search onSearch={handleSearch} />
        </div>
        {/* {!isSearch && (
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {boats.map((boat) => (
              <article
                key={boat.id}
                className="flex max-w-xl flex-col items-start justify-between border rounded-lg"
              >
                <Link href={`/boat/${boat.id}`}>
                  <div className="border bt-1 rounded-lg">
                    <Image
                      src={boat.images[0]}
                      width={500}
                      height={500}
                      alt="Boat image"
                      className="rounded-lg object-cover h-48 w-96"
                    />
                  </div>
                </Link>

                <div className="flex items-center gap-x-4 text-xs">
                  <a
                    href={boat.name}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {boat.manufacturer}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 px-2">
                    <a href={boat.name}>
                      <span className="absolute inset-0" />
                      {boat.name}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 px-2 font-bold underline">
                    ${boat.perDayCost}{" "}
                    <span className="font-normal">per day</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        )} */}
        {
          <div className="mx-auto mt-10 grid  grid-cols-1 gap-x-8 gap-y-8 pt-2 sm:mt-16 sm:pt-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {filteredBoats.map((boat) => (
              <article
                key={boat.id}
                className="flex flex-col items-start justify-between border rounded-lg pb-4 shadow-sm"
              >
                <Link href={`/boat/${boat.id}`}>
                  <div className="border bt-1 rounded-lg">
                    <Image
                      src={`https://res.cloudinary.com/dtsuwtlgx${boat.images[0]}`}
                      width={500}
                      height={500}
                      alt="Boat image"
                      className="rounded-lg object-cover h-60 w-96"
                    />
                  </div>
                </Link>

                <div className="group relative px-2">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={boat.name}>
                      <span className="absolute inset-0" />
                      {boat.name}
                    </a>
                  </h3>

                  <div className="flex items-center gap-x-4 text-xs">
                    <a
                      href={boat.name}
                      className="relative z-10 rounded-full bg-gray-50 px-2 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {boat.manufacturer}
                    </a>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="space-x-2">
                      <FaBed className="inline" />
                      <span>{boat.capacity}</span>
                    </div>
                    <div className="space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                        />
                      </svg>
                      <span className="text-xs">With a skipper</span>
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-500">
                    <span>From </span>${boat.perDayCost}{" "}
                    <span className="font-normal">per day</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        }
      </div>
    </div>
  );
}
