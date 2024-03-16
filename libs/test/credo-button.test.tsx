import React from 'react';
// @ts-ignore
import {renderHook, cleanup, act} from '@testing-library/react-hooks';
import {render, fireEvent} from '@testing-library/react';
import {callCredoPop} from '../credo-actions';
import useCredoScript from '../credo-script';
import CredoButton from '../credo-button';
import {config} from './fixtures';

jest.mock('../credo-actions');

const componentProps = {
  ...config,
  className: 'btn',
  text: 'Pay my damn money',
  onSuccess: (): any => null,
  onClose: (): any => null,
};

describe('<CredoButton />', () => {
  beforeEach(() => {
    // @ts-ignore
    callCredoPop = jest.fn();
    renderHook(() => useCredoScript());
  });

  afterAll(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  it('render CredoButton', () => {
    const tree = <CredoButton {...componentProps} />;
    const {getByText}: Record<string, any> = render(tree);
    // Click button
    fireEvent.click(getByText('Pay my damn money'));
    // @ts-ignore
    expect(callCredoPop).toHaveBeenCalledTimes(1);
  });
});
