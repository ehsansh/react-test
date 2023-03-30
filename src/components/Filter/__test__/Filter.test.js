import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import Filter from '../Filter';

describe('Filter', () => {
    test('should be able to change value of favoured select', () => {
        render(<Filter filters={{}} setFilters={() => {}} />);
        const select = screen.getByLabelText(/favoured/i);
        expect(select.value).toBe('any');
        userEvents.selectOptions(select, 'favoured');
        expect(select.value).toBe('favoured');
        userEvents.selectOptions(select, 'not favoured');
        expect(select.value).toBe('not favoured');
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
