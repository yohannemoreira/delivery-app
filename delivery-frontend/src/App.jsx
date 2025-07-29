
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import CreateOrder from './pages/CreateOrder';
import UserOrders from './pages/UserOrders';

function HomeButtons() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-start min-h-screen bg-gray-50 p-8'>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Service</h1>
      <p className="text-gray-600 mb-8">Gerencie pedidos de entrega de forma simples</p>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-xs">
        <button
          className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
          onClick={() => navigate('/criar-pedido')}
        >
          Criar Pedido
        </button>
        <button
          className="w-full py-3 px-6 rounded-lg bg-pink-600 text-white font-bold hover:bg-pink-700 transition"
          onClick={() => navigate('/pedidos-usuario')}
        >
          Pedidos do Usuário
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/criar-pedido" element={<CreateOrder />} />
        <Route path="/pedidos-usuario" element={<UserOrders />} />
        <Route path="/" element={<HomeButtons />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
