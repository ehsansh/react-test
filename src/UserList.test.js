import { render, screen, act, within } from '@testing-library/react';
import UserList from './UserList';

function renderComponent() {
    const users = [
        { name: 'ehsan', email: 'ehsan@gmail.com' },
        { name: 'josh', email: 'josh@gmail.com' },
    ];
    render(<UserList users={users} />);
    return {
        users,
    };
}

test('render one row per user', () => {
    //render component
    renderComponent();

    //find all the rows in the table
    const rows = within(screen.getByTestId('users')).getAllByRole('row');
    // const rows = container.querySelectorAll('tbody tr');

    //assertion: correct number of rows in the table
    expect(rows).toHaveLength(2);
});

test('render email and name of each user', () => {
    const { users } = renderComponent();

    for (let user of users) {
        const name = screen.getByRole('cell', {
            name: user.name,
        });
        const email = screen.getByRole('cell', {
            name: user.email,
        });

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }
});
