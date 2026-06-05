import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Menu, X, HeartHandshake, LogIn } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const { isAuthenticated, logout } = useAuth();
  const { siteContent } = useData();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-neutral-50 border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              {siteContent.logoUrl ? (
                <img src={siteContent.logoUrl} alt="HESED Logo" className="w-auto h-12" />
              ) : (
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">H</div>
              )}
              {(!siteContent.logoUrl || siteContent.logoUrl.trim() === '') && (
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-emerald-500">HESED</h1>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500">Brigadas de Amor Cristiano</p>
                </div>
              )}
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:gap-8">
            <a href="/" className="text-sm font-medium text-neutral-600 hover:text-emerald-500 transition-colors">
              Inicio
            </a>
            <a href="/#about" className="text-sm font-medium text-neutral-600 hover:text-emerald-500 transition-colors">
              Nuestra Labor
            </a>
            <a href="/#gallery" className="text-sm font-medium text-neutral-600 hover:text-emerald-500 transition-colors">
              Galería
            </a>
            <Link to="/blog" className="text-sm font-medium text-neutral-600 hover:text-emerald-500 transition-colors">
              Blog / Noticias
            </Link>
            <Link to="/inscripcion" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
              Inscripción
            </Link>
            <a href="/#donations" className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-colors text-sm font-medium">
              Donar Ahora
            </a>
            
            <div className="h-6 w-[1px] bg-neutral-300 hidden sm:block"></div>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/admin" className="text-emerald-500 hover:text-emerald-700 font-medium text-sm">
                  Portal Coordinador
                </Link>
                <button
                  onClick={logout}
                  className="text-neutral-500 hover:text-neutral-700 text-sm font-medium"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex flex-row items-center gap-2 text-sm font-medium text-neutral-600 hover:text-emerald-500 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Coordinadores</span>
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden border-t border-neutral-300 bg-neutral-50">
          <div className="pt-2 pb-3 space-y-1">
            <a href="/" className="block pl-3 pr-4 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-100 hover:text-emerald-500">Inicio</a>
            <a href="/#about" className="block pl-3 pr-4 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-100 hover:text-emerald-500">Nuestra Labor</a>
            <a href="/#gallery" className="block pl-3 pr-4 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-100 hover:text-emerald-500">Galería</a>
            <Link to="/blog" className="block pl-3 pr-4 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-100 hover:text-emerald-500">Blog / Noticias</Link>
            <Link to="/inscripcion" className="block pl-3 pr-4 py-2 text-base font-bold text-emerald-600 hover:bg-neutral-100 hover:text-emerald-700">Inscripción</Link>
            <a href="/#donations" className="block pl-3 pr-4 py-2 text-base font-medium text-blue-500 hover:bg-neutral-100 hover:text-blue-600">Donar Ahora</a>
          </div>
          <div className="pt-4 pb-3 border-t border-neutral-200">
            {isAuthenticated ? (
              <div className="space-y-1">
                <Link to="/admin" className="block pl-3 pr-4 py-2 text-base font-medium text-emerald-500 hover:bg-neutral-100 hover:text-emerald-600">Portal Coordinador</Link>
                <button onClick={logout} className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800">Salir</button>
              </div>
            ) : (
                <Link to="/login" className="block pl-3 pr-4 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-100 hover:text-emerald-500 flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Coordinadores
                </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
