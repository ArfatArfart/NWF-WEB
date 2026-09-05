export type DrawerType = 'services' | 'work' | 'about' | 'contact' | null;

export interface ServiceItem {
  id: string;
  title: string;
  tag: string;
  description: string;
}

export interface WorkItem {
  id: string;
  category: string;
  title: string;
  description: string;
}

export interface ToastMessage {
  id: string;
  text: string;
}
