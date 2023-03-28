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

test('should show error message on invalid email', async () => {
    render(<App />);
    const emailError = screen.queryByText(/the email is invalid/i);
    expect(emailError).not.toBeInTheDocument();
    const emailInput = screen.getByRole('textbox', {
        name: /email/i,
    });
    userEvent.type(emailInput, 'ehsangmail.com');
    const submitBtn = screen.getByRole('button', {
        name: /submit/i,
    });
    userEvent.click(submitBtn);
    const emailErrorAgain = await screen.findByText(/the email is invalid/i);
    expect(emailErrorAgain).toBeInTheDocument();
});

test('should show error message on invalid password', async () => {
    render(<App />);
    const emailInput = screen.getByRole('textbox', {
        name: /email/i,
    });
    userEvent.type(emailInput, 'ehsan@gmail.com');

    const passwordInput = screen.getByLabelText('Password');
    userEvent.type(passwordInput, '123');

    const submitBtn = screen.getByRole('button', {
        name: /submit/i,
    });
    userEvent.click(submitBtn);

    const passwordError = await screen.findByText(
        /password should be more than 5 correctors/i
    );
    expect(passwordError).toBeInTheDocument();
});

test('show an error if passwords do not match', async () => {
    render(<App />);
    const emailInput = screen.getByRole('textbox', {
        name: /email/i,
    });
    userEvent.type(emailInput, 'ehsan@gmail.com');

    const passwordInput = screen.getByLabelText('Password');
    userEvent.type(passwordInput, '123456');

    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    userEvent.type(confirmPasswordInput, '123457');

    const submitBtn = screen.getByRole('button', {
        name: /submit/i,
    });
    userEvent.click(submitBtn);

    const passwordError = await screen.findByText(/passwords do not match/i);
    expect(passwordError).toBeInTheDocument();
});
