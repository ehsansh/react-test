import { render, screen } from '@testing-library/react';
import App from './App';

test('inputs should be initially empty', () => {
    render(<App />);

    const emailInput = screen.getByRole('textbox');
    expect(emailInput.value).toBe('');

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput.value).toBe('');

    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    expect(confirmPasswordInput.value).toBe('');
});
