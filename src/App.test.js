import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
    render(<App />);
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
    const emailInput = screen.getByRole('textbox', {
        name: /emai/i,
    });
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    if (email) {
        userEvent.type(emailInput, email);
    }
    if (password) {
        userEvent.type(passwordInput, password);
    }
    if (confirmPassword) {
        userEvent.type(confirmPasswordInput, confirmPassword);
    }
    return {
        emailInput,
        passwordInput,
        confirmPasswordInput,
    };
};

const submitTheForm = () => {
    const submitBtn = screen.getByRole('button', {
        name: /submit/i,
    });
    userEvent.click(submitBtn);
};

test('inputs should be initially empty', () => {
    const emailInput = screen.getByRole('textbox');
    expect(emailInput.value).toBe('');

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput.value).toBe('');

    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    expect(confirmPasswordInput.value).toBe('');
});

test('should be able to type an email', () => {
    const { emailInput } = typeIntoForm({ email: 'ehsan@gmail.com' });
    expect(emailInput.value).toBe('ehsan@gmail.com');
});

test('should be able to type a password', () => {
    const { passwordInput } = typeIntoForm({ password: '123' });
    expect(passwordInput.value).toBe('123');
});

test('should be able to type a confirm password', () => {
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    userEvent.type(confirmPasswordInput, '123');
    expect(confirmPasswordInput.value).toBe('123');
});

test('should show error message on invalid email', async () => {
    const emailError = screen.queryByText(/the email is invalid/i);
    expect(emailError).not.toBeInTheDocument();
    typeIntoForm({ email: 'ehsangmail.com' });
    submitTheForm();
    const emailErrorAgain = await screen.findByText(/the email is invalid/i);
    expect(emailErrorAgain).toBeInTheDocument();
});

test('should show error message on invalid password', async () => {
    typeIntoForm({ email: 'ehsan@gmail.com', password: '123' });
    submitTheForm();

    const passwordError = await screen.findByText(
        /password should be more than 5 correctors/i
    );
    expect(passwordError).toBeInTheDocument();
});

test('show an error if passwords do not match', async () => {
    typeIntoForm({
        email: 'ehsan@gmail.com',
        password: '123456',
        confirmPassword: '12312312',
    });
    submitTheForm();

    const passwordError = await screen.findByText(/passwords do not match/i);
    expect(passwordError).toBeInTheDocument();
});

test('should show no error if every input is valid', () => {
    typeIntoForm({
        email: 'ehsan@gmail.com',
        password: '123456',
        confirmPassword: '123456',
    });
    submitTheForm();

    const passwordError = screen.queryByText(/passwords do not match/i);
    const confirmPasswordError = screen.queryByText(
        /password should be more than 5 correctors/i
    );
    const emailError = screen.queryByText(/the email is invalid/i);

    expect(passwordError).not.toBeInTheDocument();
    expect(confirmPasswordError).not.toBeInTheDocument();
    expect(emailError).not.toBeInTheDocument();
});
