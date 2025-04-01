
import React, { useState, useRef } from 'react';
import { Upload, FileText, Check, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCandidates } from '@/context/CandidateContext';
import { toast } from '@/hooks/use-toast';
import { Candidate } from '@/types/candidates';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FileUpload() {
  const { uploadCandidates } = useCandidates();
  const [isDragging, setIsDragging] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [detailedError, setDetailedError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const validateCandidateData = (data: any[]): boolean => {
    if (!Array.isArray(data)) {
      setDetailedError('The uploaded file must contain an array of candidates.');
      return false;
    }

    for (let i = 0; i < data.length; i++) {
      const candidate = data[i];
      
      
      if (!candidate.name || typeof candidate.name !== 'string') {
        setDetailedError(`Candidate at index ${i} is missing a valid name.`);
        return false;
      }
      
      if (!candidate.email || typeof candidate.email !== 'string') {
        setDetailedError(`Candidate at index ${i} is missing a valid email.`);
        return false;
      }
      
      
      if (!candidate.work_experiences || !Array.isArray(candidate.work_experiences)) {
        setDetailedError(`Candidate "${candidate.name}" is missing work_experiences array.`);
        return false;
      }
      
      
      if (!candidate.education || typeof candidate.education !== 'object') {
        setDetailedError(`Candidate "${candidate.name}" is missing education data.`);
        return false;
      }
      
      if (!candidate.education.highest_level || typeof candidate.education.highest_level !== 'string') {
        setDetailedError(`Candidate "${candidate.name}" is missing highest_level in education.`);
        return false;
      }
      
      if (!candidate.education.degrees || !Array.isArray(candidate.education.degrees)) {
        setDetailedError(`Candidate "${candidate.name}" is missing degrees array in education.`);
        return false;
      }
      
      
      if (!candidate.skills || !Array.isArray(candidate.skills)) {
        setDetailedError(`Candidate "${candidate.name}" is missing skills array.`);
        return false;
      }
    }
    
    return true;
  };

  const processFile = (file: File) => {
    if (file.type !== 'application/json') {
      setError('Please upload a JSON file');
      setDetailedError('The file must be a valid JSON document with .json extension.');
      toast({
        title: 'Invalid file type',
        description: 'Please upload a JSON file',
        variant: 'destructive',
      });
      return;
    }

    setFileName(file.name);
    setError('');
    setDetailedError('');

    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (event.target) {
          const data = JSON.parse(event.target.result as string);
          
         
          if (!validateCandidateData(data)) {
            throw new Error('Invalid data structure: ' + detailedError);
          }
          
          uploadCandidates(data as Candidate[]);
          setFileUploaded(true);
          toast({
            title: 'Upload successful',
            description: `Uploaded ${data.length} candidates successfully.`,
          });
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        
        let errorMessage = 'Invalid JSON format or structure';
        if (error instanceof SyntaxError) {
          errorMessage = `JSON syntax error: ${error.message}`;
          setDetailedError(`The file contains invalid JSON syntax. Check for missing commas, brackets, or quotes.`);
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        setError(errorMessage);
        toast({
          title: 'Error parsing JSON',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    };
    
    reader.readAsText(file);
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleViewJsonExample = () => {
    const exampleJson = [
      {
        "name": "Example Candidate",
        "email": "example@example.com",
        "phone": "1234567890",
        "location": "City, Country",
        "submitted_at": "2025-01-01 00:00:00.000000",
        "work_availability": ["full-time"],
        "annual_salary_expectation": {
          "full-time": "$100000"
        },
        "work_experiences": [
          {
            "company": "Example Company",
            "roleName": "Software Developer"
          }
        ],
        "education": {
          "highest_level": "Bachelor's Degree",
          "degrees": [
            {
              "degree": "Bachelor's Degree",
              "subject": "Computer Science",
              "school": "University",
              "gpa": "GPA 3.5-3.9",
              "startDate": "2015",
              "endDate": "2019",
              "originalSchool": "Example University",
              "isTop50": false
            }
          ]
        },
        "skills": ["JavaScript", "React", "Node.js"]
      }
    ];
    
    const blob = new Blob([JSON.stringify(exampleJson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidate_example.json';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="container py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Upload Candidate Data</CardTitle>
          <CardDescription>
            Upload a JSON file containing candidate information to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging 
                ? 'border-primary bg-primary/10' 
                : error 
                  ? 'border-destructive bg-destructive/10' 
                  : fileUploaded 
                    ? 'border-green-500 bg-green-500/10' 
                    : 'border-muted-foreground/20'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            
            {fileUploaded ? (
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <Check className="h-6 w-6" />
                </div>
                <p className="text-lg font-medium">File Uploaded Successfully!</p>
                <p className="text-sm text-muted-foreground">{fileName}</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center text-destructive">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <p className="text-lg font-medium">Error Uploading File</p>
                <p className="text-sm text-destructive">{error}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="text-lg font-medium">Drag and drop your JSON file here</p>
                <p className="text-sm text-muted-foreground">or</p>
                <Button type="button" variant="outline" onClick={handleBrowseClick}>
                  <FileText className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
              </div>
            )}
          </div>
          
          {error && detailedError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Upload Error</AlertTitle>
              <AlertDescription>
                {detailedError}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">JSON Format Requirements:</p>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground ml-6 space-y-1">
              <li>Data must be a valid JSON array of candidate objects</li>
              <li>Each candidate must have: name, email, work_experiences array, education object with highest_level and degrees array, and skills array</li>
              <li>Make sure your JSON syntax is correct (commas, brackets, etc.)</li>
            </ul>
            <Button 
              type="button" 
              variant="link" 
              className="text-sm px-0 mt-2 w-fit text-primary" 
              onClick={handleViewJsonExample}
            >
              Download example JSON format
            </Button>
          </div>
          
          {fileUploaded && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="font-medium">You can now view your candidate data</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Proceed to the dashboard to see all candidates and filter them based on your requirements.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {fileUploaded ? (
            <Button onClick={() => navigate('/')}>
              View Candidates
            </Button>
          ) : (
            <Button variant="outline" onClick={handleViewJsonExample}>
              Get Example
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
