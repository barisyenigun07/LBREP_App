import React from 'react'

const Fruit = (props) => {
  const { name, color } = props;  
  return (
    <div>
        <h1>This is a {color} {name}</h1>
    </div>
  )
}

export default Fruit