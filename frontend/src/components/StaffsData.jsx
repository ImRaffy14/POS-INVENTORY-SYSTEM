import React from 'react'
import { UseUsersContext } from '../hooks/UseUsersContext'
import { FaTrash } from "react-icons/fa";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { useEffect } from 'react';

function StaffsData() {

    const {users, dispatch} = UseUsersContext()


    useEffect(()=>{
        const usersList = async () => {
            const response = await fetch('http://localhost:3000/api/users')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'GET_USER', payload: json})
            }
        }

        usersList()
    }, [])


    const handleDelete =  async (userId) => {
        

        const response = await fetch('http://localhost:3000/api/users/' + userId,{
             method: 'DELETE'
        })
 
        const json = await response.json()
 
        if(response.ok){
             dispatch({type: 'DELETE_USER', payload: json})
        }
     }


  return (
    <div>
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                <tr>
                    <th></th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                {users && users.map((users, index) => 
                    <tbody key={users._id}>
                    <tr>
                        <th>{index + 1}</th>
                        <td>{users.email}</td>
                        <td>{users.username}</td>
                        <td>{users.password}</td>
                        <td className="text-xl text-green-500 cursor-pointer"><MdOutlineSystemUpdateAlt /></td>
                        <td className="text-xl text-red-500 cursor-pointer" onClick={() => handleDelete(users._id)}><FaTrash /></td>    
                    </tr>
                    </tbody>
                )}
            </table>
        </div>
    </div>
  )
}

export default StaffsData
