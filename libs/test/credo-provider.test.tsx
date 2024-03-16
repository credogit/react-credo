import React from 'react';
// @ts-ignore
import {renderHook, cleanup, act} from '@testing-library/react-hooks';
import {render, fireEvent} from '@testing-library/react';
import {callCredoPop} from '../credo-actions';
import useCredoScript from '../credo-script';
import CredoConsumer from '../credo-consumer';
import {config} from './fixtures';

jest.mock('../credo-actions');

const componentProps = {
  ...config,
  text: 'Pay my damn money',
  onSuccess: (): any => null,
  onClose: (): any => null,
};

describe('<CredoProvider />', () => {
  beforeEach(() => {
    // @ts-ignore
    callCredoPop = jest.fn();
    renderHook(() => useCredoScript());
  });

  afterAll(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  it('render CredoProvider', () => {
    const tree = (
      <CredoConsumer {...componentProps}>
        {({initializePayment}: Record<string, any>): JSX.Element => (
          <button onClick={(): void => initializePayment()}>Use render props 2000</button>
        )}
      </CredoConsumer>
    );
    const {getByText}: Record<string, any> = render(tree);
    // Click button
    fireEvent.click(getByText('Use render props 2000'));
    // @ts-ignore
    expect(callCredoPop).toHaveBeenCalledTimes(1);
  });
});
