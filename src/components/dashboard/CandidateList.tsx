
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
  Clock,
  DollarSign,
  CheckCircle2,
  PlusCircle
} from 'lucide-react';
import { formatDate, formatSalary } from '@/lib/utils';

interface CandidateListProps {
  candidates: Candidate[];
  onSelect: (candidate: Candidate) => void;
  selectedCandidates: Candidate[];
}

export default function CandidateList({ candidates, onSelect, selectedCandidates }: CandidateListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates.map((candidate) => {
        const isSelected = selectedCandidates.some(c => c.email === candidate.email);
        return (
          <Card 
            key={candidate.email}
            className={`card-hover ${isSelected ? 'border-mercor-500 bg-mercor-100 dark:bg-mercor-900/20' : ''}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {candidate.name}
                    {candidate.score && (
                      <Badge variant="outline" className="ml-2 bg-mercor-100 dark:bg-mercor-900/30 text-mercor-700">
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
                  variant={isSelected ? "default" : "outline"}
                  size="sm" 
                  className={`h-8 ${isSelected ? 'bg-mercor-500 hover:bg-mercor-600' : ''}`}
                  onClick={() => onSelect(candidate)}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Selected
                    </>
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Select
                    </>
                  )}
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
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Available for: {candidate.work_availability.join(', ')}</span>
                </div>
                {candidate.annual_salary_expectation['full-time'] && (
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>Salary: {formatSalary(candidate.annual_salary_expectation['full-time'])}/year</span>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-3">
                <h4 className="font-semibold flex items-center mb-1">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Experience
                </h4>
                <ul className="text-sm space-y-1 ml-6">
                  {candidate.work_experiences.slice(0, 3).map((exp, i) => (
                    <li key={i} className="text-muted-foreground">
                      {exp.roleName} at {exp.company}
                    </li>
                  ))}
                  {candidate.work_experiences.length > 3 && (
                    <li className="text-muted-foreground text-xs">
                      +{candidate.work_experiences.length - 3} more roles
                    </li>
                  )}
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
                      {candidate.education.degrees[0].subject} • {candidate.education.degrees[0].originalSchool}
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
            <CardFooter className="text-xs text-muted-foreground">
              Applied {formatDate(candidate.submitted_at)}
            </CardFooter>
          </Card>
        );
      })}
      
      {candidates.length === 0 && (
        <div className="col-span-full flex items-center justify-center p-12 border rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-medium">No candidates match the current filters</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your filters or uploading more candidates</p>
          </div>
        </div>
      )}
    </div>
  );
}
