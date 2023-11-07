import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Styles/UserLogin.css'
import Link from 'antd/es/typography/Link'
// import { useHistory } from 'react-router-dom';


const UserLogin = () => {

    // const history = useHistory();


    // INITIALIZE ERROR MESSAGE DETAILS
    const [errorMessage, setErrorMessage] = useState('');

    //   INITIALIZE VALIDATION USER DETAILS
    const [validateUser, setValidateUser] = useState([]);

    //INITIALIZE USER LOGIN DETAILS
    const userLoginDetails = {
        username: '',
        password: ''
    }
    const [createUserLogin, setCreateUserLogin] = useState(userLoginDetails)

    // FUNCTION FOR VALIDATE USER GET ALL DATA FROM DATABASE (USER TABLE)
    async function handleRecoverData() {
        try {
            const response = await axios.get('http://localhost:3000/bugtracker.com/users', {
                method: "GET"
            })
            setValidateUser(response.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    // RENDER USER DATA FROM SCREEN
    useEffect(() => {
        const fetchData = async () => {
            await handleRecoverData();
        }
        fetchData();
    }, []);

    // STORE USER LOGIN VALUES FROM INPUT FIELDS
    const handleChangeUserLogin = (e) => {
        const { name, value } = e.target
        setCreateUserLogin({
            ...createUserLogin,
            [name]: value
        })
    }

    // FUNCTION FOR  USER LOGIN
    async function handleUserLogin() {
        const user = validateUser.find((u) => u.email === createUserLogin.username && u.password === createUserLogin.password);

        if (!user) {
            const errorMsg = "Incorrect Username or Password";
            setCreateUserLogin(userLoginDetails)
            setErrorMessage(errorMsg);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        try {
            // history.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='userLogin' >
            <h1 className='headding'>User Login Form</h1>
            <form className='userLoginForm' onSubmit={(event) => {
                event.preventDefault();
                handleUserLogin();
            }}>
                <div className="loginInput">
                    <p style={{ color: 'red', fontWeight: 'bold', letterSpacing: '1.5px' }}>{errorMessage}</p>
                </div>
                <div className="loginInput">
                    <label>Username <span className='required'>*</span></label>
                    <input type="text" name="username" id='username' value={createUserLogin.name} onChange={handleChangeUserLogin} />
                </div>
                <div className="loginInput">
                    <label>Password<span className='required'>*</span></label>
                    <input type="password" name="password" id="password" value={createUserLogin.password} onChange={handleChangeUserLogin} />
                </div>
                <div className="loginInput" id='loginBtn'>
                    <button type="submit">Login</button>
                </div>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    )
}

export default UserLogin