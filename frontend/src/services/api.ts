import { FormData, PredictionResult } from '../App';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000';

type ModelInput = Record<string, number | string>;
export const MODEL_FIELD_MAPPING = {
  ict1305: 'ICT 1305',
  ict1209: 'ICT 1209',
  ict2207: 'ICT 2207',
  ict2308: 'ICT 2308',
  ict3201: 'ICT 3201',
  ict3312: 'ICT 3312',
  ict4205: 'ICT 4205',
  ict1108: 'ICT 1108',
  ict2212: 'ICT 2212',
  ict3206: 'ICT 3206',
  cmt1205: 'CMT 1205',
  cmt1209: 'CMT 1209',
  ict2109: 'ICT 2109',
  cml1203: 'CML 1203',
  cml4201: 'CML 4201',
  batch: 'Batch',
  yearOfGraduation: 'Graduation_Year',
  gpaYear3: 'Third_Year_GPA',
  finalGpa: 'Final_Degree_GPA',
  schoolType: 'School_Type',
  gender: 'Gender',
  techWritePrograms: 'Programming_Ability',
  oopKnowledge: 'OOP_Knowledge',
  techDebugging: 'Debugging_Ability',
  techCompleteApps: 'Application_Development',
  frontendBackendIntegration: 'Frontend_Backend_Integration',
  sqlDatabaseSkill: 'SQL_Database_Skill',
  dataManipulation: 'Data_Manipulation',
  technicalProblemAnalysis: 'Technical_Problem_Analysis',
  techLearnNewTech: 'Learning_New_Technologies',
  numberOfProjects: 'Project_Count',
  highestProjectLevel: 'Highest_Project_Level',
  ictWorkExperience: 'ICT_Work_Experience',
  workExperienceDuration: 'Work_Experience_Duration',
  ictCertifications: 'Certification_Status',
  hackathonParticipation: 'Hackathon_Participation',
  workshopSeminarParticipation: 'Workshop_Seminar_Participation',
  clubParticipation: 'Club_Participation',
  weeklyExtracurricularHours: 'Weekly_Extracurricular_Hours',
  leadershipResponsibility: 'Leadership_Responsibility',
  extracurricularInvolvement: 'Extracurricular_Involvement',
  groupDiscussionParticipation: 'Group_Discussion_Participation',
  technicalCommunication: 'Technical_Communication',
  meetingDeadlines: 'Meeting_Deadlines',
  softInitiative: 'Initiative_Taking',
  adaptability: 'Adaptability',
  presentationConfidence: 'Presentation_Confidence',
  cvPortfolioReadiness: 'CV_Portfolio_Readiness',
  jobApplicationActivity: 'Job_Application_Activity',
  linkedinAvailable: 'LinkedIn_Availability',
  githubAvailable: 'GitHub_Availability'
} as const;

const toCountBand = (value: string): '1-2' | '3-4' | 'More than 4' => {
  const count = Number(value);
  if (count <= 2) return '1-2';
  if (count <= 4) return '3-4';
  return 'More than 4';
};

const toProjectLevel = (value: string): string => {
  const levels: Record<string, string> = {
    individual: 'Academic Assignment',
    group: 'Personal Project',
    fyp: 'Research Project',
    industry: 'Industry-Based Project',
    published: 'Industry-Based Project'
  };
  return levels[value];
};

const toYesNo = (value: string): 'Yes' | 'No' =>
  value.startsWith('yes') ? 'Yes' : 'No';

