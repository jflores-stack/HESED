import { useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { Users, BookOpen, Clock, TrendingUp, Gift } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export default function Dashboard() {
  const { volunteers, kids, attendances, donations } = useData();

  const activeVolunteers = volunteers.filter(v => v.status === 'Activo').length;
  const enrolledKids = kids.length;
  const totalHours = attendances.reduce((sum, record) => sum + record.hours, 0);
  const totalMonetaryDonations = donations.filter(d => d.type === 'Monetaria').reduce((sum, d) => sum + (d.amount || 0), 0);

  const stats = [
    { name: 'Voluntarios Activos', stat: activeVolunteers, icon: Users, color: 'bg-emerald-500' },
    { name: 'Niños Inscritos', stat: enrolledKids, icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Horas de Voluntariado', stat: totalHours, icon: Clock, color: 'bg-purple-500' },
    { name: 'Donaciones (HNL)', stat: totalMonetaryDonations.toLocaleString(), icon: Gift, color: 'bg-orange-500' },
  ];

  const monthlyDonations = useMemo(() => {
    const months: Record<string, number> = {};
    const sortedDonations = [...donations].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    sortedDonations.forEach(d => {
      if (d.type === 'Monetaria' && d.amount) {
        const date = new Date(d.date);
        const monthYear = `${date.toLocaleString('es-ES', { month: 'short' })} ${date.getFullYear()}`;
        if (!months[monthYear]) {
          months[monthYear] = 0;
        }
        months[monthYear] += d.amount;
      }
    });

    return Object.keys(months).map(key => ({
      name: key,
      value: months[key]
    }));
  }, [donations]);

  const donationTypesData = useMemo(() => {
    const types = { Monetaria: 0, Especie: 0 };
    donations.forEach(d => {
      if (d.type === 'Monetaria') types.Monetaria += 1;
      else types.Especie += 1;
    });
    return [
      { name: 'Monetaria', value: types.Monetaria },
      { name: 'En Especie', value: types.Especie }
    ];
  }, [donations]);

  const COLORS = ['#10b981', '#3b82f6'];

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Resumen del Proyecto</h1>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${item.color}`}>
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">Donaciones Monetarias por Mes</h2>
          <div className="h-72">
            {monthlyDonations.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyDonations} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="name" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `L ${value}`} />
                  <Tooltip 
                    formatter={(value: number) => [`HNL ${value.toLocaleString()}`, 'Total']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-sm text-neutral-500 italic">No hay donaciones monetarias registradas.</div>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">Distribución de Donaciones</h2>
          <div className="h-72 flex justify-center">
             {donationTypesData.some(d => d.value > 0) ? (
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={donationTypesData}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={90}
                       paddingAngle={5}
                       dataKey="value"
                     >
                       {donationTypesData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                     </Pie>
                     <Tooltip 
                         formatter={(value: number, name: string) => [`${value} donaciones`, name]}
                         contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                     />
                     <Legend verticalAlign="bottom" height={36} iconType="circle" />
                   </PieChart>
                 </ResponsiveContainer>
             ) : (
                 <div className="h-full flex items-center justify-center text-sm text-neutral-500 italic">No hay donaciones registradas.</div>
             )}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">Actividad Reciente</h2>
          {attendances.length > 0 ? (
            <ul className="divide-y divide-neutral-200">
                {attendances.slice(-5).reverse().map(record => {
                    const vol = volunteers.find(v => v.id === record.volunteerId);
                    return (
                        <li key={record.id} className="py-3">
                            <p className="text-sm text-neutral-600">
                                <span className="font-medium text-neutral-900">{vol?.name || 'Voluntario'}</span> apoyó en <span className="font-medium text-emerald-600">{record.activity}</span> por {record.hours} horas.
                            </p>
                            <p className="text-xs text-neutral-400 mt-1">{new Date(record.date).toLocaleDateString()}</p>
                        </li>
                    )
                })}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500 italic">No hay actividad registrada recientemente.</p>
          )}
      </div>
    </div>
  );
}
