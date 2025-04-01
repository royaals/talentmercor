
import { useCandidates } from '@/context/CandidateContext';
import { FilterOptions } from '@/types/candidates';
import React, { useState } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Hammer,
  Clock,
  RefreshCw,
  DollarSign,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export default function FiltersSidebar() {
  const { filters, updateFilters } = useCandidates();
  const [salaryRange, setSalaryRange] = useState<[number, number]>([
    filters.salaryRange.min,
    filters.salaryRange.max
  ]);
  
  const handleSalaryChange = (value: number[]) => {
    setSalaryRange([value[0], value[1]]);
  };
  
  const applyFilters = () => {
    updateFilters({
      salaryRange: {
        min: salaryRange[0],
        max: salaryRange[1]
      }
    });
  };
  
  const resetFilters = () => {
    updateFilters({
      locations: [],
      experiences: [],
      skills: [],
      educationLevels: [],
      availability: [],
      salaryRange: { min: 0, max: 300000 }
    });
    setSalaryRange([0, 300000]);
  };
  
  const updateCheckboxFilter = (
    type: keyof FilterOptions, 
    value: string, 
    checked: boolean
  ) => {
    const currentValues = filters[type] as string[];
    let updatedValues: string[];
    
    if (checked) {
      updatedValues = [...currentValues, value];
    } else {
      updatedValues = currentValues.filter(v => v !== value);
    }
    
    updateFilters({ [type]: updatedValues });
  };
  
  return (
    <div className="w-full lg:w-72 pr-0 lg:pr-4">
      <div className="rounded-lg border bg-card text-card-foreground shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="h-8 px-2 text-xs"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Reset
            </Button>
          </div>
          
          <Accordion type="multiple" defaultValue={['location', 'salary']}>
            <AccordionItem value="location">
              <AccordionTrigger className="py-3">
                <span className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1 pb-2">
                  {filters.locations.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={filters.locations.includes(location)}
                        onCheckedChange={(checked) => 
                          updateCheckboxFilter('locations', location, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`location-${location}`}
                        className="text-sm font-normal"
                      >
                        {location}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="experience">
              <AccordionTrigger className="py-3">
                <span className="flex items-center text-sm">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Experience
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1 pb-2">
                  {filters.experiences.slice(0, 10).map((experience) => (
                    <div key={experience} className="flex items-center space-x-2">
                      <Checkbox
                        id={`experience-${experience}`}
                        checked={filters.experiences.includes(experience)}
                        onCheckedChange={(checked) => 
                          updateCheckboxFilter('experiences', experience, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`experience-${experience}`}
                        className="text-sm font-normal"
                      >
                        {experience}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="education">
              <AccordionTrigger className="py-3">
                <span className="flex items-center text-sm">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Education
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1 pb-2">
                  {filters.educationLevels.map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={`education-${level}`}
                        checked={filters.educationLevels.includes(level)}
                        onCheckedChange={(checked) => 
                          updateCheckboxFilter('educationLevels', level, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`education-${level}`}
                        className="text-sm font-normal"
                      >
                        {level}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="skills">
              <AccordionTrigger className="py-3">
                <span className="flex items-center text-sm">
                  <Hammer className="h-4 w-4 mr-2" />
                  Skills
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1 pb-2">
                  {filters.skills.slice(0, 10).map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={filters.skills.includes(skill)}
                        onCheckedChange={(checked) => 
                          updateCheckboxFilter('skills', skill, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`skill-${skill}`}
                        className="text-sm font-normal"
                      >
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="availability">
              <AccordionTrigger className="py-3">
                <span className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Availability
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1 pb-2">
                  {filters.availability.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`availability-${type}`}
                        checked={filters.availability.includes(type)}
                        onCheckedChange={(checked) => 
                          updateCheckboxFilter('availability', type, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`availability-${type}`}
                        className="text-sm font-normal"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="salary">
              <AccordionTrigger className="py-3">
                <span className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Salary Range
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-1 pb-2">
                  <div className="space-y-4">
                    <Slider 
                      defaultValue={[0, 300000]} 
                      max={300000} 
                      step={5000}
                      value={[salaryRange[0], salaryRange[1]]}
                      onValueChange={handleSalaryChange}
                      className="mt-6"
                    />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>${(salaryRange[0]/1000).toFixed(0)}k</span>
                      <span>${(salaryRange[1]/1000).toFixed(0)}k</span>
                    </div>
                    
                    <Button 
                      onClick={applyFilters} 
                      className="w-full mt-2"
                      size="sm"
                    >
                      Apply Range
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
