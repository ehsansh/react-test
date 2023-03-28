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

test('should be able to type a password', () => {
    render(<App />);

    const passwordInput = screen.getByLabelText('Password');
    userEvent.type(passwordInput, '123');
    expect(passwordInput.value).toBe('123');
});

test('should be able to type a confirm password', () => {
    render(<App />);

    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    userEvent.type(confirmPasswordInput, '123');
    expect(confirmPasswordInput.value).toBe('123');
});

test('should show error message on invalid email', () => {
    render(<App />);
    const emailError = screen.queryByText(/the email is invalid/i);
    expect(emailError).not.toBeInTheDocument();
    const emailInput = screen.getByRole('textbox', {
        name: /emai/i,
    });
    userEvent.type(emailInput, 'ehsangmail.com');
    const submitBtn = screen.getByRole('button', {
        name: /submit/i,
    });
    userEvent.click(submitBtn);
    expect(emailError).toBeInTheDocument();
});
