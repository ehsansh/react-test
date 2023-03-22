import { render, screen } from '@testing-library/react';
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
    const argList = [];
    const callBack = (...args) => {
        argList.push(args);
    };

    render(<UserForm onUserAdd={callBack} />);

    const [nameInput, emailInput] = screen.getAllByRole('textbox');

    user.click(nameInput);
    user.keyboard('ehsan');

    user.click(emailInput);
    user.keyboard('ehsan@gmail.com');

    const button = screen.getByRole('button');
    user.click(button);

    expect(argList).toHaveLength(1);
    expect(argList[0][0]).toEqual({ name: 'ehsan', email: 'ehsan@gmail.com' });
});
