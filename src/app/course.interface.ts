export interface CourseDetail {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  previewImageLink: string;
  rating: number;
  meta: Meta | null;
  lessons: Lesson[];
  containsLockedLessons: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string;
  status: string;
  link: string;
  previewImageLink: string;
  meta: Meta | null;
}

export interface Course {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: string;
  meta: Meta | null;
}

interface Meta {
  slug: string;
  skills: string[];
  courseVideoPreview: {
    link: string;
    duration: number;
    previewImageLink: string;
  };
}
