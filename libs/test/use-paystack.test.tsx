// @ts-ignore
import {renderHook, cleanup, act} from '@testing-library/react-hooks';
import {render, fireEvent} from '@testing-library/react';
import React from 'react';
import useCredoPayment from '../use-credo';
import {callCredoPop} from '../credo-actions';
import useCredoScript from '../credo-script';
import {config} from './fixtures';
import {Currency, PaymentChannels} from '../types';

jest.mock('../credo-actions');
const onSuccess = jest.fn();
const onClose = jest.fn();

describe('useCredoPayment()', () => {
  beforeEach(() => {
    // @ts-ignore
    callCredoPop = jest.fn();
    renderHook(() => useCredoScript());
  });

  afterAll(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  it('should use useCredoPayment', () => {
    const {result, rerender} = renderHook(() => useCredoPayment(config));
    rerender();

    act(() => {
      result.current({onSuccess, onClose});
    });

    expect(onSuccess).toHaveBeenCalledTimes(0);
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(callCredoPop).toHaveBeenCalledTimes(1);
  });

  it('should pass if initializePayment does not accept any args', () => {
    const {result, rerender} = renderHook(() => useCredoPayment(config));
    rerender();

    act(() => {
      result.current({});
    });

    expect(callCredoPop).toHaveBeenCalledTimes(1);
  });

  it('should useCredoPayment accept all parameters', () => {
    const {result, rerender} = renderHook(() =>
      useCredoPayment({
        ...config,
        metadata: {
          custom_fields: [
            {
              display_name: 'Mobile Number',
              variable_name: 'mobile_number',
              value: '2348012345678',
            },
          ],
          cart_id: 398,
        },
        currency: 'GHS',
        channels: ['mobile_money', 'ussd'],
        plan: '1',
        subaccount: 'ACCT_olodo',
        'data-custom-button': 'savage',
        quantity: 2,
        split_code: 'SPL_ehshjerjh1232343',
        firstname: '404',
        lastname: 'err',
        phone: '080456789012',
        split: {
          type: 'percentage',
          bearer_type: 'all-proportional',
          subaccounts: [
            {
              subaccount: 'ACCT_hhs519xgrbocdtr',
              share: 30,
            },
            {
              subaccount: 'ACCT_fpzizqxofyshxs5',
              share: 20,
            },
          ],
        },
      }),
    );
    rerender();
    act(() => {
      result.current({});
    });

    expect(callCredoPop).toHaveBeenCalledTimes(1);
  });

  it('should useCredoPayment accept parameter parameters', () => {
    const currency: Currency = 'GHS';
    const channels: PaymentChannels[] = ['mobile_money', 'ussd'];
    const moreConfig = {
      amount: config.amount,
      email: config.email,
      metadata: {
        custom_fields: [
          {
            display_name: 'Mobile Number',
            variable_name: 'mobile_number',
            value: '2348012345678',
          },
        ],
        cart_id: 398,
      },
      currency,
      channels,
      plan: '1',
      subaccount: 'ACCT_olodo',
      'data-custom-button': 'savage',
      quantity: 2,
      split_code: 'SPL_ehshjerjh1232343',
      firstname: '404',
      lastname: 'err',
      phone: '080456789012',
      split: {
        type: 'percentage',
        bearer_type: 'all-proportional',
        subaccounts: [
          {
            subaccount: 'ACCT_hhs519xgrbocdtr',
            share: 30,
          },
          {
            subaccount: 'ACCT_fpzizqxofyshxs5',
            share: 20,
          },
        ],
      },
    };

    const {result, rerender} = renderHook(() =>
      useCredoPayment({
        ...config,
      }),
    );

    rerender();
    act(() => {
      result.current({
        config: moreConfig,
        onSuccess,
        onClose,
      });
    });

    expect(onSuccess).toHaveBeenCalledTimes(0);
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(callCredoPop).toHaveBeenCalledTimes(1);
  });

  it('should be accept trigger from other component', () => {
    const {result, rerender} = renderHook(() => useCredoPayment(config));
    rerender();
    const Btn = (): any => (
      <div>
        <button onClick={(): any => result.current({})}>Donation</button>{' '}
      </div>
    );

    const {getByText}: Record<string, any> = render(<Btn />);
    // Click button
    fireEvent.click(getByText('Donation'));
    // @ts-ignore
    expect(callCredoPop).toHaveBeenCalledTimes(1);
  });

  it('should accept being rendered in a container', () => {
    const wrapper: React.FC = ({children}: Record<string, any>) => {
      return <div>{children}</div>;
    };

    const {result, rerender} = renderHook(() => useCredoPayment(config), {wrapper});

    rerender();
    act(() => {
      result.current({});
    });

    // @ts-ignore
    expect(callCredoPop).toHaveBeenCalledTimes(1);
  });
});
