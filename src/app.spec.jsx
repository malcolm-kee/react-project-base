import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import App from './app';

function loadApp() {
  const result = render(<App />);

  const { container } = result;

  return {
    ...result,
    inputText: text =>
      fireEvent.change(container.querySelector('input'), { target: { value: text } })
  };
}

describe('<App />', () => {
  it('can renders', () => {
    loadApp();
  });

  it('can change the text', () => {
    const { inputText } = loadApp();
    inputText('Malcolm Kee');
  });
});
