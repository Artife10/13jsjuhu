import React from 'react'
import './card.css'

const SablonCard = ({ name, post, date }) => {
  return (
    <div>
      <div className='card'>
        <h1>{name}</h1>
        <p>{post}</p>
        <h4>{date}</h4>
    </div>
    </div>
  )
}

export default SablonCard
