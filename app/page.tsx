import Image from "next/image";
import BoatSection from './components/BoatSection'
import Navbar from "./components/Navbar";

async function getBoats() {
  const res = await fetch('http://localhost:3000/item', { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
async function getLocations() {
  const res = await fetch('http://localhost:3000/location', { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getCities(locations: any) {
  const newCities: any[] = []
  locations.map((loc: { city: any; }) => {
    if (!newCities.includes(loc.city)) {
      newCities.push(loc.city)
    }
  })
  return newCities
}



export default async function Home() {
  const boats = await getBoats()
  const locations = await getLocations()
  const cities = await getCities(locations)

  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-full py-6 sm:px-6 lg:px-8">
            <BoatSection boats={boats} locations={locations} inCities={cities} />   
          </div>
        </main>
      </div>
    </>
  );
}
