import React, { useReducer, useState } from "react";

function ReducerComponent() {
  const reducer = () => {
    const [count, setCount] = useState(0);
    setCount(count + 1);
  };

  const CountReducer = useReducer(reducer, despatch);
  

  return (
    <div>
        
    </div>
  )
}

export default ReducerComponent;
