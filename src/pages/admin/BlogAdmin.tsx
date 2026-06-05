import { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export default function BlogAdmin() {
  const { blogPosts, addBlogPost } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    author: 'Coordinador',
    category: 'Noticia' as 'Noticia' | 'Testimonio' | 'Enseñanza Bíblica',
    excerpt: '',
    content: '',
    imageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBlogPost(formData);
    setIsAdding(false);
    setFormData({ title: '', author: 'Coordinador', category: 'Noticia', excerpt: '', content: '', imageUrl: '' });
  };

  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInlinePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const markdownImage = `\n![${file.name}](${reader.result})\n`;
        setFormData(prev => ({ ...prev, content: prev.content + markdownImage }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Gestión del Blog</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          {isAdding ? 'Cancelar' : 'Nueva Publicación'}
        </button>
      </div>

      {isAdding && (
         <div className="bg-white shadow sm:rounded-lg mb-8 border-t-4 border-emerald-500">
           <div className="px-4 py-5 sm:p-6">
             <h3 className="text-lg leading-6 font-medium text-neutral-900">Escribir Artículo</h3>
             <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
               <div>
                   <label className="block text-sm font-medium text-neutral-700">Título</label>
                   <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2 text-lg font-medium" placeholder="Ej. Retiro de Jóvenes 2024" />
               </div>
               
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                 <div>
                   <label className="block text-sm font-medium text-neutral-700">Categoría</label>
                   <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2 bg-white">
                       <option value="Noticia">Noticia</option>
                       <option value="Testimonio">Testimonio</option>
                       <option value="Enseñanza Bíblica">Enseñanza Bíblica</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-neutral-700">Autor</label>
                   <input type="text" required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
                 </div>
               </div>

               <div>
                   <label className="block text-sm font-medium text-neutral-700">Resumen / Extracto (Breve)</label>
                   <textarea rows={2} required value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2 text-sm text-neutral-600" placeholder="Un breve resumen que aparecerá en la página principal..." />
               </div>

               <div>
                   <label className="block text-sm font-medium text-neutral-700 mb-2">Foto de Portada</label>
                   {formData.imageUrl ? (
                     <div className="relative w-full h-48 rounded-md overflow-hidden bg-neutral-100 border border-neutral-300">
                       <img src={formData.imageUrl} alt="Cover" className="w-full h-full object-cover" />
                       <button type="button" onClick={() => setFormData({...formData, imageUrl: ''})} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full text-xs">Cambiar</button>
                     </div>
                   ) : (
                     <button type="button" onClick={() => coverInputRef.current?.click()} className="w-full h-32 border-2 border-dashed border-neutral-300 rounded-md flex flex-col items-center justify-center text-neutral-500 hover:text-emerald-500 hover:border-emerald-500 transition-colors">
                       <ImageIcon className="w-8 h-8 mb-2" />
                       <span className="text-sm">Subir Foto de Portada</span>
                     </button>
                   )}
                   <input type="file" accept="image/*" className="hidden" ref={coverInputRef} onChange={handleCoverPhotoUpload} />
               </div>

               <div>
                   <div className="flex justify-between items-center mb-1">
                     <label className="block text-sm font-medium text-neutral-700">Contenido Completo (Markdown opcional)</label>
                     <button type="button" onClick={() => inlineInputRef.current?.click()} className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center font-medium bg-emerald-50 px-2 py-1 rounded">
                       <ImageIcon className="w-3 h-3 mr-1" /> Insertar Imagen
                     </button>
                     <input type="file" accept="image/*" className="hidden" ref={inlineInputRef} onChange={handleInlinePhotoUpload} />
                   </div>
                   <textarea rows={8} required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2 font-mono text-sm" placeholder="Escribe tu artículo completo aquí..." />
               </div>

               <div className="flex justify-end pt-4">
                 <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700">
                   Publicar
                 </button>
               </div>
             </form>
           </div>
         </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
         <ul className="divide-y divide-neutral-200">
            {blogPosts.slice().reverse().map((post) => (
              <li key={post.id} className="p-6 hover:bg-neutral-50">
                  <div className="flex justify-between items-start">
                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                                post.category === 'Noticia' ? 'bg-blue-100 text-blue-800' :
                                post.category === 'Testimonio' ? 'bg-purple-100 text-purple-800' :
                                'bg-orange-100 text-orange-800'
                            }`}>
                                {post.category}
                            </span>
                            <span className="text-xs text-neutral-500">{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <h4 className="text-xl font-bold text-neutral-900 mb-2">{post.title}</h4>
                        <p className="text-neutral-600 text-sm mb-3 max-w-3xl">{post.excerpt}</p>
                        <p className="text-xs text-neutral-400 font-medium">Por {post.author}</p>
                     </div>
                     <div className="flex items-start gap-4">
                       {post.imageUrl && (
                         <div className="w-24 h-24 rounded-lg overflow-hidden border border-neutral-200 hidden sm:block">
                           <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                         </div>
                       )}
                       <button className="text-red-500 hover:text-red-700 p-2" title="Eliminar Post">
                          <Trash2 className="w-5 h-5" />
                       </button>
                     </div>
                  </div>
              </li>
            ))}
            {blogPosts.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-neutral-500">
                    No hay publicaciones todavía.
                </li>
            )}
         </ul>
      </div>
    </div>
  );
}
