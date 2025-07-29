/* global jest, global, expect, describe, it */

import { render, screen, fireEvent } from '@testing-library/react';

import CreateOrder from './CreateOrder';
describe('CreateOrder', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('exibe mensagem de sucesso ao criar pedido', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    render(<CreateOrder />);
    
    fireEvent.change(screen.getByLabelText(/ID do Usuário/i), { target: { value: '1' } });
    fireEvent.change(screen.getAllByPlaceholderText('Nome da rua')[0], { target: { value: 'Rua A' } });
    fireEvent.change(screen.getAllByPlaceholderText('123')[0], { target: { value: '10' } });
    fireEvent.change(screen.getAllByPlaceholderText('Nome do bairro')[0], { target: { value: 'Centro' } });
    fireEvent.change(screen.getAllByPlaceholderText('Nome da cidade')[0], { target: { value: 'SP' } });
    fireEvent.change(screen.getAllByPlaceholderText('SP')[0], { target: { value: 'SP' } });
    fireEvent.change(screen.getAllByPlaceholderText('12345-678')[0], { target: { value: '12345-678' } });
    fireEvent.change(screen.getAllByPlaceholderText('Brasil')[0], { target: { value: 'Brasil' } });
    
    fireEvent.change(screen.getAllByPlaceholderText('Nome da rua')[1], { target: { value: 'Rua B' } });
    fireEvent.change(screen.getAllByPlaceholderText('123')[1], { target: { value: '20' } });
    fireEvent.change(screen.getAllByPlaceholderText('Nome do bairro')[1], { target: { value: 'Bairro' } });
    fireEvent.change(screen.getAllByPlaceholderText('Nome da cidade')[1], { target: { value: 'SP' } });
    fireEvent.change(screen.getAllByPlaceholderText('SP')[1], { target: { value: 'SP' } });
    fireEvent.change(screen.getAllByPlaceholderText('12345-678')[1], { target: { value: '12345-678' } });
    fireEvent.change(screen.getAllByPlaceholderText('Brasil')[1], { target: { value: 'Brasil' } });
    
    fireEvent.change(screen.getByPlaceholderText('Adicionar item'), { target: { value: 'Pizza' } });
    fireEvent.click(screen.getByText('Adicionar'));
    
    fireEvent.click(screen.getByText('Criar Pedido'));
  });

  

  it('valida todos os campos obrigatórios e exibe erros', () => {
    render(<CreateOrder />);
    fireEvent.click(screen.getByText('Criar Pedido'));
    expect(screen.getByText(/Usuário não pode ser vazio/i)).toBeInTheDocument();
    expect(screen.getByText(/A rua de retirada não pode ser vazia/i)).toBeInTheDocument();
    expect(screen.getByText(/O número de retirada não pode ser vazio/i)).toBeInTheDocument();
    expect(screen.getByText(/O bairro de retirada não pode ser vazio/i)).toBeInTheDocument();
    expect(screen.getByText(/A cidade de retirada não pode ser vazia/i)).toBeInTheDocument();
    expect(screen.getByText(/O estado de retirada não pode ser vazio/i)).toBeInTheDocument();
    expect(screen.getByText(/O CEP de retirada não pode ser vazio/i)).toBeInTheDocument();
    expect(screen.getByText(/O país de retirada não pode ser vazio/i)).toBeInTheDocument();
    expect(screen.getByText(/A rua de entrega não pode ser vazia/i)).toBeInTheDocument();
    expect(screen.getByText(/O número de entrega não pode ser vazio/i)).toBeInTheDocument();
    expect(screen.getByText(/O bairro de entrega não pode ser vazio/i)).toBeInTheDocument();
    expect(screen.getByText(/A cidade de entrega não pode ser vazia/i)).toBeInTheDocument();
    expect(screen.getByText(/O estado de entrega não pode ser vazio/i)).toBeInTheDocument();
    expect(screen.getByText(/O CEP de entrega não pode ser vazio/i)).toBeInTheDocument();
    expect(screen.getByText(/O país de entrega não pode ser vazio/i)).toBeInTheDocument();
    expect(screen.getByText(/A descrição não pode ser vazia/i)).toBeInTheDocument();
    expect(screen.getByText(/O valor estimado não pode ser vazio/i)).toBeInTheDocument();
  });

  it('valida que o valor estimado é maior que zero', () => {
    render(<CreateOrder />);
    fireEvent.change(screen.getByLabelText(/Valor Estimado/i), { target: { value: '0' } });
    fireEvent.click(screen.getByText('Criar Pedido'));
    expect(screen.getByText(/O valor estimado deve ser maior que 0/i)).toBeInTheDocument();
  });

  it('renderiza o formulário de criação de pedido', () => {
    render(<CreateOrder />);
    expect(screen.getByText(/Sistema de Pedidos de Entrega/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Adicionar item'), { target: { value: 'Pizza' } });
    fireEvent.click(screen.getByText('Adicionar'));
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
