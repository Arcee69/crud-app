import React, { useEffect, useState } from 'react'
import { api } from '../api'

const Account = () => {
    const [user, setUser] = useState()

const fetchUserData = async () => {
    const userData = await api.get("users/1")
    setUser(userData?.data?.data);
}

useEffect(() => {
    fetchUserData();
}, [])

  
  return (
    <div>
        <div className="w-4/12 h-4/6 mx-auto mt-28 border-solid rounded-xl shadow-lg p-5">
            <div className='w-full'>
                <div>
                    <div className='w-3/3 flex flex-row m-2 justify-between'>
                        <div className='w-2/3 flex flex-col mx-auto justify-between'>
                            <div className='w-3/3 flex flex-row justify-center'>
                                <img src={user?.avatar} alt="img" style={{ borderRadius: "50%"}} />
                            </div>
                            <div className='w-2/3 flex justify-start'>{`Name: ${user?.first_name}`}</div>
                            <div className='w-3/3 flex justify-start'>{`Email: ${user?.email}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Account;