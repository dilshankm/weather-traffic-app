import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './locationSearch';
import '@testing-library/jest-dom';

describe('Search component', () => {
  it('renders without crashing', () => {
    const props = {
      data: ['City1', 'City2', 'City3'],
      onSelect: jest.fn(),
      disableClose: true,
    };

    render(<Search {...props} />);
    expect(screen.getByLabelText(/select a city/i)).toBeInTheDocument();
  });

  it.skip('calls onSelect when an option is selected', async () => {
    const onSelectMock = jest.fn();
    const props = {
      data: ['City1', 'City2', 'City3'],
      onSelect: onSelectMock,
      disableClose: true,
    };

    render(<Search {...props} />);
    await waitFor(() => {
        userEvent.type(screen.getByLabelText(/select a city/i), 'City1');
        userEvent.click(screen.getByText('City1'));
    });
    expect(onSelectMock).toHaveBeenCalled();
  });
});
