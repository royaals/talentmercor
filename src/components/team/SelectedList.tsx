
import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Candidate } from '@/types/candidates';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Briefcase, 
  GraduationCap,
  CheckCircle2,
  XCircle,
  Star
} from 'lucide-react';

interface SelectedListProps {
  candidates: Candidate[];
  onRemove: (candidate: Candidate) => void;
}

export default function SelectedList({ candidates, onRemove }: SelectedListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates.map((candidate) => (
        <Card 
          key={candidate.email}
          className="border-mercor-400 animate-fade-in"
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center">
                  {candidate.name}
                  {candidate.score && (
                    <Badge variant="outline" className="ml-2 bg-mercor-100 dark:bg-mercor-900/30 text-mercor-700">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      Score: {candidate.score}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="mt-1 flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  {candidate.location}
                </CardDescription>
              </div>
              <Button 
                variant="outline"
                size="sm" 
                className="h-8 text-destructive hover:text-destructive"
                onClick={() => onRemove(candidate)}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <span>{candidate.phone}</span>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <h4 className="font-semibold flex items-center mb-1">
                <Briefcase className="h-4 w-4 mr-1" />
                Experience
              </h4>
              <ul className="text-sm space-y-1 ml-6">
                {candidate.work_experiences.slice(0, 2).map((exp, i) => (
                  <li key={i} className="text-muted-foreground">
                    {exp.roleName} at {exp.company}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t pt-3">
              <h4 className="font-semibold flex items-center mb-1">
                <GraduationCap className="h-4 w-4 mr-1" />
                Education
              </h4>
              <div className="ml-6 text-muted-foreground">
                <p>{candidate.education.highest_level}</p>
                {candidate.education.degrees.length > 0 && (
                  <p className="text-xs">
                    {candidate.education.degrees[0].subject}
                  </p>
                )}
              </div>
            </div>
            
            <div className="border-t pt-3">
              <h4 className="font-semibold mb-2">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {candidate.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {candidates.length === 0 && (
        <div className="col-span-full flex items-center justify-center p-12 border rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-medium">No candidates selected</h3>
            <p className="text-muted-foreground mt-1">Select up to 5 candidates to build your team</p>
          </div>
        </div>
      )}
      
      {candidates.length > 0 && candidates.length < 5 && (
        <Card className="border-dashed border-muted-foreground/50 bg-muted/50 flex items-center justify-center h-full">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground/70" />
            <p className="text-sm font-medium text-muted-foreground">
              {5 - candidates.length} more position{candidates.length === 4 ? '' : 's'} to fill
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
