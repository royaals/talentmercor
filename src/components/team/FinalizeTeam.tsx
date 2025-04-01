
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Check, Save } from 'lucide-react';
import { Candidate } from '@/types/candidates';

interface FinalizeTeamProps {
  candidates: Candidate[];
  onSave: (reason: string) => void;
}

export default function FinalizeTeam({ candidates, onSave }: FinalizeTeamProps) {
  const [reason, setReason] = useState('');
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    onSave(reason);
    setSaved(true);
    setTimeout(() => setOpen(false), 1500);
  };
  
  const isTeamComplete = candidates.length === 5;
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          disabled={!isTeamComplete} 
          className="w-full"
        >
          <Save className="mr-2 h-4 w-4" />
          Finalize Team Selection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Finalize Your Team Selection</DialogTitle>
          <DialogDescription>
            Explain why you've selected these 5 candidates for your team.
          </DialogDescription>
        </DialogHeader>
        
        {saved ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-center">Team Saved!</h3>
            <p className="text-center text-muted-foreground mt-2">
              Your team selection has been finalized.
            </p>
          </div>
        ) : (
          <>
            <div className="py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Explain why you selected these candidates and how they will work well together as a team..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={reason.length < 10}
                onClick={handleSave}
              >
                Save Team
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
