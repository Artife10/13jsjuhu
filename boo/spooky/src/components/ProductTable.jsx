import React from 'react'
import ProductCategoryRow from '../components/ProductCategoryRow'
import ProductRow  from './ProductRow';

const ProductTable = ({products, search}) => {
    const rows = [];
    let lastCategory = null;
    
    products.filter((product)=>{
        return product.name.toLowerCase().includes(search.toLowerCase());
    }).forEach((product) => {
             if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
             }
             rows.push(<ProductRow product={product} key={product.name}/>);
             lastCategory = product.category
    });
  return (
    <div>{rows}</div>
  )
}

export default ProductTable