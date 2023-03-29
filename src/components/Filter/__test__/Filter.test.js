import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import Filter from '../Filter';

describe('Filter', () => {
    test('should be able to change value of favoured select', () => {
        render(<Filter />);
        const select = screen.getByLabelText(/favourite/i);
        expect(select.value).toBe(/any/i);
        userEvents.selectOptions(select, 'favourite');
        expect(select.value).toBe(/favourite/i);
        userEvents.selectOptions(select, 'not favourite');
        expect(select.value).toBe(/not favourite/i);
    });

    test('should be able to change value of gender select', () => {
        render(<Filter />);
        const select = screen.getByLabelText(/gender/i);
        expect(select.value).toBe(/any/i);
        userEvents.selectOptions(select, 'male');
        expect(select.value).toBe(/male/i);
        userEvents.selectOptions(select, 'female');
        expect(select.value).toBe(/female/i);
    });
});
