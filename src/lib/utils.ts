
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  

  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 1) {
    return 'today';
  } else if (diffDays <= 2) {
    return 'yesterday';
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`;
  } else if (diffDays <= 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}

export function formatSalary(salaryString: string) {
  
  const numericValue = parseInt(salaryString.replace(/[^0-9]/g, ''));
  
  if (isNaN(numericValue)) {
    return salaryString;
  }
  
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(numericValue);
}


export function getUniqueValues<T>(array: T[]): T[] {
  return [...new Set(array)];
}


export function calculateYearsOfExperience(workExperiences: {
  startDate?: string;
  endDate?: string;
}[]): number {
  
  const experiencesWithDates = workExperiences.filter(
    exp => exp.startDate && exp.endDate
  );
  
  if (experiencesWithDates.length === 0) {
    return workExperiences.length;
  }
  
  let totalYears = 0;
  
  experiencesWithDates.forEach(exp => {
    if (exp.startDate && exp.endDate) {
      const start = new Date(exp.startDate);
      const end = new Date(exp.endDate);
      
      
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const yearDiff = end.getFullYear() - start.getFullYear();
        totalYears += yearDiff;
      }
    }
  });
  
  return totalYears;
}
