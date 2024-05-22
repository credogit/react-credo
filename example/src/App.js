import React from 'react';
import { useCredoPayment } from './dist/index.es';
import './App.css';

// Utility function to generate random alphanumeric string
const generateRandomAlphanumeric = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const transRef = generateRandomAlphanumeric(20);

// Config object for Credo payment
const config = {
    key:  '0PUB0024x8k5w4TU1dq570Jb8zJn0dLH', //process.env.REACT_APP_CREDO_API_KEY, // Store your API key as an environment variable
    customerFirstName: 'Ciroma',
    customerLastName: 'Chukwuma',
    email: 'ciroma.chukwuma@example.com',
    amount: 109000,
    currency: 'NGN',
    bearer: 0,
    reference: transRef, // Generate a unique transaction reference for each transaction
    customerPhoneNumber: '2348032698425',
    callbackUrl: 'https://merchant-test-line.netlify.app/successful',
    metadata: {
        customFields: [
            { variableName: 'gender', value: 'Male', displayName: 'Gender' },
            { variableName: 'address', value: '27/29 Adeyemo Alakija street, VI', displayName: 'Address' },
        ],
    },
    onClose: () => {
        console.log('Widget Closed');
    },
    callBack: (response) => {
        console.log('Successful Payment');
        console.log(response);
        window.location.href = response.callbackUrl;
    },
};

// Functional component using the Credo payment hook
const CredoHookExample = () => {
    const initializePayment = useCredoPayment(config);

    return (
        <div>
            <button onClick={initializePayment}>
                Credo Hooks Implementation
            </button>
        </div>
    );
};

// Main App component
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
            <CredoHookExample />
        </div>
    );
}

export default App;
