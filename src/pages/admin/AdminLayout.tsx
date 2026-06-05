import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Users, BookOpen, Clock, Activity, PenTool, Gift, Layout } from 'lucide-react';

export default function AdminLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Resumen', path: '/admin', icon: Activity },
    { name: 'Voluntarios', path: '/admin/volunteers', icon: Users },
    { name: 'Niños Inscritos', path: '/admin/kids', icon: BookOpen },
    { name: 'Asistencia Voluntarios', path: '/admin/attendance', icon: Clock },
    { name: 'Donaciones', path: '/admin/donations', icon: Gift },
    { name: 'Blog / Noticias', path: '/admin/blog', icon: PenTool },
    { name: 'Editor Web', path: '/admin/editor', icon: Layout },
  ];

  return (
    <div className="flex h-screen bg-neutral-100">
      <div className="w-64 bg-emerald-800 text-white flex flex-col">
        <div className="p-4 border-b border-emerald-700">
          <h2 className="text-xl font-bold">Portal HESED</h2>
          <p className="text-emerald-300 text-sm">Panel de Coordinación</p>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-emerald-900 text-white' : 'text-emerald-100 hover:bg-emerald-700 hover:text-white'}`}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-emerald-900">
           <Link to="/" className="text-emerald-100 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full hover:bg-emerald-700 transition-colors">
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Sitio Web
           </Link>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
