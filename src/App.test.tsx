import { h } from 'preact';
import { render } from '@testing-library/preact';
import { expect } from 'chai';
import App from './App';

describe('<App>', () => {
  it('renders learn react link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/hello/i);
    expect(document.body.contains(linkElement));
  });
});
