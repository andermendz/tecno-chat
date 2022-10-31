import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/background.png';
import logo from '../assets/tecnochat.png'

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = form;

        const URL = 'http://localhost:5000/auth';

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    <div className="auth__form-container_image">
    <img src={signinImage} alt="sign in" />
</div>
    return (
        <div className="auth__form-container">
    
            <div className="auth__form-container_fields">


                <div className="auth__form-container_fields-content">

                <div className='auth_header'>
                <img src={logo} alt="tecnochat" />

                <p>{isSignup ? ' Registro' : ' Iniciar Sesion'}</p>

                </div>
                    
              



                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Nombre Completo</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Nombre Completo"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Nombre de Usuario</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Contraseña</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="******"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Registrar" : "Iniciar Sesion"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Ya tienes una cuenta ?" 
                             : "No tienes una cuenta ?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? ' Iniciar Sesion' : '  Registrate'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>
     
        </div>
    )
}

export default Auth
