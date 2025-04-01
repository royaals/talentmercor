
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Candidate, FilterOptions, SortOption, CandidateContextType } from '@/types/candidates';
import { toast } from '@/hooks/use-toast';

const defaultFilterOptions: FilterOptions = {
  locations: [],
  experiences: [],
  skills: [],
  educationLevels: [],
  salaryRange: { min: 0, max: 300000 },
  availability: [],
};

const defaultSortOption: SortOption = {
  field: 'name',
  direction: 'asc',
};

const CandidateContext = createContext<CandidateContextType | null>(null);

export function useCandidates() {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidates must be used within a CandidateProvider');
  }
  return context;
}

export function CandidateProvider({ children }: { children: React.ReactNode }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilterOptions);
  const [sortOption, setSortOption] = useState<SortOption>(defaultSortOption);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [teamReason, setTeamReason] = useState<string>('');

  
  useEffect(() => {
    const applyFilters = () => {
      let result = [...candidates];

     
      if (filters.locations.length > 0) {
        result = result.filter(candidate => 
          filters.locations.includes(candidate.location)
        );
      }

     
      if (filters.experiences.length > 0) {
        result = result.filter(candidate => {
          const roleNames = candidate.work_experiences.map(exp => exp.roleName);
          return filters.experiences.some(exp => roleNames.includes(exp));
        });
      }

      
      if (filters.skills.length > 0) {
        result = result.filter(candidate => 
          filters.skills.some(skill => candidate.skills.includes(skill))
        );
      }

     
      if (filters.educationLevels.length > 0) {
        result = result.filter(candidate => 
          filters.educationLevels.includes(candidate.education.highest_level)
        );
      }

      
      if (filters.salaryRange.min > 0 || filters.salaryRange.max < 300000) {
        result = result.filter(candidate => {
          if (!candidate.annual_salary_expectation['full-time']) return false;
          
          const salaryString = candidate.annual_salary_expectation['full-time'];
          const salaryNumber = parseInt(salaryString.replace(/[^0-9]/g, ''));
          
          return salaryNumber >= filters.salaryRange.min && 
                 salaryNumber <= filters.salaryRange.max;
        });
      }

      
      if (filters.availability.length > 0) {
        result = result.filter(candidate => 
          filters.availability.some(avail => candidate.work_availability.includes(avail))
        );
      }

      return result;
    };

    const applySorting = (candidatesToSort: Candidate[]) => {
      return [...candidatesToSort].sort((a, b) => {
        switch(sortOption.field) {
          case 'name':
          case 'email':
          case 'location':
            return sortOption.direction === 'asc' 
              ? a[sortOption.field].localeCompare(b[sortOption.field])
              : b[sortOption.field].localeCompare(a[sortOption.field]);
          
          case 'submitted_at':
            return sortOption.direction === 'asc'
              ? new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime()
              : new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
          
          case 'experience':
            return sortOption.direction === 'asc'
              ? a.work_experiences.length - b.work_experiences.length
              : b.work_experiences.length - a.work_experiences.length;
          
          case 'education':
            const educationOrder = ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD'];
            const aIndex = educationOrder.indexOf(a.education.highest_level);
            const bIndex = educationOrder.indexOf(b.education.highest_level);
            return sortOption.direction === 'asc' ? aIndex - bIndex : bIndex - aIndex;
          
          case 'skills':
            return sortOption.direction === 'asc'
              ? a.skills.length - b.skills.length
              : b.skills.length - a.skills.length;
          
          default:
            return 0;
        }
      });
    };

    const filtered = applyFilters();
    const sortedAndFiltered = applySorting(filtered);
    setFilteredCandidates(sortedAndFiltered);
  }, [candidates, filters, sortOption]);

  const uploadCandidates = (data: Candidate[]) => {
    setCandidates(data);
    
    
    const locationsSet = new Set(data.map(c => c.location));
    const skillsSet = new Set(data.flatMap(c => c.skills));
    const experiencesSet = new Set(data.flatMap(c => c.work_experiences.map(exp => exp.roleName)));
    const educationLevelsSet = new Set(data.map(c => c.education.highest_level));
    const availabilitySet = new Set(data.flatMap(c => c.work_availability));

    setFilters({
      ...defaultFilterOptions,
      locations: Array.from(locationsSet),
      skills: Array.from(skillsSet),
      experiences: Array.from(experiencesSet),
      educationLevels: Array.from(educationLevelsSet),
      availability: Array.from(availabilitySet),
    });

    toast({
      title: "Success!",
      description: `Uploaded ${data.length} candidates.`,
    });
  };

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const toggleCandidateSelection = (candidate: Candidate) => {
    const isSelected = selectedCandidates.some(c => c.email === candidate.email);
    
    if (isSelected) {
      setSelectedCandidates(prev => prev.filter(c => c.email !== candidate.email));
    } else {
      if (selectedCandidates.length >= 5) {
        toast({
          title: "Team limit reached",
          description: "You can only select up to 5 candidates. Remove someone first.",
          variant: "destructive"
        });
        return;
      }
      setSelectedCandidates(prev => [...prev, candidate]);
    }
  };

  const clearAllSelections = () => {
    setSelectedCandidates([]);
  };

  const saveTeam = (reason: string) => {
    setTeamReason(reason);
    toast({
      title: "Team saved!",
      description: `Your team of ${selectedCandidates.length} candidates has been saved.`,
    });
  };

  
  const generateRecommendations = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const scoredCandidates = candidates.map(candidate => {
        let score = 0;
        
        
        score += candidate.skills.length * 5;
        
        
        score += candidate.work_experiences.length * 10;
        
        
        const educationScores: Record<string, number> = {
          'High School': 5,
          'Associate Degree': 10,
          'Bachelor\'s Degree': 15,
          'Master\'s Degree': 20,
          'PhD': 25
        };
        score += educationScores[candidate.education.highest_level] || 0;
        
        
        const hasTop50School = candidate.education.degrees.some(degree => degree.isTop50);
        if (hasTop50School) score += 15;
        
        
        score += Math.floor(Math.random() * 5);
        
        return {
          ...candidate,
          score
        };
      });
      
     
      const sortedCandidates = scoredCandidates.sort((a, b) => (b.score || 0) - (a.score || 0));
      
      
      const recommendations = sortedCandidates.slice(0, 5);
      
      
      setSelectedCandidates(recommendations);
      
      setIsLoading(false);
      
      toast({
        title: "AI Recommendations Ready",
        description: "We've selected the top 5 candidates based on skills, experience, and education.",
      });
    }, 1500); 
  };

  const value: CandidateContextType = {
    candidates,
    filteredCandidates,
    selectedCandidates,
    filters,
    sortOption,
    isLoading,
    uploadCandidates,
    updateFilters,
    setSortOption,
    toggleCandidateSelection,
    generateRecommendations,
    clearAllSelections,
    saveTeam,
  };

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
}
