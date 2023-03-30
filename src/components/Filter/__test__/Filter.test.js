import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import Filter from '../Filter';

describe('Filter', () => {
    test('should be able to change value of favoured select', () => {
        render(<Filter filters={{}} setFilters={() => {}} />);
        const select = screen.getByLabelText(/favourite/i);
        expect(select.value).toBe('any');
        userEvents.selectOptions(select, 'favourite');
        expect(select.value).toBe('favourite');
        userEvents.selectOptions(select, 'not favourite');
        expect(select.value).toBe('not favourite');
    });

    test('should be able to change value of gender select', () => {
        render(<Filter filters={{}} setFilters={() => {}} />);
        const select = screen.getByLabelText(/gender/i);
        expect(select.value).toBe('any');
        userEvents.selectOptions(select, 'male');
        expect(select.value).toBe('male');
        userEvents.selectOptions(select, 'female');
        expect(select.value).toBe('female');
    });
});
