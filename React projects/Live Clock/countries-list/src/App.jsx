import React, { useState,useEffect } from 'react'

function App( ){

  const [time, setTime] = useState(new Date());

 
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);


  return (

    <div>
    
         <h1>CurrentTime</h1>
         <h2>{time.toLocaleTimeString([], { hour12: true })}</h2>
     
    </div>
  )
}

export default App
