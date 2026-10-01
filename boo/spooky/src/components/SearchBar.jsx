import React from 'react'

const SearchBar = ({search, setsearch}) => {
  return (
    <div>
        <input type="text" value={search} onChange={(e)=>{
            console.log(e)
            setsearch(e.target.value);
        }}/>
    </div>
  )
}

export default SearchBar