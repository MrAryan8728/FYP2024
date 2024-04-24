import React from 'react'

const notfound = () => {
    return (
        <div className=' h-screen grid place-items-center bg-gray-200'>
            <div className=' text-6xl font-bold'>
                <p>Page Not Found ! 😅<span className=' text-9xl font-extrabold text-primary'>404</span></p>
            </div>
        </div>
    )
}

export default notfound