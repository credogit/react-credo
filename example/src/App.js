import React from 'react';

import {useCredoPayment} from './dist/index.es';
import './App.css';

function generateRandomAlphanumeric(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}
const transRef = generateRandomAlphanumeric(20);

const config = {
    key: '0PUB0024x8k5w4TU1dq570Jb8zJn0dLH', //You should store your API key as an environment variable
    customerFirstName: 'Ciroma',
    customerLastName: 'Chukwuma',
    email: 'ciroma.chukwuma@example.com',
    amount: 109000,
    currency: 'NGN',
    bearer: 0,
    reference: transRef, // Please generate your own transRef that is unique for each transaction
    customerPhoneNumber: '2348032698425',
    callbackUrl: 'https://merchant-test-line.netlify.app/successful',
    metadata: {
        customFields: [
            {"variable_name": "gender", "value": "Male", "display_name": "Gender" },
            {"variable_name": "address", "value": "27/29 Adeyemo Alakija street, VI", "display_name": "Address" }
        ]
    },
    onClose: () => {
        console.log('Widget Closed')
    },
    callBack: (response) => {
        console.log('Successful Payment')
        console.log(response)
        window.location.href = response.callbackUrl
    }
};

const CredoHookExample = () => {

    const initializePayment = useCredoPayment(config);
    return (
        <div>
            <button onClick={() => {
                initializePayment();
            }}>
                Credo Hooks Implementation
            </button>
        </div>
    );
};


function App() {

    return (
        <div className="App">
            <header className="App-header">

                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer"> Learn React </a>
            </header>

            <CredoHookExample/>
        </div>
    );
}

export default App;
