import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { UserPlus, Search } from 'lucide-react';

export default function Kids() {
  const { kids, addKid } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    age: 5,
    parentName: '',
    phone: '',
    medicalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addKid(formData);
    setIsAdding(false);
    setFormData({ name: '', age: 5, parentName: '', phone: '', medicalInfo: '' });
  };

  const filteredKids = kids.filter(k => 
    k.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Inscripción de Niños</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="-ml-1 mr-2 h-5 w-5" />
          {isAdding ? 'Cancelar' : 'Inscribir Niño'}
        </button>
      </div>

      {isAdding && (
         <div className="bg-white shadow sm:rounded-lg mb-8 border-t-4 border-blue-500">
           <div className="px-4 py-5 sm:p-6">
             <h3 className="text-lg leading-6 font-medium text-neutral-900">Formulario de Inscripción</h3>
             <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                 <div>
                   <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Nombre del Niño/a</label>
                   <input type="text" name="name" id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2" />
                 </div>
                 <div>
                   <label htmlFor="age" className="block text-sm font-medium text-neutral-700">Edad</label>
                   <input type="number" name="age" id="age" min="3" max="18" required value={formData.age} onChange={e => setFormData({...formData, age: Number(e.target.value)})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2" />
                 </div>
                 <div>
                   <label htmlFor="parentName" className="block text-sm font-medium text-neutral-700">Nombre del Encargado / Padre / Madre</label>
                   <input type="text" name="parentName" id="parentName" required value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2" />
                 </div>
                 <div>
                   <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">Teléfono de Contacto</label>
                   <input type="tel" name="phone" id="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2" />
                 </div>
                 <div className="sm:col-span-2">
                   <label htmlFor="medicalInfo" className="block text-sm font-medium text-neutral-700">Información Médica / Alergias (Opcional)</label>
                   <textarea id="medicalInfo" name="medicalInfo" rows={2} value={formData.medicalInfo} onChange={e => setFormData({...formData, medicalInfo: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"></textarea>
                 </div>
               </div>

               <div className="flex justify-end">
                 <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                   Guardar Inscripción
                 </button>
               </div>
             </form>
           </div>
         </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-4 border-b border-neutral-200 sm:px-6 flex justify-between items-center bg-neutral-50">
            <div className="relative rounded-md shadow-sm max-w-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-neutral-300 rounded-md border p-2"
                placeholder="Buscar por niño o encargado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
        </div>
        <ul role="list" className="divide-y divide-neutral-200">
          {filteredKids.map((kid) => (
            <li key={kid.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                      <div className="ml-4">
                          <p className="text-lg font-medium text-blue-600 font-bold">{kid.name} <span className="text-sm font-normal text-gray-500">({kid.age} años)</span></p>
                          <div className="flex flex-col sm:flex-row mt-1 sm:mt-0 sm:space-x-4">
                             <span className="text-sm text-neutral-600">Encargado: {kid.parentName}</span>
                             <span className="text-sm text-neutral-500 font-mono">{kid.phone}</span>
                          </div>
                          {kid.medicalInfo && (
                              <div className="mt-2 text-xs bg-orange-50 text-orange-700 p-2 rounded max-w-lg border border-orange-100">
                                  <strong>Nota Médica:</strong> {kid.medicalInfo}
                              </div>
                          )}
                      </div>
                  </div>
                  <div className="text-sm text-gray-400">
                      Inscrito: {new Date(kid.registeredAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </li>
          ))}
          {filteredKids.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-neutral-500">
                  No hay niños registrados.
              </li>
          )}
        </ul>
      </div>
    </div>
  );
}
