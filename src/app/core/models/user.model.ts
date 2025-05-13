export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  certifications?: string[];
  username: string;
  projects?: Project[];
  views?: string[]
  connections?: string[]
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
  technologies?: string[];
  visitors?: string[]
}