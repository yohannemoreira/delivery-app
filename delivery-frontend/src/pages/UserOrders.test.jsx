/* global describe, it, expect, jest, beforeEach, afterEach, global */
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import UserOrders from './UserOrders';
import { MemoryRouter } from 'react-router-dom';


beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {
          id: 1,
          description: 'Item 1',
          estimated_value: 50.0,
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

  it('renderiza a lista de pedidos do usuário', async () => {
    render(
      <MemoryRouter>
        <UserOrders userId={1} />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText(/R\$ 50.00/)).toBeInTheDocument();
    });
  });

  it('exibe erro se a API falhar', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Erro de API' }),
      })
    );
    render(
      <MemoryRouter>
        <UserOrders userId={3} />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Erro ao buscar pedidos'))).toBeInTheDocument();
    });
  });

  it('renderiza os dados completos do pedido', async () => {
    render(
      <MemoryRouter>
        <UserOrders userId={1} />
      </MemoryRouter>
    );
    await waitFor(() => {
        const card = screen.getByText((content) => /R\$\s?50(\.0{1,2})?/.test(content)).closest('li');
        expect(card).toBeInTheDocument();
        
        const utils = within(card);
        expect(utils.getByText(/Item\s*1/)).toBeInTheDocument();
        expect(utils.getByText(/R\$\s?50(\.0{1,2})?/)).toBeInTheDocument();
        
        expect(utils.getByText((content) => content.includes('2025'))).toBeInTheDocument();
        expect(utils.getByText((content) => content.includes('Coleta:'))).toBeInTheDocument();
        expect(utils.getByText((content) => content.includes('Entrega:'))).toBeInTheDocument();
    });
  });

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
    
  });
});
