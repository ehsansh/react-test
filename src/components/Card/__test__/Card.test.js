import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Card from '../Card';
import cats from '../../../mocks/cats.json';
import { PetsContext } from '../../Pets/Pets';
const cardProps = {
    name: 'john',
    phone: '123',
    email: 'john@example.com',
    image: {
        url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        alt: 'cute cat',
    },
    favoured: false,
    updateFavourites: () => {},
    index: 1,
};

const renderCard = props => {
    render(
        <PetsContext.Provider value={{ cats, setCats: () => {} }}>
            <Card {...props} />
        </PetsContext.Provider>
    );
};

describe('Card', () => {
    test('should show name of cat', () => {
        renderCard(cardProps);
        expect(
            screen.getByRole('heading', {
                name: /john/i,
            })
        ).toBeInTheDocument();
    });

    test('should show phone', () => {
        renderCard(cardProps);
        expect(screen.getByText(/123/i)).toBeInTheDocument();
    });

    test('should show email', () => {
        renderCard(cardProps);
        expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    });

    test('should show image with correct src', () => {
        renderCard(cardProps);
        expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
    });

    test('should show outlined heart', () => {
        renderCard(cardProps);
        expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
        expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    });

    test('should show filled heart', () => {
        renderCard({ ...cardProps, favoured: true });

        expect(
            screen.queryByAltText(/outlined heart/i)
        ).not.toBeInTheDocument();
        expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
    });

    test('should toggle heart status', async () => {
        renderCard(cardProps);
        act(() => {
            userEvents.click(screen.getByRole('button'));
        });

        expect(await screen.findByAltText(/filled heart/i)).toBeInTheDocument();
        expect(
            screen.queryByAltText(/outlined heart/i)
        ).not.toBeInTheDocument();

        act(() => {
            userEvents.click(screen.getByRole('button'));
        });

        expect(
            await screen.findByAltText(/outlined heart/i)
        ).toBeInTheDocument();
        expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    });
});
