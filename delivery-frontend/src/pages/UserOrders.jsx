import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserOrders = () => {
  const [userId, setUserId] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchOrders = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrders([]);
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}/orders`);
      if (!response.ok) throw new Error('Erro ao buscar pedidos');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Consultar Pedidos</h1>
      <p className="text-gray-500 mb-8">Veja os pedidos de entrega por usuário</p>
      <button
        type="button"
        className="mb-6 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
        onClick={() => navigate('/')}
      >Voltar para Início</button>
      <div className="bg-white rounded-xl shadow-md w-full max-w-2xl p-8">
        <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow-sm">
          <form onSubmit={fetchOrders} className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">ID do Usuário</label>
              <input className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" type="text" value={userId} onChange={e => setUserId(e.target.value)} required placeholder="Digite o ID do usuário" />
            </div>
            <button type="submit" disabled={loading} className="py-2 px-6 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition disabled:opacity-50">
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </form>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ul className="space-y-4">
          {orders.length === 0 && !loading && <li className="text-gray-500">Nenhum pedido encontrado.</li>}
          {orders.map(order => (
            <li key={order.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <span className="font-bold text-lg text-gray-700">{order.description}</span>
                <span className="text-green-600 font-semibold">R$ {order.estimated_value}</span>
              </div>
              <div className="text-sm text-gray-500 mb-2">{order.created_at ? new Date(order.created_at).toLocaleString('pt-BR') : '-'}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span className="font-semibold text-pink-600">Coleta:</span> {order.pickup_address?.street}, {order.pickup_address?.number} - {order.pickup_address?.city}/{order.pickup_address?.state}
                </div>
                <div>
                  <span className="font-semibold text-blue-600">Entrega:</span> {order.delivery_address?.street}, {order.delivery_address?.number} - {order.delivery_address?.city}/{order.delivery_address?.state}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserOrders;
