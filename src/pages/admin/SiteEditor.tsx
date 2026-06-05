import { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Upload, X, Image as ImageIcon, Plus as PlusIcon } from 'lucide-react';

export default function SiteEditor() {
  const { siteContent, updateSiteContent } = useData();
  const [formData, setFormData] = useState(siteContent);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [socialKey]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          galleryMedia: [...prev.galleryMedia, {
            id: Math.random().toString(36).substring(7),
            type: file.type.startsWith('video/') ? 'video' : 'image',
            url: reader.result as string,
            caption: 'Nueva imagen'
          }]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = (id: string) => {
    setFormData(prev => ({
      ...prev,
      galleryMedia: prev.galleryMedia.filter(m => m.id !== id)
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Editor Web (Frontend)</h1>
        <button
          onClick={handleSubmit}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
        >
          <Save className="-ml-1 mr-2 h-5 w-5" />
          Guardar Cambios
        </button>
      </div>

      {success && (
        <div className="mb-4 bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">¡Guardado! </strong>
          <span className="block sm:inline">Los cambios del sitio web han sido actualizados exitosamente.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow rounded-lg p-6">
        
        {/* Identidad Visual Edit */}
        <div>
          <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4 border-b pb-2">Identidad Visual</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Logo del Sitio</label>
            <div className="flex items-center gap-4">
              {formData.logoUrl ? (
                <div className="relative w-24 h-24 border border-neutral-300 rounded overflow-hidden bg-neutral-100 flex-shrink-0 group">
                  <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, logoUrl: '' }))} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 border border-neutral-300 rounded flex items-center justify-center bg-neutral-50 flex-shrink-0 text-neutral-400">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
              
              <button 
                type="button" 
                onClick={() => logoInputRef.current?.click()}
                className="px-4 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
              >
                Subir Logo
              </button>
              <input type="file" accept="image/*" className="hidden" ref={logoInputRef} onChange={handleLogoUpload} />
            </div>
          </div>
        </div>

        {/* Hero Section Edit */}
        <div>
          <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4 border-b pb-2">Sección Principal (Hero)</h3>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Título Principal</label>
              <input type="text" name="heroTitle" value={formData.heroTitle} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Subtítulo (Italico)</label>
              <input type="text" name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-neutral-700">Descripción Principal</label>
              <textarea name="heroDescription" rows={3} value={formData.heroDescription} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Botón de Acción (Texto)</label>
              <input type="text" name="heroButtonText" value={formData.heroButtonText} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Botón de Acción (Enlace)</label>
              <input type="text" name="heroButtonUrl" value={formData.heroButtonUrl} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" placeholder="#donations o https://..." />
            </div>
          </div>
        </div>

        {/* Social Links Edit */}
        <div>
          <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4 border-b pb-2">Redes Sociales</h3>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Facebook URL</label>
              <input type="text" name="social_facebook" value={formData.socialLinks?.facebook || ''} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Instagram URL</label>
              <input type="text" name="social_instagram" value={formData.socialLinks?.instagram || ''} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">YouTube URL</label>
              <input type="text" name="social_youtube" value={formData.socialLinks?.youtube || ''} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
            </div>
          </div>
        </div>

        {/* About Section Edit */}
        <div>
          <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4 border-b pb-2">Sección "Nuestra Labor"</h3>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-neutral-700">Título de Sección</label>
              <input type="text" name="aboutTitle" value={formData.aboutTitle} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
            </div>
          </div>
        </div>

        {/* Donations Section Edit */}
        <div>
          <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4 border-b pb-2">Sección Donaciones</h3>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Título de Donaciones</label>
              <input type="text" name="donationsTitle" value={formData.donationsTitle} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-neutral-700">Descripción de Donaciones</label>
              <textarea name="donationsDescription" rows={3} value={formData.donationsDescription} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Número de Cuenta Bancaria</label>
              <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2 font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Número de WhatsApp / Contacto</label>
              <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2 font-mono" />
            </div>
          </div>
        </div>

        {/* Gallery Section Edit */}
        <div>
          <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4 border-b pb-2">Sección Galería</h3>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Título Galería</label>
              <input type="text" name="galleryTitle" value={formData.galleryTitle} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Subtítulo Galería</label>
              <input type="text" name="gallerySubtitle" value={formData.gallerySubtitle} onChange={handleChange} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Fotos y Videos (Mostrar a los donadores)</label>
            <div className="flex gap-4 flex-wrap">
              {formData.galleryMedia?.map(media => (
                <div key={media.id} className="relative w-32 h-32 border border-neutral-300 rounded overflow-hidden group bg-neutral-100 flex-shrink-0">
                  {media.type === 'video' ? (
                    <video src={media.url} className="w-full h-full object-cover" />
                  ) : (
                    <img src={media.url} alt="Gallery item" className="w-full h-full object-cover" />
                  )}
                  <button type="button" onClick={() => removeMedia(media.id)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="w-32 h-32 border-2 border-dashed border-neutral-300 rounded flex flex-col items-center justify-center text-neutral-500 hover:text-emerald-500 hover:border-emerald-500 transition-colors flex-shrink-0"
              >
                <PlusIcon className="w-8 h-8 mb-1" />
                <span className="text-xs font-medium">Subir</span>
              </button>
              <input type="file" accept="image/*,video/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
