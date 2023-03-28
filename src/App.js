import { useState } from 'react';
import './App.css';

import validator from 'validator';

function App() {
    const [singUp, setSignUp] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');

    const handleChange = e => {
        setSignUp({
            ...singUp,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = e => {
        e.preventDefault();
        if (!validator.isEmail(singUp.email)) {
            return setError('the email is invalid');
        }
    };

    return (
        <div className='container my-5'>
            <form>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                        Email address
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        value={singUp.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        className='form-control'
                        value={singUp.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='confirm-password' className='form-label'>
                        Confirm Password
                    </label>
                    <input
                        type='password'
                        id='confirm-password'
                        name='confirmPassword'
                        className='form-control'
                        value={singUp.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                {error && <p className='text-danger'>{error}</p>}
                <button
                    onClick={handleClick}
                    className='btn btn-primary'
                    type='submit'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default App;
