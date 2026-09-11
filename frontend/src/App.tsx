import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { ResultPage } from './pages/ResultPage';
export interface FormData {
  // Step 1: Academic Performance
  yearOfGraduation: string;
  gpaYear3: string;
  finalGpa: string;
  gender: string;
  schoolType: string;
  batch: string;
  ict1305: string;
  ict1209: string;
  ict2207: string;
  ict2308: string;
  ict3201: string;
  ict3312: string;
  ict4205: string;
  ict1108: string;
  ict2212: string;
  ict3206: string;
  cmt1205: string;
  cmt1209: string;
  ict2109: string;
  cml1203: string;
  cml4201: string;
  // Step 2: Technical Skill Readiness (1-5)
  techWritePrograms: number;
  techProgrammingFundamentals: number;
  oopKnowledge: number;
  techDebugging: number;
  techCompleteApps: number;
  frontendBackendIntegration: number;
  sqlDatabaseSkill: number;
  dataManipulation: number;
  technicalProblemAnalysis: number;
  techLearnNewTech: number;
  // Step 3: Practical Exposure & Projects
  numberOfProjects: string;
  highestProjectLevel: string;
  ictWorkExperience: string;
  workExperienceDuration: string;
  hackathonParticipation: string;
  workshopSeminarParticipation: string;
  clubParticipation: string;
  weeklyExtracurricularHours: string;
  // Step 4: Professional & Career Readiness
  ictCertifications: string;
  cvPortfolioReadiness: number;
  jobApplicationActivity: number;
  linkedinAvailable: string;
  githubAvailable: string;
  // Step 5: Soft Skills (1-5)
  leadershipResponsibility: string;
  softCommunication: number;
  softTeamwork: number;
  groupDiscussionParticipation: number;
  technicalCommunication: number;
  meetingDeadlines: number;
  softInitiative: number;
  adaptability: number;
  presentationConfidence: number;
  extracurricularInvolvement: number;
}
export interface PredictionResult {
  predicted_class: 'At Risk' | 'High Readiness' | 'Moderate Readiness';
  confidence: number;
  probabilities: {
    'At Risk': number;
    'High Readiness': number;
    'Moderate Readiness': number;
  };
}
const defaultFormData: FormData = {
  yearOfGraduation: '',
  gpaYear3: '',
  finalGpa: '',
  gender: '',
  schoolType: '',
  batch: '',
  ict1305: '',
  ict1209: '',
  ict2207: '',
  ict2308: '',
  ict3201: '',
  ict3312: '',
  ict4205: '',
  ict1108: '',
  ict2212: '',
  ict3206: '',
  cmt1205: '',
  cmt1209: '',
  ict2109: '',
  cml1203: '',
  cml4201: '',
  techWritePrograms: 0,
  techProgrammingFundamentals: 0,
  oopKnowledge: 0,
  techDebugging: 0,
  techCompleteApps: 0,
  frontendBackendIntegration: 0,
  sqlDatabaseSkill: 0,
  dataManipulation: 0,
  technicalProblemAnalysis: 0,
  techLearnNewTech: 0,
  numberOfProjects: '',
  highestProjectLevel: '',
  ictWorkExperience: '',
  workExperienceDuration: '',
  hackathonParticipation: '',
  workshopSeminarParticipation: '',
  clubParticipation: '',
  weeklyExtracurricularHours: '',
  ictCertifications: '',
  cvPortfolioReadiness: 0,
  jobApplicationActivity: 0,
  linkedinAvailable: '',
  githubAvailable: '',
  leadershipResponsibility: '',
  softCommunication: 0,
  softTeamwork: 0,
  groupDiscussionParticipation: 0,
  technicalCommunication: 0,
  meetingDeadlines: 0,
  softInitiative: 0,
  adaptability: 0,
  presentationConfidence: 0,
  extracurricularInvolvement: 0
};
export function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const handleStartAssessment = () => setCurrentPage(1);
  const handleShowResult = (r: PredictionResult) => {
    setResult(r);
    setCurrentPage(2);
  };
  const handleRestart = () => {
    setFormData(defaultFormData);
    setResult(null);
    setCurrentPage(1);
  };
  const handleHome = () => {
    setFormData(defaultFormData);
    setResult(null);
    setCurrentPage(0);
  };
  return (
    <div className="min-h-screen w-full bg-white">
      {currentPage === 0 && <LandingPage onStart={handleStartAssessment} />}
      {currentPage === 1 &&
      <AssessmentPage
        formData={formData}
        setFormData={setFormData}
        onResult={handleShowResult}
        onHome={handleHome} />

      }
      {currentPage === 2 && result &&
      <ResultPage
        result={result}
        onRestart={handleRestart}
        onHome={handleHome} />

      }
    </div>);

}