
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCandidates } from '@/context/CandidateContext';
import CandidateList from '@/components/dashboard/CandidateList';
import FiltersSidebar from '@/components/dashboard/FiltersSidebar';
import SortControls from '@/components/dashboard/SortControls';
import { UploadCloud, Users } from 'lucide-react';

const Index = () => {
  const { 
    candidates,
    filteredCandidates, 
    selectedCandidates,
    toggleCandidateSelection 
  } = useCandidates();
  const navigate = useNavigate();

  if (candidates.length === 0) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center p-12 border rounded-lg mt-8 animate-fade-in">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">No Candidate Data Found</h1>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Get started by uploading a JSON file with candidate information to begin evaluating and selecting your team.
          </p>
          <Button onClick={() => navigate('/upload')}>
            Upload Candidate Data
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Candidate Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            {filteredCandidates.length} {filteredCandidates.length === 1 ? 'candidate' : 'candidates'} found • {selectedCandidates.length}/5 selected
          </p>
        </div>
        
        <Button onClick={() => navigate('/team')} disabled={selectedCandidates.length === 0}>
          <Users className="mr-2 h-4 w-4" />
          View Selected Team ({selectedCandidates.length})
        </Button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <FiltersSidebar />
        
        <div className="flex-1">
          <SortControls />
          <CandidateList 
            candidates={filteredCandidates} 
            onSelect={toggleCandidateSelection}
            selectedCandidates={selectedCandidates}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
