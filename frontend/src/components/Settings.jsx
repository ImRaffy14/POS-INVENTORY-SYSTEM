import React from 'react'
import { UseOnlineStaffContext } from '../hooks/useStaffOnline'

function Settings() {

    const { staffOnline } = UseOnlineStaffContext()

    console.log(staffOnline)

  return (

    <div className="w-full mt-10">
        <div className="max-w-[1450px] mx-auto">
            <div className="flex flex-col justify-start">
                <h1 className="font-extrabold text-xl text-gray-700 mb-5 ml-5">SETTINGS</h1>

                {staffOnline && 
                    <div>
                        <p>{staffOnline._id}</p>
                    </div>
                }           
                
            </div>
        </div>
    </div>
  )
}

export default Settings
    