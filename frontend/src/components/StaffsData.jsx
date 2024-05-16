import React from 'react'
import { useState } from 'react'
import { UseUsersContext } from '../hooks/UseUsersContext'
import { FaTrash } from "react-icons/fa";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { useEffect } from 'react';
import { TiUserAdd } from "react-icons/ti";
import { toast } from 'react-toastify'

function StaffsData({ url }) {

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


    // Handle Delete Staff
    const handleDelete =  async (userId) => {
    
        const response = await fetch('http://localhost:3000/api/users/' + userId,{
             method: 'DELETE'
        })
 
        const json = await response.json()
 
        if(response.ok){
             dispatch({type: 'DELETE_USER', payload: json})
             toast.success("Staff Removed!", {
                position: "top-right"
              });

        }
     }


    //Creating New Staff

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [passErr, setPassErr] = useState('')
    const [err, setErr] = useState(null)
    const [role, setRole] = useState('Select Role')
    const [file, setFile] = useState(null);
   

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (confirm !== password) {
            setPassErr('Password does not match');
            setPassword('')
            setConfirm('')
            return; 
        }

        const formData = new FormData();
        formData.append('email', email)
        formData.append('username', username)
        formData.append('password', password)
        formData.append('role', role)
        formData.append('image', file);

        const response = await fetch('http://localhost:3000/api/users',{
            method: 'POST',
            body: formData,
            headers: {
                
            }
        })
        
        const json = await response.json()

        if(!response.ok){
            setErr(json.error)
        }
    
        if(response.ok){
            setErr(null)
            setEmail('')
            setUsername('')
            setPassword('')
            setPassErr('');
            setConfirm('')
            setRole('Select Role')
            setFile(null)
            console.log('New User Added')
            dispatch({type: 'CREATE_USER', payload: json})
            toast.success("New Staff Added!", {
                position: "top-right"
              });

            handleStaffModal()
        }    
    }

    const handleStaffModal = () => {
        document.getElementById('CreateStaff').close()
    }


  return (

    <>
        <div className="w-full mt-10">
            <div className="max-w-[1450px] mx-auto">
                <div className="flex justify-between mb-5">
                    <h1 className="font-extrabold text-xl text-gray-700">Staff Roles and Permission</h1>
                    <button className="btn btn-ghost text-3xl text-emerald-500" onClick={()=>document.getElementById('CreateStaff').showModal()}><TiUserAdd /></button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table bg-white text-black">
                        <thead>
                        <tr className="text-gray-600">
                            <th></th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Avatar</th>
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
                                <td>{users.role}</td>
                                <td><img className="w-[70px]" src={`${url}images/${users.avatar}`} alt="User Avatar" /></td>
                                <td className="text-xl text-green-500 cursor-pointer"><MdOutlineSystemUpdateAlt /></td>
                                <td className="text-xl text-red-500 cursor-pointer" onClick={() => handleDelete(users._id)}><FaTrash /></td>    
                            </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>

        {/* MODAL FOR CREATING NEW STAFF */}
        <dialog id="CreateStaff" className="modal">
            <div className="modal-box  w-11/12 max-w-xl">
                
                <form onSubmit={handleSubmit} className="card-body">
                    <h3 className="font-bold text-lg text-center">ADD NEW STAFF</h3>
                    <label className="input input-bordered flex items-center mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="text" className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label className="input input-bordered flex items-center mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" className="grow" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <label className="input input-bordered flex items-center mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                    </label>

                    <select className="select select-bordered w-full max-w-xs mt-4" onChange={(e) => setRole(e.target.value)}> 
                        <option value="Select Role">Select Role</option>
                        <option value="STAFF">STAFF</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>

                    <input type="file" className="file-input w-full max-w-xs mt-4" onChange={(e) => setFile(e.target.files[0]) }/>
                
                    <button className="btn btn-primary mt-4">Login</button>

                    {err && <div>{err}</div>}
                    {passErr && <div>{passErr}</div>}
                    
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </>
  )
}

export default StaffsData
