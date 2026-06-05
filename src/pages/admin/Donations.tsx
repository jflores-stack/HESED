import { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { DonationType, DonationDestination } from '../../types';
import { Plus, Search, Filter, Download } from 'lucide-react';

export default function Donations() {
  const { donations, addDonation } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<DonationType | 'All'>('All');

  const [formData, setFormData] = useState({
    donorName: '',
    type: 'Monetaria' as DonationType,
    amount: '',
    itemDescription: '',
    destination: 'General' as DonationDestination
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDonation({
      ...formData,
      amount: formData.type === 'Monetaria' ? Number(formData.amount) : undefined,
      itemDescription: formData.type === 'Especie' ? formData.itemDescription : undefined,
    });
    setIsAdding(false);
    setFormData({ donorName: '', type: 'Monetaria', amount: '', itemDescription: '', destination: 'General' });
  };

  const filteredDonations = useMemo(() => {
    return donations.filter(d => 
      (d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
       (d.itemDescription && d.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (filterType === 'All' || d.type === filterType)
    );
  }, [donations, searchTerm, filterType]);

  const totalMonetary = useMemo(() => {
      return filteredDonations.filter(d => d.type === 'Monetaria').reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }, [filteredDonations]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Reportes de Donaciones</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          {isAdding ? 'Cancelar' : 'Registrar Donación'}
        </button>
      </div>

      {isAdding && (
         <div className="bg-white shadow sm:rounded-lg mb-8 border-t-4 border-blue-500">
           <div className="px-4 py-5 sm:p-6">
             <h3 className="text-lg leading-6 font-medium text-neutral-900">Nueva Donación</h3>
             <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                 <div>
                   <label className="block text-sm font-medium text-neutral-700">Nombre del Donante</label>
                   <input type="text" required value={formData.donorName} onChange={e => setFormData({...formData, donorName: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" placeholder="Juan Perez o Anónimo" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-neutral-700">Tipo de Donación</label>
                   <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as DonationType})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2 bg-white">
                       <option value="Monetaria">Monetaria</option>
                       <option value="Especie">En Especie</option>
                   </select>
                 </div>

                 {formData.type === 'Monetaria' ? (
                     <div>
                       <label className="block text-sm font-medium text-neutral-700">Monto (HNL)</label>
                       <input type="number" required min="1" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" />
                     </div>
                 ) : (
                     <div>
                       <label className="block text-sm font-medium text-neutral-700">Descripción del Artículo</label>
                       <input type="text" required value={formData.itemDescription} onChange={e => setFormData({...formData, itemDescription: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2" placeholder="Ej. 10 libras de arroz" />
                     </div>
                 )}

                 <div>
                   <label className="block text-sm font-medium text-neutral-700">Destino / Proyecto</label>
                   <select value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value as DonationDestination})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm border p-2 bg-white">
                       <option value="General">Fondo General</option>
                       <option value="Merienda">Merienda Solidaria</option>
                       <option value="Materiales Educativos">Materiales Educativos</option>
                       <option value="Infraestructura">Infraestructura</option>
                   </select>
                 </div>
               </div>

               <div className="flex justify-end pt-4">
                 <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                   Guardar Registro
                 </button>
               </div>
             </form>
           </div>
         </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-500 uppercase">Total Monetario Filtrado</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">HNL {totalMonetary.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-500 uppercase">Donaciones en Especie Registradas</h3>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{filteredDonations.filter(d => d.type === 'Especie').length}</p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-4 border-b border-neutral-200 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-neutral-50">
            <div className="relative rounded-md shadow-sm flex-1 max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 sm:text-sm border-neutral-300 rounded-md border p-2"
                placeholder="Buscar donante o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-neutral-400" />
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value as DonationType | 'All')}
                  className="sm:text-sm border-neutral-300 rounded-md border p-2"
                >
                    <option value="All">Todos los Tipos</option>
                    <option value="Monetaria">Solo Monetarias</option>
                    <option value="Especie">Solo en Especie</option>
                </select>
                <button className="ml-2 inline-flex items-center p-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50" title="Exportar Reporte">
                    <Download className="h-4 w-4" />
                </button>
            </div>
        </div>
        
        <table className="min-w-full divide-y divide-neutral-200 hidden md:table">
          <thead className="bg-neutral-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Fecha</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Donante</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Tipo/Monto</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Destino</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {filteredDonations.map((donation) => (
              <tr key={donation.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {new Date(donation.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">{donation.donorName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {donation.type === 'Monetaria' ? (
                      <span className="text-sm font-bold text-blue-600">HNL {donation.amount?.toLocaleString()}</span>
                  ) : (
                      <div>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">Especie</span>
                          <p className="text-xs text-neutral-500 mt-1">{donation.itemDescription}</p>
                      </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className="text-sm text-neutral-600">{donation.destination}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <ul className="md:hidden divide-y divide-neutral-200">
            {filteredDonations.map((donation) => (
                <li key={donation.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{donation.donorName}</span>
                        <span className="text-xs text-neutral-500">{new Date(donation.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                        {donation.type === 'Monetaria' ? (
                            <span className="font-bold text-blue-600">HNL {donation.amount?.toLocaleString()}</span>
                        ) : (
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block w-max">🎁 {donation.itemDescription}</span>
                        )}
                        <span className="text-neutral-500 mt-1">Destino: {donation.destination}</span>
                    </div>
                </li>
            ))}
        </ul>
        
        {filteredDonations.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-neutral-500">
                No se encontraron reportes.
            </div>
        )}
      </div>
    </div>
  );
}
