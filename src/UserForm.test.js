import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
    //render a component
    render(<UserForm />);
    //manipulate the component or find and element in it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    //assertion - make the component is doing what we expect to do

    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted', () => {
    const mock = jest.fn();

    render(<UserForm onUserAdd={mock} />);

    const nameInput = screen.getByRole('textbox', {
        name: /name/i,
    });
    const emailInput = screen.getByRole('textbox', {
        name: /email/i,
    });

    user.click(nameInput);
    act(() => {
        user.keyboard('ehsan');
    });

    user.click(emailInput);
    act(() => {
        user.keyboard('ehsan@gmail.com');
    });

    const button = screen.getByRole('button');
    act(() => {
        user.click(button);
    });

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({
        name: 'ehsan',
        email: 'ehsan@gmail.com',
    });
});

test('empty the two inputs when the form is submitted', () => {
    render(<UserForm onUserAdd={() => {}} />);
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

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
});
