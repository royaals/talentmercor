
export interface Candidate {
    name: string;
    email: string;
    phone: string;
    location: string;
    submitted_at: string;
    work_availability: string[];
    annual_salary_expectation: {
      'full-time'?: string;
      'part-time'?: string;
      'contract'?: string;
    };
    work_experiences: WorkExperience[];
    education: Education;
    skills: string[];
    selected?: boolean;
    score?: number;
  }
  
  export interface WorkExperience {
    company: string;
    roleName: string;
    startDate?: string;
    endDate?: string;
  }
  
  export interface Degree {
    degree: string;
    subject: string;
    school: string;
    gpa: string;
    startDate: string;
    endDate: string;
    originalSchool: string;
    isTop50: boolean;
  }
  
  export interface Education {
    highest_level: string;
    degrees: Degree[];
  }
  
  export interface SalaryRange {
    min: number;
    max: number;
  }
  
  export interface FilterOptions {
    locations: string[];
    experiences: string[];
    skills: string[];
    educationLevels: string[];
    salaryRange: SalaryRange;
    availability: string[];
  }
  
  export interface SortOption {
    field: keyof Candidate | 'experience' | 'education' | 'skills';
    direction: 'asc' | 'desc';
  }
  
  export interface CandidateContextType {
    candidates: Candidate[];
    filteredCandidates: Candidate[];
    selectedCandidates: Candidate[];
    filters: FilterOptions;
    sortOption: SortOption;
    isLoading: boolean;
    uploadCandidates: (data: Candidate[]) => void;
    updateFilters: (filters: Partial<FilterOptions>) => void;
    setSortOption: (option: SortOption) => void;
    toggleCandidateSelection: (candidate: Candidate) => void;
    generateRecommendations: () => void;
    clearAllSelections: () => void;
    saveTeam: (reason: string) => void;
  }
  