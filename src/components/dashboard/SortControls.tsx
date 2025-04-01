
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SortAsc, SortDesc, Wand2 } from 'lucide-react';
import { SortOption } from '@/types/candidates';
import { useCandidates } from '@/context/CandidateContext';

export default function SortControls() {
  const { sortOption, setSortOption, generateRecommendations, isLoading } = useCandidates();

  const handleSortFieldChange = (value: string) => {
    setSortOption({
      ...sortOption,
      field: value as SortOption['field']
    });
  };

  const toggleSortDirection = () => {
    setSortOption({
      ...sortOption,
      direction: sortOption.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="flex items-center justify-between gap-2 mb-6">
      <div className="flex items-center gap-2">
        <Select
          value={sortOption.field}
          onValueChange={handleSortFieldChange}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="location">Location</SelectItem>
            <SelectItem value="submitted_at">Date Applied</SelectItem>
            <SelectItem value="experience">Experience</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="skills">Skills</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSortDirection}
          className="h-10 w-10"
        >
          {sortOption.direction === 'asc' ? (
            <SortAsc className="h-4 w-4" />
          ) : (
            <SortDesc className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <Button onClick={generateRecommendations} disabled={isLoading}>
        <Wand2 className="mr-2 h-4 w-4" />
        {isLoading ? "Processing..." : "AI Recommendations"}
      </Button>
    </div>
  );
}
