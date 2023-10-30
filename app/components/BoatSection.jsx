"use client";
import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import { useState, useEffect } from "react";

export default function BoatSection({ boats, locations, inCities }) {
  const [isSearch, setIsSearch] = useState(false);
  const [filteredBoats, setFilteredBoats] = useState(boats);
  const [cities, setCities] = useState(inCities)
  const [updatedCities, setUpdatedCities] = useState([])
  const [checkedValues, setCheckedValues] = useState(
    new Array(locations.length).fill(false)
  );
  const [checkedCities, setCheckedCities] = useState(
    new Array(inCities.length).fill(false)
  );
  // const [cities, setCities] = useState(null)

  // useEffect(() => {
  //   const newCities = []
  //   locations.map((loc) => {
  //     if (!newCities.includes(loc.city)) {
  //       newCities.push(loc.city)
  //     }
  //   })
  //   setCities([...newCities])
  // }, [locations])

  const handleSearch = (query) => {
    setIsSearch(true);
    console.log(query);
    const filterBoats = boats.filter((bt) =>
      bt.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBoats(filterBoats);
    console.log(filteredBoats);
  };

  const handleLocationChange = (index) => {
    const updatedCheckedValues = [...checkedValues];
    updatedCheckedValues[index] = !updatedCheckedValues[index];
    setCheckedValues(updatedCheckedValues);
    console.log(checkedValues);

    const checkedCheckboxes = updatedCheckedValues
      .map((value, index) => (value ? locations[index] : null))
      .filter((value) => value !== null);
    console.log(checkedCheckboxes);
    if (checkedCheckboxes.length > 0) {
      const filterBoats = boats.filter((bt) =>
      checkedCheckboxes.find((loc) => loc.id === bt.locationId)
      
    );
    setFilteredBoats(filterBoats);

    } else {
      setFilteredBoats(boats);

    }
  };
  const handleCitiesChange = (index, city) => {
    //handling of multiple checkboxes 
    const updatedCheckedValues = [...checkedCities];
    updatedCheckedValues[index] = !updatedCheckedValues[index];
    setCheckedCities(updatedCheckedValues);
    const updatedCitiesVar = []
    if(!updatedCities.includes(city)) {
      setUpdatedCities([...updatedCities, city])
    }

    // const checkedCheckboxes = updatedCheckedValues
    //   .map((value, index) => (value ? locations[index] : null))
    //   .filter((value) => value !== null);
    // console.log(checkedCheckboxes);
    // if (checkedCheckboxes.length > 0) {
      const filterBoats = boats.filter((bt) => updatedCities.includes(bt.location.city))
      console.log(filterBoats);

      // console.log('updated Citites' ,updatedCities);
      // setCities(updatedCities)
  
      
    
    // setFilteredBoats(filterBoats);

    // } else {
    //   setFilteredBoats(boats);

    // }
  };

  return (
    <div className="flex bg-white py-12 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-md font-semibold tracking-tight text-gray-900 sm:text-2xl">
          Filters
        </h2>
        <div className="mt-2">
          <h3>Filter By Location</h3>
          <ul className="mt-2 space-y-2">
            {locations.map((location, index) => (
              <li
                className="bg-slate-200 p-2 flex gap-x-2 rounded-lg"
                key={location.id}
              >
                <label htmlFor={location.id}>{location.address}</label>
                <input
                  type="checkbox"
                  name="location"
                  id={location.id}
                  checked={checkedValues[index]}
                  onChange={() => handleLocationChange(index)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <h3>Filter By City</h3>
          <ul className="mt-2 space-y-2">
            {cities.map((city, index) => (
              <li
                className="bg-slate-200 p-2 flex gap-x-2 rounded-lg"
                key={index}
              >
                <label htmlFor={city}>{city}</label>
                <input
                  type="checkbox"
                  name="location"
                  id={city}
                  checked={checkedCities[index]}
                  onChange={() => handleCitiesChange(index, city)}
                />
              </li>
            ))}
          </ul>
        </div>
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
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {filteredBoats.map((boat) => (
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
        }
      </div>
    </div>
  );
}
