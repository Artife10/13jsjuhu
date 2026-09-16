import React from 'react'

const hello = () => {
    var nums = "";
    for (var i = 0; i < 202; i++) {
        nums += i + " ";
    }
  return (
    <div>
      <h1>{nums}</h1>
    </div>
  )
}

export default hello
