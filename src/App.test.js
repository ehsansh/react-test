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
    userEvent.click(
        screen.getByRole('button', {
            name: /submit/i,
        })
    );
};

test('inputs should be initially empty', () => {
    expect(screen.getByRole('textbox').value).toBe('');
    expect(screen.getByLabelText('Password').value).toBe('');
    expect(screen.getByLabelText(/confirm password/i).value).toBe('');
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
    userEvent.type(screen.getByLabelText(/confirm password/i), '123');
    expect(screen.getByLabelText(/confirm password/i).value).toBe('123');
});

test('should show error message on invalid email', async () => {
    expect(screen.queryByText(/the email is invalid/i)).not.toBeInTheDocument();
    typeIntoForm({ email: 'ehsangmail.com' });
    submitTheForm();
    expect(
        await screen.findByText(/the email is invalid/i)
    ).toBeInTheDocument();
});

test('should show error message on invalid password', async () => {
    typeIntoForm({ email: 'ehsan@gmail.com', password: '123' });
    submitTheForm();
    expect(
        await screen.findByText(/password should be more than 5 correctors/i)
    ).toBeInTheDocument();
});

test('show an error if passwords do not match', async () => {
    typeIntoForm({
        email: 'ehsan@gmail.com',
        password: '123456',
        confirmPassword: '12312312',
    });
    submitTheForm();
    expect(
        await screen.findByText(/passwords do not match/i)
    ).toBeInTheDocument();
});

test('should show no error if every input is valid', () => {
    typeIntoForm({
        email: 'ehsan@gmail.com',
        password: '123456',
        confirmPassword: '123456',
    });
    submitTheForm();
    expect(
        screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();
    expect(
        screen.queryByText(/password should be more than 5 correctors/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/the email is invalid/i)).not.toBeInTheDocument();
});
