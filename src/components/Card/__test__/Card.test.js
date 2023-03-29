import { render, screen } from '@testing-library/react';
import { useEvent } from '@testing-library/user-event';
import Card from '../Card';

const cardProps = {
    name: 'john',
    phone: '123',
    email: 'john@example.com',
    image: {
        url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        alt: 'cute cat',
    },
    favoured: false,
};

describe('Card', () => {
    test('should show name of cat', () => {
        render(<Card {...cardProps} />);
        expect(
            screen.getByRole('heading', {
                name: /john/i,
            })
        ).toBeInTheDocument();
    });

    test('should show phone', () => {
        render(<Card {...cardProps} />);
        expect(screen.getByText(/123/i)).toBeInTheDocument();
    });

    test('should show email', () => {
        render(<Card {...cardProps} />);
        expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    });

    test('should show image with correct src', () => {
        render(<Card {...cardProps} />);
        expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
    });

    test('should show outlined heart', () => {
        render(<Card {...cardProps} />);
        expect(screen.getByAltText(/filled heart/i)).not.toBeInTheDocument();
        expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    });

    test('should show filled heart', () => {
        render(<Card {...cardProps} favoured={true} />);
        expect(screen.getByAltText(/outlined heart/i)).not.toBeInTheDocument();
        expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
    });

    test('should toggle heart status', () => {
        render(<Card {...cardProps} />);
        useEvent.click(screen.getByRole('button'));
        expect(screen.getByAltText(/outlined heart/i)).not.toBeInTheDocument();
        expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
        useEvent.click(screen.getByRole('button'));
        expect(screen.getByAltText(/filled heart/i)).not.toBeInTheDocument();
        expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    });
});
