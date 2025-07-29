import { render, screen, fireEvent } from '@testing-library/react';
import CreateOrder from './CreateOrder';

describe('CreateOrder', () => {
  it('renderiza o formulário de criação de pedido', () => {
    render(<CreateOrder />);
    expect(screen.getByText(/Sistema de Pedidos de Entrega/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ID do Usuário/i)).toBeInTheDocument();
    expect(screen.getByText(/Itens do Pedido/i)).toBeInTheDocument();
  });

  it('adiciona itens à lista de descrição', () => {
    render(<CreateOrder />);
    const input = screen.getByPlaceholderText('Adicionar item');
    const addButton = screen.getByText('Adicionar');
    fireEvent.change(input, { target: { value: 'Pizza' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
  });

  it('remove itens da lista de descrição', () => {
    render(<CreateOrder />);
    const input = screen.getByPlaceholderText('Adicionar item');
    const addButton = screen.getByText('Adicionar');
    fireEvent.change(input, { target: { value: 'Pizza' } });
    fireEvent.click(addButton);
    const removeButton = screen.getByText('Remover');
    fireEvent.click(removeButton);
    expect(screen.queryByText('Pizza')).not.toBeInTheDocument();
  });

  it('valida campos obrigatórios', () => {
    render(<CreateOrder />);
    const submitButton = screen.getByText('Criar Pedido');
    fireEvent.click(submitButton);
    expect(screen.getByText(/Usuário não pode ser vazio/i)).toBeInTheDocument();
    expect(screen.getByText(/A rua de retirada não pode ser vazia/i)).toBeInTheDocument();
  });

  it('submete o formulário com sucesso', async () => {
    render(<CreateOrder />);
    const userIdInput = screen.getByLabelText(/ID do Usuário/i);
    // Seleciona o campo de rua de coleta (primeiro input com placeholder 'Nome da rua')
    const streetInput = screen.getAllByPlaceholderText('Nome da rua')[0];
    const descriptionInput = screen.getByPlaceholderText('Adicionar item');
    const addButton = screen.getByText('Adicionar');
    const submitButton = screen.getByText('Criar Pedido');

    fireEvent.change(userIdInput, { target: { value: '1' } });
    fireEvent.change(streetInput, { target: { value: 'Rua A' } });
    fireEvent.change(descriptionInput, { target: { value: 'Pizza' } });
    fireEvent.click(addButton);

    fireEvent.click(submitButton);

  });
});
