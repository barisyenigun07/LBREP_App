import React, { useState } from 'react'

const AppleComponent = () => {
    const [numberOfApples, setNumberOfApples] = useState(10);
    
    function AppleDisplay(numberOfApples) {
        if (numberOfApples === 0 || numberOfApples === 1) {
          return `John has ${numberOfApples} apple`;
        }
    
        else if (numberOfApples > 1) {
          return `John has ${numberOfApples} apples`
        }
    
        else {
          return `John owes us ${Math.abs(numberOfApples)} apples`
        }
    
      }
    
    function tooManyDisplay() {
      if (numberOfApples > 10) {
        return <h1>John has too many apples</h1>;
      }
      else {
        return "";
      }
    }
  return (
    <div>
         <h1 style={{display: "flex", justifyContent: "center"}}>{AppleDisplay(numberOfApples)}</h1>
         <div style={{display: "flex", justifyContent: "center"}}>
            <button onClick={() => setNumberOfApples(prevState => prevState + 1)} style={{color: "blue", marginRight: "5px"}}>Add</button>
            <button onClick={() => setNumberOfApples(prevState => prevState - 1)} style={{color: "red", marginLeft: "5px"}}>Decrement</button>
         </div>
         {tooManyDisplay()}
    </div>
  )
}

export default AppleComponent