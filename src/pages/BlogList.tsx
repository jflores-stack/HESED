import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Navigation from '../components/Navigation';

export default function BlogList() {
  const { blogPosts } = useData();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900">
      <Navigation />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-12">
            <h1 className="text-4xl font-serif font-bold text-neutral-900">Blog y Noticias HESED</h1>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl">Mantente al tanto de todo lo que Dios está haciendo a través del proyecto. Lee testimonios, actualizaciones y enseñanzas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice().reverse().map((post) => (
               <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-neutral-300 overflow-hidden flex flex-col hover:border-emerald-500 transition-colors">
                   {post.imageUrl ? (
                       <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                   ) : (
                       <div className="w-full h-48 bg-neutral-200 flex items-center justify-center">
                           <span className="text-neutral-400 italic">Sin imagen</span>
                       </div>
                   )}
                   <div className="p-6 flex flex-col flex-grow">
                       <div className="flex items-center gap-3 mb-3">
                           <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
                               post.category === 'Noticia' ? 'bg-blue-100 text-blue-700' :
                               post.category === 'Testimonio' ? 'bg-purple-100 text-purple-700' :
                               'bg-orange-100 text-orange-700'
                           }`}>
                               {post.category}
                           </span>
                           <time className="text-xs text-neutral-500">{new Date(post.date).toLocaleDateString()}</time>
                       </div>
                       <h2 className="text-xl font-bold font-serif mb-2 leading-tight">
                           <Link to={`/blog/${post.id}`} className="hover:text-emerald-500 transition-colors">
                               {post.title}
                           </Link>
                       </h2>
                       <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                           {post.excerpt}
                       </p>
                       <div className="mt-auto pt-4 border-t border-neutral-100 flex justify-between items-center">
                           <span className="text-xs font-medium text-neutral-500">Por {post.author}</span>
                           <Link to={`/blog/${post.id}`} className="text-emerald-500 hover:text-emerald-700 text-sm font-semibold flex items-center gap-1">
                               Leer más <span aria-hidden="true">&rarr;</span>
                           </Link>
                       </div>
                   </div>
               </article>
            ))}
        </div>
        
        {blogPosts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-neutral-300 shadow-sm">
                <p className="text-neutral-500 text-lg">No hay artículos publicados todavía. Vuelve pronto.</p>
            </div>
        )}
      </main>

      <footer className="bg-white border-t border-neutral-300 px-6 py-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 mt-auto">
          <p className="mb-4 md:mb-0 font-medium tracking-wide">© {new Date().getFullYear()} Brigadas de Amor Cristiano • Proyecto HESED</p>
      </footer>
    </div>
  );
}
