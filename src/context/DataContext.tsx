import { createContext, useContext, useState, ReactNode } from 'react';
import { Volunteer, Kid, AttendanceRecord, BlogPost, Donation, SiteContent } from '../types';

interface DataContextType {
  volunteers: Volunteer[];
  kids: Kid[];
  attendances: AttendanceRecord[];
  blogPosts: BlogPost[];
  donations: Donation[];
  siteContent: SiteContent;
  addVolunteer: (volunteer: Omit<Volunteer, "id" | "joinDate">) => void;
  updateVolunteerStatus: (id: string, status: 'Activo' | 'Inactivo') => void;
  addKid: (kid: Omit<Kid, "id" | "registeredAt">) => void;
  addAttendance: (attendance: Omit<AttendanceRecord, "id">) => void;
  addBlogPost: (post: Omit<BlogPost, "id" | "date">) => void;
  addDonation: (donation: Omit<Donation, "id" | "date">) => void;
  updateSiteContent: (content: SiteContent) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    {
      id: '1',
      name: 'María García',
      email: 'maria@example.com',
      phone: '555-0101',
      roles: ['Maestro Bíblico'],
      joinDate: new Date('2023-01-15'),
      status: 'Activo'
    },
    {
      id: '2',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '555-0202',
      roles: ['Tutor', 'Logística'],
      joinDate: new Date('2023-03-20'),
      status: 'Activo'
    }
  ]);

  const [kids, setKids] = useState<Kid[]>([
    {
      id: '1',
      name: 'Ana López',
      age: 8,
      parentName: 'Carlos López',
      phone: '555-0303',
      registeredAt: new Date('2023-02-10')
    }
  ]);

  const [attendances, setAttendances] = useState<AttendanceRecord[]>([]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Día del Niño en HESED',
      content: 'Celebramos un gran día con los niños lleno de comida, juegos y palabra de Dios. Gracias a todos los voluntarios.',
      author: 'Juan Pérez',
      category: 'Noticia',
      date: new Date('2023-09-10'),
      excerpt: 'Celebramos un gran día con los niños lleno de comida, juegos y palabra de Dios...'
    },
    {
      id: '2',
      title: '¡Gran Venta de Pupusas a beneficio de HESED!',
      content: 'Apoya el proyecto HESED para los niños disfrutando de unas deliciosas pupusas. Todo lo recaudado será destinado a la merienda y materiales educativos.\n\n**Fecha:** Domingo 24 de mayo\n**Lugar:** Iglesia Brigadas de Amor Cristiano (después de cada servicio)\n**Valor:** Lps. 75.00 (Incluye refresco)\n\n¡Tu generosidad transforma vidas y te hace parte del milagro!',
      author: 'Coordinación',
      category: 'Noticia',
      date: new Date('2024-05-20'),
      excerpt: 'Acompáñanos este domingo 24 de mayo en la venta de pupusas. ¡Con Lps. 75 apoyas el proyecto y disfrutas un buen plato!'
    },
    {
      id: '3',
      title: 'Estudiando Romanos 3:23',
      content: 'Durante nuestras clases de enseñanza bíblica de esta semana, estuvimos aprendiendo con los niños el versículo de Romanos 3:23: "Por cuanto todos pecaron, y están destituidos de la gloria de Dios".\n\nEs fundamental que desde pequeños comprendan el mensaje de salvación y la gracia que el Señor nos ofrece. Agradecemos a todos nuestros maestros bíblicos por su dedicación al sembrar la palabra en los corazones de estos pequeños.',
      author: 'Maestros HESED',
      category: 'Enseñanza Bíblica',
      date: new Date('2024-05-18'),
      excerpt: 'Esta semana los niños aprendieron sobre Romanos 3:23 y la gracia de Dios en sus clases bíblicas.'
    }
  ]);

  const [donations, setDonations] = useState<Donation[]>([
    {
      id: '1',
      donorName: 'Empresa Local',
      type: 'Monetaria',
      amount: 500,
      destination: 'Merienda',
      date: new Date('2023-05-15')
    },
    {
      id: '2',
      donorName: 'Anónimo',
      type: 'Especie',
      itemDescription: '50 cuadernos y lápices',
      destination: 'Materiales Educativos',
      date: new Date('2023-06-20')
    }
  ]);

  const [siteContent, setSiteContent] = useState<SiteContent>({
    heroTitle: "Transformando el futuro de la",
    heroSubtitle: "niñez hondureña",
    heroDescription: "En HESED brindamos tutorías académicas, discipulado bíblico y merienda diaria a más de 120 niños en situaciones de riesgo social.",
    aboutTitle: "Lo Que Hacemos",
    donationsTitle: "Apoya Nuestra Labor",
    donationsDescription: "Tu donación hace posible que sigamos brindando educación, alimento y esperanza a los niños del proyecto HESED.",
    bankAccount: "010120363154",
    whatsapp: "+504 9999-9999",
    galleryTitle: "Galería de Actividades",
    gallerySubtitle: "Momentos de aprendizaje y sonrisas en HESED.",
    logoUrl: "",
    heroButtonText: "Contactar Donación",
    heroButtonUrl: "#donations",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com"
    },
    galleryMedia: []
  });

  const addVolunteer = (volunteer: Omit<Volunteer, "id" | "joinDate">) => {
    setVolunteers([...volunteers, { ...volunteer, id: Math.random().toString(36).substring(7), joinDate: new Date() }]);
  };

  const updateVolunteerStatus = (id: string, status: 'Activo' | 'Inactivo') => {
    setVolunteers(volunteers.map(v => v.id === id ? { ...v, status } : v));
  };

  const addKid = (kid: Omit<Kid, "id" | "registeredAt">) => {
    setKids([...kids, { ...kid, id: Math.random().toString(36).substring(7), registeredAt: new Date() }]);
  };

  const addAttendance = (attendance: Omit<AttendanceRecord, "id">) => {
    setAttendances([...attendances, { ...attendance, id: Math.random().toString(36).substring(7) }]);
  };

  const addBlogPost = (post: Omit<BlogPost, "id" | "date">) => {
    setBlogPosts([...blogPosts, { ...post, id: Math.random().toString(36).substring(7), date: new Date() }]);
  };

  const addDonation = (donation: Omit<Donation, "id" | "date">) => {
    setDonations([...donations, { ...donation, id: Math.random().toString(36).substring(7), date: new Date() }]);
  };

  const updateSiteContent = (content: SiteContent) => {
    setSiteContent(content);
  };

  return (
    <DataContext.Provider value={{
      volunteers, kids, attendances, blogPosts, donations, siteContent,
      addVolunteer, updateVolunteerStatus, addKid, addAttendance, addBlogPost, addDonation, updateSiteContent
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
}
