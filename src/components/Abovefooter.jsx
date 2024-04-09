import React from 'react'

const Abovefooter = () => {
  return (
    <div className=' bg-primary text-center text-white py-12 mb-32'>
        {/* for large text */}
        <div className=' text-4xl font-bold mb-5'>
            <p>Helping Today Helping <br/>Tommorow Charity</p>
        </div>
        {/* for Middle text */}
        <div className=' text-sm mb-5 ' >
            <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </div>
        {/* for buttons */}
        <div>
            <button className=' font-bold px-4 py-2 text-2xl rounded-md border-x-2 border-y-4 border-white bg-primary text-white mx-3 hover:bg-white hover:text-primary'>Become a Campaigner</button>
            <button className=' font-bold  border-x-2 border-y-4 border-white px-4 py-2 text-2xl rounded-md bg-white text-primary mx-3 hover:bg-primary hover:text-white'>Contribute Now</button>
        </div>
    </div>
  )
}

export default Abovefooter