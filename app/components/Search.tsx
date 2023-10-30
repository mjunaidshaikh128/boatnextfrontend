import { useState } from "react"

const Search = ({onSearch}: any) => {
    const [query, setQuery] = useState('')

    const handleChange = (e: any) => {
        const searchItem = e.target.value;
        setQuery(searchItem)
        onSearch(searchItem)
    }
  return (
    <input className="border rounded-lg mt-4 w-full p-2" type="search" value={query} placeholder="Search Boats" onChange={handleChange} />
  )
}

export default Search