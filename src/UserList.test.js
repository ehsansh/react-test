import { render, screen, act, within } from '@testing-library/react';
import UserList from './UserList';

test('render one row per user', () => {
    //render component
    const users = [
        { name: 'ehsan', email: 'ehsan@gmail.com' },
        { name: 'josh', email: 'josh@gmail.com' },
    ];
    render(<UserList users={users} />);

    //find all the rows in the table
    const rows = within(screen.getByTestId('users')).getAllByRole('row');

    //assertion: correct number of rows in the table
    expect(rows).toHaveLength(2);
});

test('render email and name of each user', () => {});
