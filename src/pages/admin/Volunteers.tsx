import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { VolunteerRole } from '../../types';
import { Plus, Search, UserCheck, UserX } from 'lucide-react';

export default function Volunteers() {
  const { volunteers, addVolunteer, updateVolunteerStatus } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roles: [] as VolunteerRole[],
    status: 'Activo' as const
  });

  const availableRoles: VolunteerRole[] = ['Tutor', 'Maestro Bíblico', 'Cocina/Merienda', 'Logística', 'Coordinador'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVolunteer(formData);
    setIsAdding(false);
    setFormData({ name: '', email: '', phone: '', roles: [], status: 'Activo' });
  };

  const handleRoleToggle = (role: VolunteerRole) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const filteredVolunteers = volunteers.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.roles.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Gestión de Voluntarios</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          {isAdding ? 'Cancelar' : 'Nuevo Voluntario'}
        </button>
      </div>

      {isAdding && (
         <div className="bg-white shadow sm:rounded-lg mb-8">
           <div className="px-4 py-5 sm:p-6">
             <h3 className="text-lg leading-6 font-medium text-neutral-900">Registrar Nuevo Voluntario</h3>
             <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                 <div>
                   <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Nombre Completo</label>
                   <input type="text" name="name" id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm border p-2" />
                 </div>
                 <div>
                   <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Correo Electrónico</label>
                   <input type="email" name="email" id="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm border p-2" />
                 </div>
                 <div>
                   <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">Teléfono</label>
                   <input type="tel" name="phone" id="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm border p-2" />
                 </div>
               </div>
               
               <div>
                 <span className="block text-sm font-medium text-neutral-700 mb-2">Roles Asignados</span>
                 <div className="flex flex-wrap gap-2">
                   {availableRoles.map(role => (
                     <button
                       key={role}
                       type="button"
                       onClick={() => handleRoleToggle(role)}
                       className={`px-3 py-1 rounded-full text-sm font-medium ${formData.roles.includes(role) ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-neutral-100 text-neutral-600 border-neutral-200'} border`}
                     >
                       {role}
                     </button>
                   ))}
                 </div>
               </div>

               <div className="flex justify-end">
                 <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                   Guardar
                 </button>
               </div>
             </form>
           </div>
         </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-4 border-b border-neutral-200 sm:px-6 flex justify-between items-center">
            <div className="relative rounded-md shadow-sm max-w-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-neutral-300 rounded-md border p-2"
                placeholder="Buscar voluntarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
        </div>
        <ul role="list" className="divide-y divide-neutral-200">
          {filteredVolunteers.map((volunteer) => (
            <li key={volunteer.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-neutral-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
                          {volunteer.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                          <p className="text-sm font-medium text-emerald-600 truncate">{volunteer.name}</p>
                          <div className="flex flex-wrap text-sm text-neutral-500 gap-x-2">
                             <span>{volunteer.email}</span>
                             <span className="hidden sm:inline">•</span>
                             <span>{volunteer.phone}</span>
                          </div>
                      </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:space-x-4 pl-14 sm:pl-0">
                    <div className="flex flex-wrap gap-1">
                        {volunteer.roles.map(role => (
                            <span key={role} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {role}
                            </span>
                        ))}
                    </div>
                    <button 
                        onClick={() => updateVolunteerStatus(volunteer.id, volunteer.status === 'Activo' ? 'Inactivo' : 'Activo')}
                        className={`inline-flex items-center px-2 pl-1 py-1 border border-transparent text-xs font-medium rounded shadow-sm ${volunteer.status === 'Activo' ? 'text-red-700 bg-red-100 hover:bg-red-200' : 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200'}`}
                    >
                        {volunteer.status === 'Activo' ? <UserX className="h-4 w-4 mr-1" /> : <UserCheck className="h-4 w-4 mr-1"/>}
                        {volunteer.status === 'Activo' ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {filteredVolunteers.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-neutral-500">
                  No se encontraron voluntarios dados los filtros aplicados.
              </li>
          )}
        </ul>
      </div>
    </div>
  );
}
