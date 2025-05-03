import React from 'react';
import { render, screen } from '@testing-library/react';
import UserInputPage from './UserInputPage';
import { BrowserRouter } from 'react-router-dom';

// This is a unit test for UserInputPage. Run with `npm test`.
// Author: [Your Name/Team]

describe('UserInputPage', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <UserInputPage />
      </BrowserRouter>
    );
  });

  it('renders the return button', () => {
    render(
      <BrowserRouter>
        <UserInputPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /返回首页/i })).toBeInTheDocument();
  });

  it('renders 22 card buttons', () => {
    render(
      <BrowserRouter>
        <UserInputPage />
      </BrowserRouter>
    );
    // 直接用 data-testid 检查卡牌数量
    expect(screen.getAllByTestId('card-btn').length).toBe(22);
  });
}); 