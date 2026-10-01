import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import ProductTable from '../components/ProductTable'
const FIlterableProductTable = ({products}) => {

    const [search, setsearch] = useState("");


  return (
    <div>
        <SearchBar search={search} setsearch={setsearch}/>
        <ProductTable products={products} search={search}/>
    </div>
  )
}

export default FIlterableProductTable
