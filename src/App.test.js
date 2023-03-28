import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('should be able to type an email', () => {
    render(<App />);

    const emailInput = screen.getByRole('textbox', {
        name: /emai/i,
    });
    userEvent.type(emailInput, 'ehsan@gmail.com');
    expect(emailInput.value).toBe('ehsan@gmail.com');
});
