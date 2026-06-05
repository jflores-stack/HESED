import { Heart, BookOpen, Users, Coffee } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useData } from '../context/DataContext';

export default function Landing() {
  const { siteContent } = useData();

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        <span className="inline-block px-3 py-1 bg-neutral-200 text-emerald-500 text-xs font-bold rounded-md mb-6 uppercase tracking-wider">
          Proyecto de Amor
        </span>
        <h1 className="text-5xl md:text-7xl font-serif text-neutral-900 leading-[1.1] mb-6">
          {siteContent.heroTitle} <br className="hidden md:block"/>
          <span className="text-emerald-500 italic">{siteContent.heroSubtitle}</span>.
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-10 max-w-2xl mx-auto whitespace-pre-wrap">
          {siteContent.heroDescription}
        </p>
        <div className="flex gap-4">
          <a href={siteContent.heroButtonUrl} className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-blue-600 transition-colors">
            {siteContent.heroButtonText}
          </a>
          <a href="#about" className="bg-white border border-neutral-300 text-neutral-600 px-8 py-3 rounded-full font-bold shadow-sm hover:text-emerald-500 hover:border-emerald-500 transition-colors">
            Conoce Más
          </a>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="about" className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-2">{siteContent.aboutTitle}</h2>
                <div className="w-16 h-[2px] bg-emerald-500 mx-auto mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-neutral-300 text-center shadow-sm">
                    <div className="w-16 h-16 bg-neutral-200 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-800">Tutorías Escolares</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">Apoyo académico para que los niños alcancen su máximo potencial en sus estudios regulares.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-neutral-300 text-center shadow-sm">
                    <div className="w-16 h-16 bg-neutral-200 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-800">Enseñanza Bíblica</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">Inculcando valores cristianos y principios de vida basados en la palabra de Dios.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-neutral-300 text-center shadow-sm">
                    <div className="w-16 h-16 bg-neutral-200 text-neutral-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Coffee className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-800">Merienda Solidaria</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">Proveemos alimentos nutritivos durante cada sesión para cuidar el bienestar físico de los niños.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donations" className="py-20 bg-neutral-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="bg-white rounded-2xl shadow-sm border border-neutral-300 overflow-hidden">
                 <div className="grid grid-cols-1 lg:grid-cols-2">
                     <div className="p-10 lg:p-16 flex flex-col justify-center">
                         <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">{siteContent.donationsTitle}</h2>
                         <p className="text-neutral-600 mb-8 leading-relaxed whitespace-pre-wrap">
                             {siteContent.donationsDescription}
                         </p>
                         <div className="space-y-4">
                             <div className="flex items-center gap-4 p-4 border border-neutral-300 rounded-lg bg-neutral-100">
                                 <Users className="text-emerald-500 w-6 h-6 flex-shrink-0" />
                                 <div>
                                     <h4 className="font-bold text-neutral-900 text-sm">Patrocina un niño</h4>
                                     <p className="text-xs text-neutral-500 mt-1">Cubre materiales y merienda por un mes.</p>
                                 </div>
                             </div>
                         </div>
                         <div className="mt-8 bg-neutral-100 p-6 rounded-xl border border-neutral-300 text-center sm:text-left">
                             <h4 className="font-bold text-neutral-900 mb-3">Transferencia Bancaria</h4>
                             <p className="text-sm text-neutral-600 mb-1"><strong>Banco:</strong> Banco Atlántida</p>
                             <p className="text-sm text-neutral-600 mb-2"><strong>Titular:</strong> Asociación Brigadas de Amor Cristiano</p>
                             <div className="bg-white border border-neutral-300 rounded p-3 mt-2 inline-block">
                               <p className="text-sm text-neutral-500 font-bold mb-1 uppercase tracking-wider">Cuenta de Ahorro (HNL)</p>
                               <p className="font-mono text-xl text-blue-600 font-bold">{siteContent.bankAccount}</p>
                             </div>
                         </div>
                     </div>
                     <div className="bg-emerald-500 p-10 lg:p-16 text-white flex flex-col justify-center rounded-l-2xl lg:rounded-none lg:rounded-r-2xl lg:ml-[-1px] relative z-10 shadow-lg">
                         <h3 className="text-xl font-serif font-bold mb-4">Otra forma de ayudar</h3>
                         <p className="mb-8 text-emerald-50 text-sm leading-relaxed max-w-sm">
                             Si deseas donar en especie (alimentos, útiles escolares, biblias) puedes contactarnos directamente.
                         </p>
                         <div className="inline-block bg-emerald-600/50 backdrop-blur border border-emerald-400/30 px-6 py-4 rounded-xl max-w-max">
                           <p className="text-xs uppercase tracking-widest text-emerald-200 mb-1">WhatsApp / Teléfono</p>
                           <p className="font-mono text-xl font-bold">{siteContent.whatsapp}</p>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between border-b border-neutral-300 pb-4 mb-8">
                <div>
                   <h2 className="text-2xl font-serif font-bold text-neutral-900">{siteContent.galleryTitle}</h2>
                   <p className="text-neutral-500 text-sm mt-1">{siteContent.gallerySubtitle}</p>
                </div>
                <span className="text-sm text-emerald-500 font-medium cursor-pointer hover:text-emerald-600">Ver todo →</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {siteContent.galleryMedia && siteContent.galleryMedia.length > 0 ? (
                  siteContent.galleryMedia.map((media) => (
                    <div key={media.id} className="bg-neutral-200 aspect-video md:aspect-square flex justify-center items-center overflow-hidden rounded-md relative group">
                      {media.type === 'video' ? (
                        <video src={media.url} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                      ) : (
                        <img src={media.url} alt={media.caption} className="w-full h-full object-cover" />
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-neutral-300 aspect-video md:aspect-square flex items-center justify-center text-neutral-600 text-xs font-medium italic overflow-hidden rounded-md relative group">
                        <span className="z-10 group-hover:opacity-0 transition-opacity">Tutoría Matemáticas</span>
                        <Heart className="absolute w-8 h-8 text-neutral-400 opacity-20" />
                    </div>
                    <div className="bg-emerald-100 aspect-video md:aspect-square flex items-center justify-center text-emerald-600 text-xs font-medium italic overflow-hidden rounded-md relative group">
                        <span className="z-10 group-hover:opacity-0 transition-opacity">Hora de Merienda</span>
                        <Heart className="absolute w-8 h-8 text-emerald-400 opacity-20" />
                    </div>
                    <div className="bg-blue-200 aspect-video md:aspect-square flex items-center justify-center text-blue-600 text-xs font-medium italic overflow-hidden rounded-md relative group">
                        <span className="z-10 group-hover:opacity-0 transition-opacity">Estudio Bíblico</span>
                        <Heart className="absolute w-8 h-8 text-blue-400 opacity-20" />
                    </div>
                    <div className="bg-neutral-200 xl:bg-neutral-400/40 aspect-video md:aspect-square flex items-center justify-center text-neutral-600 text-xs font-medium italic overflow-hidden rounded-md relative group">
                        <span className="z-10 group-hover:opacity-0 transition-opacity">Juegos de Patio</span>
                        <Heart className="absolute w-8 h-8 text-neutral-400 opacity-20" />
                    </div>
                  </>
                )}
            </div>
        </div>
      </section>

      <footer className="bg-white border-t border-neutral-300 px-6 py-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 mt-auto">
          <p className="mb-4 md:mb-0 font-medium tracking-wide">© {new Date().getFullYear()} Brigadas de Amor Cristiano • Proyecto HESED • Tegucigalpa, Honduras</p>
          <div className="flex gap-4 items-center">
            <span className="uppercase tracking-[0.2em]">Síguenos</span>
            {siteContent.socialLinks?.facebook && (
              <a href={siteContent.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 hover:text-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {siteContent.socialLinks?.instagram && (
              <a href={siteContent.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 hover:text-pink-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {siteContent.socialLinks?.youtube && (
              <a href={siteContent.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 hover:text-red-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>
      </footer>
    </div>
  );
}
