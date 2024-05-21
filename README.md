# react-credo

This is a react library for implementing credo payment gateway

## Demo

![Demo](https://github.com/credogit/react-credo/assets/22002332/632b7856-ad49-41b2-a8d7-64013651bd96)


## Get Started

This React library provides a wrapper to add Credo Payments to your React application

### Install

```sh
npm install react-credo --save
```

or with `yarn`

```sh
yarn add react-credo
```

### Usage

This library can be implemented into any react application in 3 different ways:
1. By using hooks provided by the library
2. By using a button provided by the library
3. By using a context consumer provided by the library

Note that all 3 implementations produce the same results.


### 1. Using the credo hook
```javascript
  import React from 'react';
  import { useCredoPayment } from 'react-credo';
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
```

Please checkout [Credo Documentation](https://docs.credocentral.com/) for other available options you can add to the tag

## Deployment

REMEMBER TO CHANGE THE KEY WHEN DEPLOYING ON A LIVE/PRODUCTION SYSTEM

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!


Credocentral.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/credogit/react-credo/blob/master/LICENSE.md) file for details