export function toModelInput(formData: FormData): ModelInput {
  const modelInput: ModelInput = {
      [MODEL_FIELD_MAPPING.ict1305]: Number(formData.ict1305),
      [MODEL_FIELD_MAPPING.ict1209]: Number(formData.ict1209),
      [MODEL_FIELD_MAPPING.ict2207]: Number(formData.ict2207),
      [MODEL_FIELD_MAPPING.ict2308]: Number(formData.ict2308),
      [MODEL_FIELD_MAPPING.ict3201]: Number(formData.ict3201),
      [MODEL_FIELD_MAPPING.ict3312]: Number(formData.ict3312),
      [MODEL_FIELD_MAPPING.ict4205]: Number(formData.ict4205),
      [MODEL_FIELD_MAPPING.ict1108]: Number(formData.ict1108),
      [MODEL_FIELD_MAPPING.ict2212]: Number(formData.ict2212),
      [MODEL_FIELD_MAPPING.ict3206]: Number(formData.ict3206),
      [MODEL_FIELD_MAPPING.cmt1205]: Number(formData.cmt1205),
      [MODEL_FIELD_MAPPING.cmt1209]: Number(formData.cmt1209),
      [MODEL_FIELD_MAPPING.ict2109]: Number(formData.ict2109),
      [MODEL_FIELD_MAPPING.cml1203]: Number(formData.cml1203),
      [MODEL_FIELD_MAPPING.cml4201]: Number(formData.cml4201),
      [MODEL_FIELD_MAPPING.batch]: formData.batch,
      [MODEL_FIELD_MAPPING.yearOfGraduation]: Number(formData.yearOfGraduation),
      [MODEL_FIELD_MAPPING.gpaYear3]: Number(formData.gpaYear3),
      [MODEL_FIELD_MAPPING.finalGpa]: Number(formData.finalGpa),
      [MODEL_FIELD_MAPPING.schoolType]: formData.schoolType,
      [MODEL_FIELD_MAPPING.gender]: formData.gender,
      [MODEL_FIELD_MAPPING.techWritePrograms]: formData.techWritePrograms,
      [MODEL_FIELD_MAPPING.oopKnowledge]: formData.oopKnowledge,
      [MODEL_FIELD_MAPPING.techDebugging]: formData.techDebugging,
      [MODEL_FIELD_MAPPING.techCompleteApps]: formData.techCompleteApps,
      [MODEL_FIELD_MAPPING.frontendBackendIntegration]: formData.frontendBackendIntegration,
      [MODEL_FIELD_MAPPING.sqlDatabaseSkill]: formData.sqlDatabaseSkill,
      [MODEL_FIELD_MAPPING.dataManipulation]: formData.dataManipulation,
      [MODEL_FIELD_MAPPING.technicalProblemAnalysis]: formData.technicalProblemAnalysis,
      [MODEL_FIELD_MAPPING.techLearnNewTech]: formData.techLearnNewTech,
      [MODEL_FIELD_MAPPING.numberOfProjects]: toCountBand(formData.numberOfProjects),
      [MODEL_FIELD_MAPPING.highestProjectLevel]: toProjectLevel(formData.highestProjectLevel),
      [MODEL_FIELD_MAPPING.ictWorkExperience]: toYesNo(formData.ictWorkExperience),
      [MODEL_FIELD_MAPPING.workExperienceDuration]: formData.workExperienceDuration,
      [MODEL_FIELD_MAPPING.ictCertifications]: toCountBand(formData.ictCertifications),
      [MODEL_FIELD_MAPPING.hackathonParticipation]: formData.hackathonParticipation,
      [MODEL_FIELD_MAPPING.workshopSeminarParticipation]: formData.workshopSeminarParticipation,
      [MODEL_FIELD_MAPPING.clubParticipation]: formData.clubParticipation,
      [MODEL_FIELD_MAPPING.weeklyExtracurricularHours]: formData.weeklyExtracurricularHours,
      [MODEL_FIELD_MAPPING.leadershipResponsibility]: formData.leadershipResponsibility,
      [MODEL_FIELD_MAPPING.extracurricularInvolvement]: formData.extracurricularInvolvement,
      [MODEL_FIELD_MAPPING.groupDiscussionParticipation]: formData.groupDiscussionParticipation,
      [MODEL_FIELD_MAPPING.technicalCommunication]: formData.technicalCommunication,
      [MODEL_FIELD_MAPPING.meetingDeadlines]: formData.meetingDeadlines,
      [MODEL_FIELD_MAPPING.softInitiative]: formData.softInitiative,
      [MODEL_FIELD_MAPPING.adaptability]: formData.adaptability,
      [MODEL_FIELD_MAPPING.presentationConfidence]: formData.presentationConfidence,
      [MODEL_FIELD_MAPPING.cvPortfolioReadiness]: formData.cvPortfolioReadiness,
      [MODEL_FIELD_MAPPING.jobApplicationActivity]: formData.jobApplicationActivity,
      [MODEL_FIELD_MAPPING.linkedinAvailable]: toYesNo(formData.linkedinAvailable),
      [MODEL_FIELD_MAPPING.githubAvailable]: toYesNo(formData.githubAvailable)
  };

  if (Object.values(modelInput).some((value) => value === '' || value === undefined || value === null || (typeof value === 'number' && Number.isNaN(value)))) {
      throw new Error('Please complete all assessment fields before requesting a prediction.');
  }

  return modelInput;
}

export async function predictEmploymentReadiness(
  formData: FormData
): Promise<PredictionResult> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/predict/employment-readiness`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toModelInput(formData))
    });
  } catch {
    throw new Error('The prediction service is unavailable. Please try again.');
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const detail = Array.isArray(body?.detail)
      ? body.detail.map((item: { msg?: string }) => item.msg).filter(Boolean).join(' ')
      : body?.detail;
    throw new Error(detail || 'The prediction could not be completed. Please try again.');
  }

  if (
    !body ||
    typeof body.predicted_class !== 'string' ||
    typeof body.confidence !== 'number' ||
    !body.probabilities ||
    typeof body.probabilities !== 'object'
  ) {
    throw new Error('The prediction service returned an invalid response. Please try again.');
  }

  return body as PredictionResult;
}
