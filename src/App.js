import { useState } from 'react';
import './App.css';

import validator from 'validator';

function App() {
    const [signUp, setSignUp] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');

    const handleChange = e => {
        setSignUp({
            ...signUp,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = e => {
        e.preventDefault();
        if (!validator.isEmail(signUp.email)) {
            return setError('the email is invalid');
        }
        if (signUp.password.length <= 5) {
            return setError('password should be more than 5 correctors');
        }
        if (signUp.password !== signUp.confirmPassword) {
            return setError('passwords do not match');
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
                        value={signUp.email}
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
                        value={signUp.password}
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
                        value={signUp.confirmPassword}
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
