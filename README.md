# react-credo

This is a react library for implementing credo payment gateway

## Demo

![Demo](React_App_01.png?raw=true "Demo Image")

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
  import logo from './logo.svg';
  import { useCredoPayment } from 'react-credo';
  import './App.css';
  
  const config = {
      reference: (new Date()).getTime().toString(),
      email: "user@example.com",
      amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      publicKey: 'pk_test_dsdfghuytfd2345678gvxxxxxxxxxx',
  };
  
  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Credo dialog closed.
    console.log('closed')
  }

  const CredoHookExample = () => {
      const initializePayment = useCredoPayment(config);
      return (
        <div>
            <button onClick={() => {
                initializePayment(onSuccess, onClose)
            }}>Credo Hooks Implementation</button>
        </div>
      );
  };
  
  function App() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <CredoHookExample />
      </div>
    );
  }
  
  export default App;
```


### 2. Using the credo button

``` javascript 
  import React from 'react';
  import logo from './logo.svg';
  import { CredoButton } from 'react-credo';
  import './App.css';
  
  const config = {
    reference: (new Date()).getTime().toString(),
    email: "user@example.com",
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_dsdfghuytfd2345678gvxxxxxxxxxx',
  };
  
  function App() {
    // you can call this function anything
    const handleCredoSuccessAction = (reference) => {
      // Implementation for whatever you want to do with reference and after success call.
      console.log(reference);
    };

    // you can call this function anything
    const handleCredoCloseAction = () => {
      // implementation for  whatever you want to do when the Credo dialog closed.
      console.log('closed')
    }

    const componentProps = {
        ...config,
        text: 'Credo Button Implementation',
        onSuccess: (reference) => handleCredoSuccessAction(reference),
        onClose: handleCredoCloseAction,
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <CredoButton {...componentProps} />
      </div>
    );
  }
  
  export default App;
```

### 3. using the Credo consumer
``` Javascript
import React from 'react';
import logo from './logo.svg';
import { CredoConsumer } from 'react-credo';
import './App.css';
  
  const config = {
      reference: (new Date()).getTime().toString(),
      email: "user@example.com",
      amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      publicKey: 'pk_test_dsdfghuytfd2345678gvxxxxxxxxxx',
  };
  
  // you can call this function anything
  const handleSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Credo dialog closed.
    console.log('closed')
  }

  function App() {
      const componentProps = {
          ...config,
          text: 'Credo Button Implementation',
          onSuccess: (reference) => handleSuccess(reference),
          onClose: handleClose
      };
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <CredoConsumer {...componentProps} >
          {({initializePayment}) => <button onClick={() => initializePayment(handleSuccess, handleClose)}>Credo Consumer Implementation</button>}
        </CredoConsumer>
      </div>
    );
  }
  
  export default App;
```

### Sending Metadata with Transaction
If you want to send extra metadata e.g. Transaction description, user that made the transaction. Edit your config like so:

```ts
    const config = {
       // Your required fields
          metadata: {
            custom_fields: [
                {
                    display_name: 'description',
                    variable_name: 'description',
                    value: 'Funding Wallet'
                }
                // To pass extra metadata, add an object with the same fields as above
            ]
        }
    };
```

Please checkout [Credo Documentation](https://developers.credo.co/docs/credo-inline) for other available options you can add to the tag

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



Thanks! 
Lanre Yusuf.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
