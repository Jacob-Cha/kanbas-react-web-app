// CourseTypes.ts
export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: number;
    description: string;
    author?: string;
    enrolled?: boolean;
  }
  