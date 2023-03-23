import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

test('can receive a new user and show it on a list', () => {
    render(<App />);

    const nameInput = screen.getByRole('textbox', {
        name: /name/i,
    });
    const emailInput = screen.getByRole('textbox', {
        name: /email/i,
    });

    const button = screen.getByRole('button');

    user.click(nameInput);
    act(() => {
        user.keyboard('ehsan');
    });

    user.click(emailInput);
    act(() => {
        user.keyboard('ehsan@gmail.com');
    });

    act(() => {
        user.click(button);
    });

    const name = screen.getByRole('cell', {
        name: 'ehsan',
    });
    const email = screen.getByRole('cell', {
        name: 'ehsan@gmail.com',
    });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
});
