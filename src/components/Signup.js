import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp(props) {

    const [credentials, setCredentials] = useState({ email: "", name: "", password: "", cpassword: "", showPassword: false, showConfirmPassword: false })
    let history = useNavigate();

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleViewPassword = (e) => {
        if (e.target.id === "password") {
            setCredentials({
                ...credentials,
                showPassword: !credentials.showPassword,
            });
        } else {
            setCredentials({
                ...credentials,
                showConfirmPassword: !credentials.showConfirmPassword,
            });
        }

    }

    const handleClick = async (e) => {
        const { email, name, password, cpassword } = credentials;

        const response = await fetch("https://inotebookbackend-4t39.onrender.com/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, password, cpassword })

        });
        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showAlert("Account created successfully", "success");
        } else {
            props.showAlert("Invalid credentials","danger");
        }
    }


    return (
        <>
            <div className='text-center mb-3'>
                <h1>iNOTEBOOK</h1>
                <p><b>Your notes on cloud ☁️</b></p>
            </div>
            <form>
                <div className="container form">
                    <p className="text-center my-3"><i>New to iNotebook? 👉🏻Create a new account here! </i></p>
                    <div className="mb-4 input-container">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={onchange} id="email" name="email" placeholder="name@example.com" autoComplete='on' />
                    </div>
                    <div className="mb-4 input-container">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={onchange} id="name" name="name" autoComplete='on' />
                    </div>
                    <div className="mb-4 input-container">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type={credentials.showPassword ? 'text' : 'password'} className="form-control" onChange={onchange} id="password" name="password" autoComplete='on' />
                        <i className={`fa fa-eye${credentials.showPassword ? "-slash" : ""} view-password`} id="password" onClick={handleViewPassword}></i>
                    </div>
                    <div className="mb-4 input-container">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <i className={`fa fa-eye${credentials.showConfirmPassword ? "-slash" : ""} view-password`} id="confirm-password" onClick={handleViewPassword}></i>
                        <input type={credentials.showConfirmPassword ? 'text' : 'password'} className="form-control" onChange={onchange} id="cpassword" name="cpassword" autoComplete='on' />
                    </div>
                </div>
            </form>


            <div className='text-center'>
                <button type="submit" className='btn btn-primary' onClick={handleClick}>SignUp</button>
            </div>
            <br />
            <p className='text-center last-para'>Already have an account? <a href="/login">Login-&gt;</a> </p>

        </>
    )
}

export default SignUp