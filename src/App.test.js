import { render, screen } from '@testing-library/react';
import App from './App';

test('inputs should be initially empty', () => {
    render(<App />);

    const emailInput = screen.getByRole('textbox');

    expect(emailInput.value).toBe('');
});
