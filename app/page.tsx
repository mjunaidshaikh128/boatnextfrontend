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



export default async function Home() {
  const boats = await getBoats()

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
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
            <BoatSection boats={boats} />   
          </div>
        </main>
      </div>
    </>
  );
}
