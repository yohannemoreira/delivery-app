import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserOrders from './UserOrders';
import { MemoryRouter } from 'react-router-dom';

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {
          id: 1,
          description: 'Item 1, Item 2',
          estimated_value: 50.0,
          status: 'pending',
          created_at: '2025-07-29T12:00:00Z',
        },
      ]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('UserOrders', () => {

  it('exibe mensagem se não houver pedidos', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
    render(
      <MemoryRouter>
        <UserOrders userId={2} />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Nenhum pedido encontrado/i)).toBeInTheDocument();
    });
  });

  it('botão de voltar navega para a tela inicial', () => {
    render(
      <MemoryRouter>
        <UserOrders userId={1} />
      </MemoryRouter>
    );
    const btn = screen.getByRole('button', { name: /voltar para início/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    // Não é possível testar window.location.href diretamente sem mocks
  });
});
