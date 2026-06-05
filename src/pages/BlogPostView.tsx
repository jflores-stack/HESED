import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Navigation from '../components/Navigation';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function BlogPostView() {
  const { id } = useParams<{ id: string }>();
  const { blogPosts } = useData();
  const [comments, setComments] = useState<{name: string, text: string, date: Date}[]>([
      { name: 'Ana', text: '¡Qué gran bendición ver a los niños tan felices!', date: new Date('2023-09-11') }
  ]);
  const [newComment, setNewComment] = useState({ name: '', text: '' });

  const post = blogPosts.find(p => p.id === id);

  if (!post) {
      return (
          <div className="min-h-screen bg-neutral-50 flex flex-col">
              <Navigation />
              <div className="flex-grow flex items-center justify-center p-8">
                  <div className="text-center">
                      <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
                      <Link to="/blog" className="text-emerald-600 hover:underline">Volver al blog</Link>
                  </div>
              </div>
          </div>
      );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newComment.name || !newComment.text) return;
      setComments([...comments, { ...newComment, date: new Date() }]);
      setNewComment({ name: '', text: '' });
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900">
      <Navigation />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link to="/blog" className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-800 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver
        </Link>
        <article className="bg-white rounded-2xl shadow-sm border border-neutral-300 overflow-hidden">
            {post.imageUrl && (
                 <img src={post.imageUrl} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
            )}
            <div className="p-8 md:p-12">
                <header className="mb-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
                               post.category === 'Noticia' ? 'bg-blue-100 text-blue-700' :
                               post.category === 'Testimonio' ? 'bg-purple-100 text-purple-700' :
                               'bg-orange-100 text-orange-700'
                           }`}>
                               {post.category}
                        </span>
                        <time className="text-sm text-neutral-500">{new Date(post.date).toLocaleDateString()}</time>
                        <span className="text-sm text-neutral-500">• Por {post.author}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 leading-tight">
                        {post.title}
                    </h1>
                </header>
                
                <div className="prose prose-emerald max-w-none text-neutral-700 leading-relaxed font-sans whitespace-pre-wrap markdown-body">
                    <ReactMarkdown>{post.content || post.excerpt}</ReactMarkdown>
                </div>
            </div>
        </article>

        <section className="mt-12 bg-white rounded-2xl shadow-sm border border-neutral-300 p-8 md:p-12">
            <h3 className="text-2xl font-bold font-serif mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-emerald-500" />
                Comentarios ({comments.length})
            </h3>
            
            <form onSubmit={handleCommentSubmit} className="mb-10 bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                <h4 className="font-semibold text-neutral-800 mb-4">Añadir un comentario (Pendiente de moderación)</h4>
                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre</label>
                        <input type="text" required value={newComment.name} onChange={e => setNewComment({...newComment, name: e.target.value})} className="w-full rounded-md shadow-sm border-neutral-300 border p-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Tu nombre" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Comentario</label>
                        <textarea required rows={3} value={newComment.text} onChange={e => setNewComment({...newComment, text: e.target.value})} className="w-full rounded-md shadow-sm border-neutral-300 border p-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="¿Qué opinas sobre esto?" />
                    </div>
                    <div>
                        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
                            Enviar Comentario
                        </button>
                    </div>
                </div>
            </form>

            <div className="space-y-6">
                {comments.map((comment, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-neutral-100 bg-white">
                        <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-500 font-bold flex-shrink-0">
                            {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="font-bold text-neutral-900">{comment.name}</span>
                                <time className="text-xs text-neutral-500">{new Date(comment.date).toLocaleDateString()}</time>
                            </div>
                            <p className="text-neutral-700 text-sm leading-relaxed">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </main>
      
      <footer className="bg-white border-t border-neutral-300 px-6 py-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 mt-auto">
          <p className="mb-4 md:mb-0 font-medium tracking-wide">© {new Date().getFullYear()} Brigadas de Amor Cristiano • Proyecto HESED</p>
      </footer>
    </div>
  );
}
