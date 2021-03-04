import React from 'react';
import { mockData } from '../fixtures/show';
import { render,  waitFor } from '@testing-library/react';
import { fetchShow as mockFetchShow } from '../api/fetchShow';
import App from '../App';

jest.mock('../api/fetchShow');
jest.mock("react-dropdown", () => ({ options, value, onChange }) => {
    function handleChange(event) {
      const option = options.find(
        (option) => option.value === event.currentTarget.value
      );
      onChange(option);
    }
    return (
      <select data-testid="dropdown" value={value} onChange={handleChange}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  });

test('loads show data', async () => {
    mockFetchShow.mockResolvedValueOnce({data: mockData});

    const { queryAllByTestId, queryAllByText } = render(<App/>);

    expect(queryAllByTestId('show')).toHaveLength(0);

   

    const dropdown = queryAllByTestId('dropdown');

    dropdown.value = 'Season 1';

    expect(dropdown.value).toBe('Season 1')

    await waitFor(() => { expect(queryAllByText('Season 1')).toBeTruthy()})

   
})