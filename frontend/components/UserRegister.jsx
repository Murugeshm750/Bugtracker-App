import React, { useState } from 'react'
import axios from 'axios'
import '../Styles/UserRegister.css'
import Link from 'antd/es/typography/Link'


const UserRegister = () => {
    // INITIALIZE ERROR MESSAGE DETAILS
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('')

    //INITIALIZE USER DETAILS
    const userDetails = {
        name: '',
        email: '',
        contact: '',
        role: '',
        password: ''
    }
    const [createUser, setCreateUser] = useState(userDetails)

    // STORE USER VALUES FROM INPUT FIELDS
    const handleChangeUser = (e) => {
        const { name, value } = e.target
        setCreateUser({
            ...createUser,
            [name]: value
        })
    }

    // FUNCTION FOR CREATE USER 
    async function handleCreateUser() {
        if (!createUser.name || !createUser.email || !createUser.password) {
            const errorMsg = "Please fill in all required fields";
            setMessage(errorMsg)
            setColor('red');
            setTimeout(() => {
                setMessage('');
            }, 3000);
            console.log(color);
            return;
        } else {
            const successMsg = "Successfully Registered !";
            setColor('green');
            setMessage(successMsg)
            setTimeout(() => {
                setMessage('');
            }, 3000);
            console.log(color);

            try {
                const response = await axios.post('http://localhost:3000/bugtracker.com/registerUser', createUser);
                setCreateUser(userDetails)
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    return (
        <div className='userRegister' >
            <h1 className='headding'>User Register Form</h1>
            <form className='userRegisterForm' onSubmit={(event) => {
                event.preventDefault();
                handleCreateUser();
            }}>
                <div className="registerInput">
                    <p style={{ color: color, fontWeight: 'bold', letterSpacing: '1.5px' }}>{message}</p>
                </div>
                <div className="registerInput">
                    <label>Name<span className='required'>*</span></label>
                    <input type="text" name="name" id='name' value={createUser.name} onChange={handleChangeUser} />
                </div>
                <div className="registerInput">
                    <label>Email<span className='required'>*</span></label>
                    <input type="email" name="email" id="email" value={createUser.email} onChange={handleChangeUser} />
                </div>
                <div className="registerInput">
                    <label>Contact<span className='required'>*</span></label>
                    <input type="tel" name="contact" id="contact" value={createUser.contact} onChange={handleChangeUser} />
                </div>
                <div className="registerInput">
                    <label>Password<span className='required'>*</span></label>
                    <input type="password" name="password" id="password" value={createUser.password} onChange={handleChangeUser} />
                </div>
                <div className="registerInput">
                    <label>Role<span className='required'>*</span></label>
                    <select name="role" id="role" value={createUser.role} onChange={handleChangeUser}>
                        <option style={{ color: 'grey' }} value="">User Role</option>
                        <option value="Developer">Developer</option>
                        <option value="Tester">Tester</option>
                        <option value="DB Handler">DB Handler</option>
                    </select>
                </div>
                <div className="registerInput" id='registerBtn'>
                    <button type="submit">Register</button>
                </div>
                <p >
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    )
}

export default UserRegister