import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle, Clock } from 'lucide-react';

export default function Attendance() {
  const { volunteers, attendances, addAttendance } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activityName, setActivityName] = useState('Tutorías de Matemáticas');
  const [hours, setHours] = useState(2);

  const activeVolunteers = volunteers.filter(v => v.status === 'Activo');

  const handleMarkAttendance = (volunteerId: string) => {
      addAttendance({
          volunteerId,
          date: new Date(selectedDate),
          activity: activityName,
          hours
      });
  };

  const getDayAttendees = () => {
      const targetDateStr = new Date(selectedDate).toDateString();
      return attendances.filter(a => new Date(a.date).toDateString() === targetDateStr);
  };

  const dayAttendees = getDayAttendees();
  const attendedIds = dayAttendees.map(a => a.volunteerId);

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Asistencia de Voluntarios</h1>

      <div className="bg-white shadow sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6 border-b border-neutral-200 bg-neutral-50 rounded-t-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="w-full sm:w-auto">
              <label htmlFor="date" className="block text-sm font-medium text-neutral-700">Fecha de Actividad</label>
              <input 
                  type="date" 
                  id="date"
                  className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm border p-2"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label htmlFor="activity" className="block text-sm font-medium text-neutral-700">Actividad / Clase</label>
              <input 
                  type="text" 
                  id="activity"
                  className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm border p-2"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-24">
              <label htmlFor="hours" className="block text-sm font-medium text-neutral-700">Horas</label>
              <input 
                  type="number" 
                  id="hours"
                  min="1"
                  className="mt-1 border-neutral-300 block w-full rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm border p-2"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <ul role="list" className="divide-y divide-neutral-200 p-4">
          <h3 className="text-lg font-medium text-neutral-900 mb-4 px-2">Marcar asistencia para {new Date(selectedDate).toLocaleDateString()}</h3>
          {activeVolunteers.map((volunteer) => {
              const hasAttended = attendedIds.includes(volunteer.id);
              
              return (
                <li key={volunteer.id} className="py-4 px-2">
                  <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-900">{volunteer.name}</p>
                        <p className="text-sm text-gray-500">{volunteer.roles.join(', ')}</p>
                    </div>
                    <div>
                        {hasAttended ? (
                             <span className="inline-flex items-center text-sm text-emerald-600 font-medium">
                                 <CheckCircle className="h-5 w-5 mr-1" />
                                 Presente
                             </span>
                        ) : (
                            <button
                                onClick={() => handleMarkAttendance(volunteer.id)}
                                className="inline-flex items-center px-3 py-1.5 border border-neutral-300 shadow-sm text-sm font-medium rounded text-neutral-700 bg-white hover:bg-neutral-50"
                            >
                                <Clock className="h-4 w-4 mr-1 text-neutral-400" />
                                Marcar Presente
                            </button>
                        )}
                    </div>
                  </div>
                </li>
              );
          })}
        </ul>
      </div>
    </div>
  );
}
