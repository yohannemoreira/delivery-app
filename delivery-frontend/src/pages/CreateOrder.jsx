import React, { useState } from 'react';

const CreateOrder = () => {
  const [form, setForm] = useState({
    user_id: '',
    pickup_address_street: '',
    pickup_address_number: '',
    pickup_address_complement: '',
    pickup_address_neighborhood: '',
    pickup_address_city: '',
    pickup_address_state: '',
    pickup_address_zip: '',
    pickup_address_country: '',
    delivery_address_street: '',
    delivery_address_number: '',
    delivery_address_complement: '',
    delivery_address_neighborhood: '',
    delivery_address_city: '',
    delivery_address_state: '',
    delivery_address_zip: '',
    delivery_address_country: '',
    description: [],
    estimated_value: '',
  });
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      // Se todos os campos obrigatórios (exceto estimated_value) estiverem preenchidos, gera valor aleatório
      const obrigatorios = [
        'user_id',
        'pickup_address_street',
        'pickup_address_number',
        'pickup_address_neighborhood',
        'pickup_address_city',
        'pickup_address_state',
        'pickup_address_zip',
        'pickup_address_country',
        'delivery_address_street',
        'delivery_address_number',
        'delivery_address_neighborhood',
        'delivery_address_city',
        'delivery_address_state',
        'delivery_address_zip',
        'delivery_address_country',
      ];
      const allFilled = obrigatorios.every(field => updated[field] && updated[field].toString().trim() !== '');
      if (allFilled && updated.description.length > 0 && !updated.estimated_value) {
        // Gera valor aleatório entre 10 e 200
        updated.estimated_value = (Math.random() * (200 - 10) + 10).toFixed(2);
      }
      return updated;
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim() === '') return;
    setForm((prev) => ({ ...prev, description: [...prev.description, newItem.trim()] }));
    setNewItem('');
  };

  const handleRemoveItem = (idx) => {
    setForm((prev) => ({ ...prev, description: prev.description.filter((_, i) => i !== idx) }));
  };

  const validate = () => {
    const errors = {};
    // Usuário
    if (!form.user_id) errors.user_id = 'Usuário não pode ser vazio';
    // Retirada
    if (!form.pickup_address_street) errors.pickup_address_street = 'A rua de retirada não pode ser vazia';
    if (!form.pickup_address_number) errors.pickup_address_number = 'O número de retirada não pode ser vazio';
    if (!form.pickup_address_neighborhood) errors.pickup_address_neighborhood = 'O bairro de retirada não pode ser vazio';
    if (!form.pickup_address_city) errors.pickup_address_city = 'A cidade de retirada não pode ser vazia';
    if (!form.pickup_address_state) errors.pickup_address_state = 'O estado de retirada não pode ser vazio';
    else if (form.pickup_address_state.length !== 2) errors.pickup_address_state = 'O estado de retirada deve ter 2 caracteres';
    if (!form.pickup_address_zip) errors.pickup_address_zip = 'O CEP de retirada não pode ser vazio';
    if (!form.pickup_address_country) errors.pickup_address_country = 'O país de retirada não pode ser vazio';
    // Entrega
    if (!form.delivery_address_street) errors.delivery_address_street = 'A rua de entrega não pode ser vazia';
    if (!form.delivery_address_number) errors.delivery_address_number = 'O número de entrega não pode ser vazio';
    if (!form.delivery_address_neighborhood) errors.delivery_address_neighborhood = 'O bairro de entrega não pode ser vazio';
    if (!form.delivery_address_city) errors.delivery_address_city = 'A cidade de entrega não pode ser vazia';
    if (!form.delivery_address_state) errors.delivery_address_state = 'O estado de entrega não pode ser vazio';
    else if (form.delivery_address_state.length !== 2) errors.delivery_address_state = 'O estado de entrega deve ter 2 caracteres';
    if (!form.delivery_address_zip) errors.delivery_address_zip = 'O CEP de entrega não pode ser vazio';
    if (!form.delivery_address_country) errors.delivery_address_country = 'O país de entrega não pode ser vazio';
    // Descrição e valor
    if (!form.description || form.description.length === 0) errors.description = 'A descrição não pode ser vazia';
    if (!form.estimated_value) errors.estimated_value = 'O valor estimado não pode ser vazio';
    else if (isNaN(form.estimated_value) || Number(form.estimated_value) <= 0) errors.estimated_value = 'O valor estimado deve ser maior que 0';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    try {
      const payload = {
        ...form,
        user_id: form.user_id ? Number(form.user_id) : '',
        estimated_value: form.estimated_value ? Number(form.estimated_value) : '',
        description: form.description.join(', '),
      };
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order: payload }),
      });
      if (!response.ok) throw new Error('Erro ao criar pedido');
      setSuccess(true);
      setForm({
        user_id: '',
        pickup_address_street: '',
        pickup_address_number: '',
        pickup_address_complement: '',
        pickup_address_neighborhood: '',
        pickup_address_city: '',
        pickup_address_state: '',
        pickup_address_zip: '',
        pickup_address_country: '',
        delivery_address_street: '',
        delivery_address_number: '',
        delivery_address_complement: '',
        delivery_address_neighborhood: '',
        delivery_address_city: '',
        delivery_address_state: '',
        delivery_address_zip: '',
        delivery_address_country: '',
        description: [],
        estimated_value: '',
      });
      setFieldErrors({});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Sistema de Pedidos de Entrega</h1>
      <p className="text-gray-500 mb-8">Gerencie pedidos de entrega de forma simples e eficiente</p>
      <button
        type="button"
        className="mb-6 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
        onClick={() => window.location.href = '/'}
      >Voltar para Início</button>
      <div className="bg-white rounded-xl shadow-md w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Criar Novo Pedido</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-100 rounded-lg p-6 mb-2 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              Endereço de Coleta
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ...campos de coleta... */}
              <div>
                <label htmlFor="pickup_address_street" className="block text-sm font-medium text-gray-700">Rua *</label>
                <input id="pickup_address_street" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500" type="text" name="pickup_address_street" placeholder="Nome da rua" value={form.pickup_address_street} onChange={handleChange} />
                {fieldErrors.pickup_address_street && <span className="text-xs text-red-500">{fieldErrors.pickup_address_street}</span>}
              </div>
              <div>
                <label htmlFor="pickup_address_number" className="block text-sm font-medium text-gray-700">Número *</label>
                <input id="pickup_address_number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500" type="text" name="pickup_address_number" placeholder="123" value={form.pickup_address_number} onChange={handleChange} />
                {fieldErrors.pickup_address_number && <span className="text-xs text-red-500">{fieldErrors.pickup_address_number}</span>}
              </div>
              <div>
                <label htmlFor="pickup_address_complement" className="block text-sm font-medium text-gray-700">Complemento</label>
                <input id="pickup_address_complement" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500" type="text" name="pickup_address_complement" placeholder="Apto, bloco, etc." value={form.pickup_address_complement} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="pickup_address_neighborhood" className="block text-sm font-medium text-gray-700">Bairro *</label>
                <input id="pickup_address_neighborhood" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500" type="text" name="pickup_address_neighborhood" placeholder="Nome do bairro" value={form.pickup_address_neighborhood} onChange={handleChange} />
                {fieldErrors.pickup_address_neighborhood && <span className="text-xs text-red-500">{fieldErrors.pickup_address_neighborhood}</span>}
              </div>
              <div>
                <label htmlFor="pickup_address_city" className="block text-sm font-medium text-gray-700">Cidade *</label>
                <input id="pickup_address_city" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500" type="text" name="pickup_address_city" placeholder="Nome da cidade" value={form.pickup_address_city} onChange={handleChange} />
                {fieldErrors.pickup_address_city && <span className="text-xs text-red-500">{fieldErrors.pickup_address_city}</span>}
              </div>
              <div>
                <label htmlFor="pickup_address_state" className="block text-sm font-medium text-gray-700">Estado *</label>
                <input id="pickup_address_state" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500" type="text" name="pickup_address_state" placeholder="SP" value={form.pickup_address_state} onChange={handleChange} />
                {fieldErrors.pickup_address_state && <span className="text-xs text-red-500">{fieldErrors.pickup_address_state}</span>}
              </div>
              <div>
                <label htmlFor="pickup_address_zip" className="block text-sm font-medium text-gray-700">CEP *</label>
                <input id="pickup_address_zip" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500" type="text" name="pickup_address_zip" placeholder="12345-678" value={form.pickup_address_zip} onChange={handleChange} />
                {fieldErrors.pickup_address_zip && <span className="text-xs text-red-500">{fieldErrors.pickup_address_zip}</span>}
              </div>
              <div>
                <label htmlFor="pickup_address_country" className="block text-sm font-medium text-gray-700">País *</label>
                <input id="pickup_address_country" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500" type="text" name="pickup_address_country" placeholder="Brasil" value={form.pickup_address_country} onChange={handleChange} />
                {fieldErrors.pickup_address_country && <span className="text-xs text-red-500">{fieldErrors.pickup_address_country}</span>}
              </div>
            </div>
          </div>
          {/* Endereço de Entrega */}
          <div className="bg-gray-100 rounded-lg p-6 mb-2 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              Endereço de Entrega
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="delivery_address_street" className="block text-sm font-medium text-gray-700">Rua *</label>
                <input id="delivery_address_street" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="delivery_address_street" placeholder="Nome da rua" value={form.delivery_address_street} onChange={handleChange} />
                {fieldErrors.delivery_address_street && <span className="text-xs text-red-500">{fieldErrors.delivery_address_street}</span>}
              </div>
              <div>
                <label htmlFor="delivery_address_number" className="block text-sm font-medium text-gray-700">Número *</label>
                <input id="delivery_address_number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="delivery_address_number" placeholder="123" value={form.delivery_address_number} onChange={handleChange} />
                {fieldErrors.delivery_address_number && <span className="text-xs text-red-500">{fieldErrors.delivery_address_number}</span>}
              </div>
              <div>
                <label htmlFor="delivery_address_complement" className="block text-sm font-medium text-gray-700">Complemento</label>
                <input id="delivery_address_complement" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="delivery_address_complement" placeholder="Apto, bloco, etc." value={form.delivery_address_complement} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="delivery_address_neighborhood" className="block text-sm font-medium text-gray-700">Bairro *</label>
                <input id="delivery_address_neighborhood" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="delivery_address_neighborhood" placeholder="Nome do bairro" value={form.delivery_address_neighborhood} onChange={handleChange} />
                {fieldErrors.delivery_address_neighborhood && <span className="text-xs text-red-500">{fieldErrors.delivery_address_neighborhood}</span>}
              </div>
              <div>
                <label htmlFor="delivery_address_city" className="block text-sm font-medium text-gray-700">Cidade *</label>
                <input id="delivery_address_city" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="delivery_address_city" placeholder="Nome da cidade" value={form.delivery_address_city} onChange={handleChange} />
                {fieldErrors.delivery_address_city && <span className="text-xs text-red-500">{fieldErrors.delivery_address_city}</span>}
              </div>
              <div>
                <label htmlFor="delivery_address_state" className="block text-sm font-medium text-gray-700">Estado *</label>
                <input id="delivery_address_state" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="delivery_address_state" placeholder="SP" value={form.delivery_address_state} onChange={handleChange} />
                {fieldErrors.delivery_address_state && <span className="text-xs text-red-500">{fieldErrors.delivery_address_state}</span>}
              </div>
              <div>
                <label htmlFor="delivery_address_zip" className="block text-sm font-medium text-gray-700">CEP *</label>
                <input id="delivery_address_zip" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="delivery_address_zip" placeholder="12345-678" value={form.delivery_address_zip} onChange={handleChange} />
                {fieldErrors.delivery_address_zip && <span className="text-xs text-red-500">{fieldErrors.delivery_address_zip}</span>}
              </div>
              <div>
                <label htmlFor="delivery_address_country" className="block text-sm font-medium text-gray-700">País *</label>
                <input id="delivery_address_country" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" type="text" name="delivery_address_country" placeholder="Brasil" value={form.delivery_address_country} onChange={handleChange} />
                {fieldErrors.delivery_address_country && <span className="text-xs text-red-500">{fieldErrors.delivery_address_country}</span>}
              </div>
            </div>
          </div>
          {/* Dados do Usuário e Descrição */}
          <div className="bg-gray-100 rounded-lg p-6 mb-2 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">ID do Usuário *</label>
                <input id="user_id" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" type="text" name="user_id" placeholder="ID do usuário" value={form.user_id} onChange={handleChange} />
                {fieldErrors.user_id && <span className="text-xs text-red-500">{fieldErrors.user_id}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Itens do Pedido *</label>
                <div className="flex gap-2 mt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    type="text"
                    placeholder="Adicionar item"
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                  />
                  <button
                    type="button"
                    className="px-3 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
                    onClick={handleAddItem}
                  >Adicionar</button>
                </div>
                {fieldErrors.description && <span className="text-xs text-red-500">{fieldErrors.description}</span>}
                <ul className="mt-2 space-y-1">
                  {form.description.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between bg-indigo-50 rounded px-2 py-1 text-indigo-800">
                      <span>{item}</span>
                      <button type="button" className="ml-2 text-xs text-red-500 hover:text-red-700" onClick={() => handleRemoveItem(idx)}>Remover</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Valor Estimado */}
          <div className="bg-gray-100 rounded-lg p-6 mb-2 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Valor Estimado *</label>
                <div className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 text-green-700 font-bold">
                  {form.estimated_value ? `R$ ${form.estimated_value}` : <span className="text-gray-400">Preencha todos os campos obrigatórios</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full py-3 px-6 rounded-lg bg-pink-600 text-white font-bold hover:bg-pink-700 transition disabled:opacity-50">
              {loading ? 'Enviando...' : 'Criar Pedido'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">Pedido criado com sucesso!</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
