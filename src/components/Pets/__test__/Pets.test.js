import { getAllByRole, render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import Pets from '../Pets';
import Filter from '../../Filter/Filter';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import catsMock from '../../../mocks/cats.json';
import { act } from 'react-dom/test-utils';

const server = setupServer(
    rest.get('http://localhost:4000/cats', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(catsMock));
    })
);

// beforeEach(() => {
//     render(<Filter filters={{}} setFilters={() => {}} />);
// });
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Pets', () => {
    test('should render the correct amount of cards', async () => {
        render(<Pets />);
        const cards = await screen.findAllByRole('article');
        expect(cards.length).toBe(5);
    });

    test('should filter for female cats', async () => {
        render(<Pets />);
        render(<Filter filters={{}} setFilters={() => {}} />);
        const cards = await screen.findAllByRole('article');
        act(() => {
            userEvents.selectOptions(
                screen.getByLabelText(/gender/i),
                'female'
            );
        });
        const femaleCards = await screen.findAllByRole('article');
        expect(femaleCards).toStrictEqual([cards[0], cards[2], cards[4]]);
    });

    test('should filter for male cats', async () => {
        render(<Pets />);
        render(<Filter filters={{}} setFilters={() => {}} />);
        const cards = await screen.findAllByRole('article');
        act(() => {
            userEvents.selectOptions(screen.getByLabelText(/gender/i), 'male');
        });
        const maleCards = await screen.findAllByRole('article');
        expect(maleCards).toStrictEqual([cards[1], cards[3]]);
    });
});
