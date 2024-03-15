import React from 'react';

import {useCredoPayment, CredoButton, CredoConsumer} from './dist/index.es';
import './App.css';

const config = {
  reference: new Date().getTime().toString(),
  email: 'user@example.com',
  amount: 20000,
  publicKey: '0PUB0305E7ST33VIRmseXtZn6F45TPg1',
  customerFirstName: 'Test',
  customerLastName: 'Test',
    narration: 'This is a test transaction',
    bearer: 0


};

const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log('reference', reference);
};

const onClose = () => {
  // implementation for whatever you want to do when the Credo dialog closed.
  console.log('closed');
};

const CredoHookExample = () => {
  const initializePayment = useCredoPayment(config);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment({onSuccess, onClose});
        }}
      >
        Credo Hooks Implementation
      </button>
    </div>
  );
};

const CredoHookSplitParameterExample = () => {
    const initializePayment = useCredoPayment(config);
    return (
        <div>
            <button
                onClick={() => {
                    initializePayment({config: {currency: 'NGN'}, onSuccess, onClose});
                }}
            >
                Credo Hooks with split parameter Implementation
            </button>
        </div>
    );
};

function App() {
  const componentProps = {
    ...config,
    text: 'Credo Button Implementation',
    onSuccess,
    onClose,
  };

  return (
    <div className="App">
      <header className="App-header">

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
      <CredoHookSplitParameterExample />
      <CredoButton {...componentProps} />
      <CredoConsumer {...componentProps}>
        {({initializePayment}) => {
          return (
            <button onClick={() => initializePayment({onSuccess, onClose})}>
              Credo Consumer Implementation
            </button>
          );
        }}
      </CredoConsumer>
    </div>
  );
}

export default App;
