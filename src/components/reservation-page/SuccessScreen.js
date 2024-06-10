import React from 'react';
import { Link } from 'react-router-dom';

function SuccessScreen({ onReset, onHome }) {
    return (
        <div className='success-screen-container'>
            <div className='success-screen-card'>
                <div className="success-animation">✔</div>
                <h1>Reservation Successful!</h1>
                <p>Check your phone for our message and we'll text you again when your table is ready!</p>
                <Link to='/'><button onClick={onHome}>Home</button></Link>
                <button onClick={onReset}>Make Another Reservation</button>
            </div>
        </div>
    );
}

export default SuccessScreen;