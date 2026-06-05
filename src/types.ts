export interface Kid {
  id: string;
  name: string;
  age: number;
  parentName: string;
  phone: string;
  medicalInfo?: string;
  registeredAt: Date;
}

export type VolunteerRole = 'Tutor' | 'Maestro Bíblico' | 'Cocina/Merienda' | 'Logística' | 'Coordinador';

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles: VolunteerRole[];
  joinDate: Date;
  status: 'Activo' | 'Inactivo';
}

export interface AttendanceRecord {
  id: string;
  volunteerId: string;
  date: Date;
  activity: string;
  hours: number;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutTitle: string;
  donationsTitle: string;
  donationsDescription: string;
  bankAccount: string;
  whatsapp: string;
  galleryTitle: string;
  gallerySubtitle: string;
  logoUrl: string;
  heroButtonText: string;
  heroButtonUrl: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  galleryMedia: MediaItem[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: 'Noticia' | 'Testimonio' | 'Enseñanza Bíblica';
  date: Date;
  imageUrl?: string;
  excerpt: string;
}

export type DonationType = 'Monetaria' | 'Especie';
export type DonationDestination = 'Merienda' | 'Materiales Educativos' | 'General' | 'Infraestructura';

export interface Donation {
  id: string;
  donorName: string;
  type: DonationType;
  amount?: number;
  itemDescription?: string;
  destination: DonationDestination;
  date: Date;
}
