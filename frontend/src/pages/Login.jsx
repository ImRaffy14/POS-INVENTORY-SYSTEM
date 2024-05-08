import React from 'react'
import { useState } from 'react'


function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    

    const handleLogin = async (e) => {
        e.preventDefault()
        
        const user = {username, password}

        try{
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers:{
                    'Content-Type' : 'application/json'
                }
            })

            const json = await response.json()

            if(response.ok){
                localStorage.setItem('accessToken', json.token);
                console.log('login succesful')
                window.location.href = '/AdminPage'
                
            }
            else{
                console.log(json.error)
            }
        }
        catch(error){
            console.log(error)
        }
    }


  return (
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Username</span>
                </label>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="input input-bordered" required />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Login
