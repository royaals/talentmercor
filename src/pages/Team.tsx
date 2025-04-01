
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCandidates } from '@/context/CandidateContext';
import SelectedList from '@/components/team/SelectedList';
import FinalizeTeam from '@/components/team/FinalizeTeam';
import { ArrowLeft, RefreshCw, UserX } from 'lucide-react';

const Team = () => {
  const { 
    selectedCandidates, 
    toggleCandidateSelection, 
    clearAllSelections,
    saveTeam
  } = useCandidates();
  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <h1 className="text-3xl font-bold">Your Selected Team</h1>
          <p className="text-muted-foreground mt-1">
            {selectedCandidates.length}/5 candidates selected for your team
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            disabled={selectedCandidates.length === 0}
            onClick={clearAllSelections}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <SelectedList 
          candidates={selectedCandidates} 
          onRemove={toggleCandidateSelection} 
        />
      </div>
      
      {selectedCandidates.length > 0 && (
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-md">
            <FinalizeTeam 
              candidates={selectedCandidates}
              onSave={saveTeam}
            />
          </div>
        </div>
      )}
      
      {selectedCandidates.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 border rounded-lg mt-8 animate-fade-in">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-6">
            <UserX className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Team Members Selected</h2>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            You haven't selected any candidates for your team yet. Return to the dashboard to select up to 5 candidates.
          </p>
          <Button onClick={() => navigate('/')}>
            Go to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default Team;
