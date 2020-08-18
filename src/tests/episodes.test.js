import React from 'react';
import { render, screen } from '@testing-library/react';
import Episodes from '../components/Episodes';
import { mockEpisodes } from './app.test';
  
test('Render episodes when data fetch is done', () => {
 const { rerender } = render(<Episodes episodes={[]}/>);
 let episodesArr = screen.queryAllByTestId(/episodes/i);
 expect(episodesArr).toHaveLength(0);

 rerender(<Episodes episodes={mockEpisodes} />);
 episodesArr = screen.getAllByTestId(/episodes/i);
 expect(episodesArr).toHaveLength(26);
});

  