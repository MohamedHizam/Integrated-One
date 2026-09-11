import React, { useState, Fragment } from 'react';
import {
  BrainCircuitIcon,
  LoaderIcon,
  HomeIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon } from
'lucide-react';
import { FormData, PredictionResult } from '../App';
import { predictEmploymentReadiness } from '../services/api';
interface AssessmentPageProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onResult: (result: PredictionResult) => void;
  onHome: () => void;
}
function RatingScale({
  label,
  value,
  onChange




}: {label: string;value: number;onChange: (v: number) => void;}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-700 flex-1">{label}</span>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((n) =>
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${value === n ? 'bg-blue-600 text-white shadow-sm' : value > 0 && n <= value ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>

            {n}
          </button>
        )}
        <span className="text-xs text-slate-400 w-14 text-right">
          {value === 0 ?
          '—' :
          value === 1 ?
          'Very Low' :
          value === 2 ?
          'Low' :
          value === 3 ?
          'Moderate' :
          value === 4 ?
          'High' :
          'Very High'}
        </span>
      </div>
    </div>);

}
function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder









}: {label: string;value: string;onChange: (v: string) => void;options: {value: string;label: string;}[];placeholder?: string;}) {
  const fieldId = `select-${label.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;
  return (
    <div>
      <label htmlFor={fieldId} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <select
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.75rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.25em 1.25em',
          paddingRight: '2.5rem'
        }}>

        <option value="">{placeholder || 'Select...'}</option>
        {options.map((o) =>
        <option key={o.value} value={o.value}>
            {o.label}
          </option>
        )}
      </select>
    </div>);

}
function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  min,
  max,
  step,
  hint










}: {label: string;value: string;onChange: (v: string) => void;type?: string;placeholder?: string;min?: string;max?: string;step?: string;hint?: string;}) {
  const fieldId = `input-${label.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;
  return (
    <div>
      <label htmlFor={fieldId} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        id={fieldId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>);

}

const GRADE_OPTIONS = [
  { value: '4', label: 'A+ / A (4.0)' },
  { value: '3.7', label: 'A- (3.7)' },
  { value: '3.3', label: 'B+ (3.3)' },
  { value: '3', label: 'B (3.0)' },
  { value: '2.7', label: 'B- (2.7)' },
  { value: '2.3', label: 'C+ (2.3)' },
  { value: '2', label: 'C (2.0)' },
  { value: '1.7', label: 'C- (1.7)' },
  { value: '1.3', label: 'D+ (1.3)' },
  { value: '1', label: 'D (1.0)' },
  { value: '0', label: 'E (0.0)' }
];

const SUBJECT_FIELDS: {field: keyof FormData;label: string;}[] = [
  { field: 'ict1305', label: 'ICT 1305' },
  { field: 'ict1209', label: 'ICT 1209' },
  { field: 'ict2207', label: 'ICT 2207' },
  { field: 'ict2308', label: 'ICT 2308' },
  { field: 'ict3201', label: 'ICT 3201' },
  { field: 'ict3312', label: 'ICT 3312' },
  { field: 'ict4205', label: 'ICT 4205' },
  { field: 'ict1108', label: 'ICT 1108' },
  { field: 'ict2212', label: 'ICT 2212' },
  { field: 'ict3206', label: 'ICT 3206' },
  { field: 'cmt1205', label: 'CMT 1205' },
  { field: 'cmt1209', label: 'CMT 1209' },
  { field: 'ict2109', label: 'ICT 2109' },
  { field: 'cml1203', label: 'CML 1203' },
  { field: 'cml4201', label: 'CML 4201' }
];
const STEPS = [
{
  label: 'Academic'
},
{
  label: 'Technical'
},
{
  label: 'Projects'
},
{
  label: 'Career'
},
{
  label: 'Soft Skills'
}];

function StepIndicator({ current }: {current: number;}) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((step, i) => {
        const n = i + 1;
        const isCompleted = n < current;
        const isCurrent = n === current;
        return (
          <Fragment key={n}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${isCompleted ? 'bg-green-500 border-green-500 text-white' : isCurrent ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>

                {isCompleted ? <CheckIcon className="w-4 h-4" /> : n}
              </div>
              <span
                className={`text-xs font-semibold mt-1.5 tracking-wide ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-slate-400'}`}>

                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 &&
            <div
              className={`w-16 sm:w-24 h-0.5 mx-1 mb-5 transition-all ${n < current ? 'bg-green-400' : 'bg-slate-200'}`} />

            }
          </Fragment>);

      })}
    </div>);

}
export function AssessmentPage({
  formData,
  setFormData,
  onResult,
  onHome
}: AssessmentPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const update = (field: keyof FormData, value: string | number) => {
    setStepError(null);
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const validateStep = (step: number): string | null => {
    if (step === 1) {
      if (!formData.finalGpa) return 'Please enter your Final Degree GPA.';
      if (!formData.gpaYear3)
      return 'Please enter your GPA at End of Third Year.';
      if (Number(formData.finalGpa) < 2 || Number(formData.finalGpa) > 4)
      return 'Final Degree GPA must be between 2.00 and 4.00.';
      if (Number(formData.gpaYear3) < 2 || Number(formData.gpaYear3) > 4)
      return 'GPA at End of Third Year must be between 2.00 and 4.00.';
      if (!formData.yearOfGraduation)
      return 'Please select your Year of Graduation.';
      if (!formData.gender) return 'Please select your gender.';
      if (!formData.schoolType) return 'Please select your school type.';
      if (!formData.batch) return 'Please select your university batch.';
      if (SUBJECT_FIELDS.some(({ field }) => !formData[field]))
      return 'Please select a grade for every academic subject.';
    }
    if (step === 2) {
      if (formData.techWritePrograms === 0)
      return 'Please rate your ability to write programs.';
      if (formData.techProgrammingFundamentals === 0)
      return 'Please rate your understanding of programming fundamentals.';
      if (formData.techDebugging === 0)
      return 'Please rate your debugging ability.';
      if (formData.techCompleteApps === 0)
      return 'Please rate your ability to build a complete application.';
      if (formData.oopKnowledge === 0)
      return 'Please rate your Object-Oriented Programming knowledge.';
      if (formData.frontendBackendIntegration === 0)
      return 'Please rate your frontend and backend integration ability.';
      if (formData.sqlDatabaseSkill === 0)
      return 'Please rate your SQL and database skills.';
      if (formData.dataManipulation === 0)
      return 'Please rate your data manipulation ability.';
      if (formData.technicalProblemAnalysis === 0)
      return 'Please rate your technical problem analysis ability.';
      if (formData.techLearnNewTech === 0)
      return 'Please rate your ability to learn new technologies independently.';
    }
    if (step === 3) {
      if (!formData.numberOfProjects)
      return 'Please enter the number of projects completed.';
      if (!formData.highestProjectLevel)
      return 'Please select your highest project level.';
      if (!formData.ictWorkExperience)
      return 'Please indicate whether you have ICT-related work experience.';
      if (!formData.workExperienceDuration)
      return 'Please select your work experience duration.';
      if (!formData.hackathonParticipation)
      return 'Please select your hackathon participation.';
      if (!formData.workshopSeminarParticipation)
      return 'Please select your workshop and seminar participation.';
      if (!formData.clubParticipation)
      return 'Please indicate your club participation.';
      if (!formData.weeklyExtracurricularHours)
      return 'Please select your weekly extracurricular hours.';
    }
    if (step === 4) {
      if (!formData.ictCertifications)
      return 'Please enter the number of certifications completed.';
      if (formData.cvPortfolioReadiness === 0)
      return 'Please rate your CV / portfolio readiness.';
      if (!formData.linkedinAvailable)
      return 'Please indicate your LinkedIn profile availability.';
      if (!formData.githubAvailable)
      return 'Please indicate your GitHub / portfolio availability.';
      if (formData.jobApplicationActivity === 0)
      return 'Please rate your job application activity.';
    }
    if (step === 5) {
      if (formData.softCommunication === 0)
      return 'Please rate your communication ability.';
      if (formData.softTeamwork === 0)
      return 'Please rate your teamwork / collaboration.';
      if (!formData.leadershipResponsibility)
      return 'Please select your highest leadership responsibility.';
      if (formData.groupDiscussionParticipation === 0)
      return 'Please rate your group discussion participation.';
      if (formData.technicalCommunication === 0)
      return 'Please rate your technical communication ability.';
      if (formData.meetingDeadlines === 0)
      return 'Please rate your ability to meet deadlines.';
      if (formData.softInitiative === 0)
      return 'Please rate your initiative in projects.';
      if (formData.adaptability === 0)
      return 'Please rate your adaptability.';
      if (formData.presentationConfidence === 0)
      return 'Please rate your presentation confidence.';
      if (formData.extracurricularInvolvement === 0)
      return 'Please rate your extracurricular involvement.';
    }
    return null;
  };
  const handleNext = () => {
    const error = validateStep(currentStep);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError(null);
    setCurrentStep((s) => Math.min(s + 1, 5));
  };
  const handleBack = () => {
    setStepError(null);
    setCurrentStep((s) => Math.max(s - 1, 1));
  };
  const handlePredict = async () => {
    const error = validateStep(5);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError(null);
    setIsLoading(true);
    try {
      const data = await predictEmploymentReadiness(formData);
      onResult(data);
    } catch (predictionError) {
      setStepError(
        predictionError instanceof Error
          ? predictionError.message
          : 'The prediction could not be completed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 font-['Inter']">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <BrainCircuitIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm leading-none">
                EmpReady AI
              </div>
              <div className="text-xs text-blue-600 font-semibold tracking-wider">
                EMPLOYMENT READINESS ASSESSMENT
              </div>
            </div>
          </div>
          <button
            onClick={onHome}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium border border-slate-200 px-4 py-2 rounded-full transition-colors">

            <HomeIcon className="w-3.5 h-3.5" />
            Home
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            Employment Readiness Assessment
          </h1>
          <p className="text-slate-500 text-sm">
            Step {currentStep} of 5 — Complete all sections to receive your
            prediction
          </p>
        </div>

        <StepIndicator current={currentStep} />

        {/* ── STEP 1: Academic Performance ── */}
        {currentStep === 1 &&
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">1</span>
              </div>
              <div>
                <h2 className="font-bold text-slate-900">
                  Academic Performance
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Your core academic results — the strongest predictors of
                  employability
                </p>
              </div>
            </div>
            <div className="px-8 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                label="Final Degree GPA"
                value={formData.finalGpa}
                onChange={(v) => update('finalGpa', v)}
                type="number"
                placeholder="e.g. 3.65"
                min="0"
                max="4"
                step="0.01"
                hint="Out of 4.0" />

                <InputField
                label="GPA at End of Third Year"
                value={formData.gpaYear3}
                onChange={(v) => update('gpaYear3', v)}
                type="number"
                placeholder="e.g. 3.50"
                min="0"
                max="4"
                step="0.01"
                hint="Out of 4.0" />

                <SelectField
                label="Year of Graduation"
                value={formData.yearOfGraduation}
                onChange={(v) => update('yearOfGraduation', v)}
                options={[
                {
                  value: '2020',
                  label: '2020'
                },
                {
                  value: '2021',
                  label: '2021'
                },
                {
                  value: '2022',
                  label: '2022'
                },
                {
                  value: '2023',
                  label: '2023'
                },
                {
                  value: '2024',
                  label: '2024'
                },
                {
                  value: '2025',
                  label: '2025'
                }]
                }
                placeholder="Select year..." />

                <SelectField
                label="What is your gender?"
                value={formData.gender}
                onChange={(v) => update('gender', v)}
                options={[{ value: 'Female', label: 'Female' }, { value: 'Male', label: 'Male' }]} />

                <SelectField
                label="What type of school did you attend?"
                value={formData.schoolType}
                onChange={(v) => update('schoolType', v)}
                options={[{ value: 'National', label: 'National' }, { value: 'Private', label: 'Private' }, { value: 'Provincial', label: 'Provincial' }]} />

                <SelectField
                label="What is your university batch?"
                value={formData.batch}
                onChange={(v) => update('batch', v)}
                options={[{ value: 'BATCH 18/19', label: 'BATCH 18/19' }, { value: 'BATCH 19/20', label: 'BATCH 19/20' }, { value: 'BATCH 20/21', label: 'BATCH 20/21' }]} />

              </div>
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="font-bold text-slate-900 mb-1">Academic Subject Grades</h3>
                <p className="text-xs text-slate-400 mb-5">Select the numeric grade value used by the prediction model for each subject.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {SUBJECT_FIELDS.map(({ field, label }) =>
                  <SelectField
                    key={field}
                    label={label}
                    value={String(formData[field] || '')}
                    onChange={(value) => update(field, value)}
                    options={GRADE_OPTIONS}
                    placeholder="Select grade..." />
                  )}
                </div>
              </div>
            </div>
            <div className="px-8 py-5 border-t border-slate-100 flex flex-col items-end gap-2">
              {stepError &&
            <p className="text-xs text-red-500 font-medium self-stretch text-right">
                  {stepError}
                </p>
            }
              <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-blue-200">

                Next: Technical Skills
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        }

        {/* ── STEP 2: Technical Skill Readiness ── */}
        {currentStep === 2 &&
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">2</span>
              </div>
              <div>
                <h2 className="font-bold text-slate-900">
                  Technical Skill Readiness
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Rate from 1 (Very Low) to 5 (Very High)
                </p>
              </div>
            </div>
            <div className="px-8 py-6">
              <div className="flex justify-end mb-2">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) =>
                <div
                  key={n}
                  className="w-9 text-center text-xs font-bold text-slate-400">

                      {n}
                    </div>
                )}
                  <div className="w-14" />
                </div>
              </div>
              <RatingScale
              label="Ability to write programs"
              value={formData.techWritePrograms}
              onChange={(v) => update('techWritePrograms', v)} />

              <RatingScale
              label="Understanding programming fundamentals"
              value={formData.techProgrammingFundamentals}
              onChange={(v) => update('techProgrammingFundamentals', v)} />

              <RatingScale
              label="How would you rate your Object-Oriented Programming (OOP) knowledge?"
              value={formData.oopKnowledge}
              onChange={(v) => update('oopKnowledge', v)} />

              <RatingScale
              label="Debugging ability"
              value={formData.techDebugging}
              onChange={(v) => update('techDebugging', v)} />

              <RatingScale
              label="Ability to build a complete application"
              value={formData.techCompleteApps}
              onChange={(v) => update('techCompleteApps', v)} />

              <RatingScale
              label="How would you rate your ability to integrate frontend and backend systems?"
              value={formData.frontendBackendIntegration}
              onChange={(v) => update('frontendBackendIntegration', v)} />

              <RatingScale
              label="How would you rate your SQL and database skills?"
              value={formData.sqlDatabaseSkill}
              onChange={(v) => update('sqlDatabaseSkill', v)} />

              <RatingScale
              label="How would you rate your ability to manipulate and process data?"
              value={formData.dataManipulation}
              onChange={(v) => update('dataManipulation', v)} />

              <RatingScale
              label="How would you rate your ability to analyze technical problems?"
              value={formData.technicalProblemAnalysis}
              onChange={(v) => update('technicalProblemAnalysis', v)} />

              <RatingScale
              label="Ability to learn new technologies independently"
              value={formData.techLearnNewTech}
              onChange={(v) => update('techLearnNewTech', v)} />

            </div>
            <div className="px-8 py-5 border-t border-slate-100 flex flex-col gap-2">
              {stepError &&
            <p className="text-xs text-red-500 font-medium text-right">
                  {stepError}
                </p>
            }
              <div className="flex justify-between">
                <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium border border-slate-200 px-5 py-2.5 rounded-full transition-colors">

                  <ArrowLeftIcon className="w-4 h-4" />
                  Back
                </button>
                <button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-blue-200">

                  Next: Projects
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        }

        {/* ── STEP 3: Practical Exposure & Projects ── */}
        {currentStep === 3 &&
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">3</span>
              </div>
              <div>
                <h2 className="font-bold text-slate-900">
                  Practical Exposure & Projects
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-world experience and project work are very strong
                  employability signals
                </p>
              </div>
            </div>
            <div className="px-8 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                label="Number of Projects Completed"
                value={formData.numberOfProjects}
                onChange={(v) => update('numberOfProjects', v)}
                type="number"
                placeholder="e.g. 4"
                min="0" />

                <SelectField
                label="Highest Project Level Completed"
                value={formData.highestProjectLevel}
                onChange={(v) => update('highestProjectLevel', v)}
                options={[
                {
                  value: 'individual',
                  label: 'Individual Assignment'
                },
                {
                  value: 'group',
                  label: 'Group Project'
                },
                {
                  value: 'fyp',
                  label: 'Final Year Project (FYP)'
                },
                {
                  value: 'industry',
                  label: 'Industry Collaboration'
                },
                {
                  value: 'published',
                  label: 'Published / Deployed System'
                }]
                } />

                <SelectField
                label="ICT-Related Work Experience"
                value={formData.ictWorkExperience}
                onChange={(v) => update('ictWorkExperience', v)}
                options={[
                {
                  value: 'yes',
                  label: 'Yes'
                },
                {
                  value: 'no',
                  label: 'No'
                }]
                } />

                <SelectField
                label="How long is your ICT-related work experience?"
                value={formData.workExperienceDuration}
                onChange={(v) => update('workExperienceDuration', v)}
                options={[{ value: 'Less than 3 Months', label: 'Less than 3 Months' }, { value: '3-6 Months', label: '3-6 Months' }, { value: 'More than 6 Months', label: 'More than 6 Months' }]} />

                <SelectField
                label="How many hackathons have you participated in?"
                value={formData.hackathonParticipation}
                onChange={(v) => update('hackathonParticipation', v)}
                options={[{ value: '1-2', label: '1-2' }, { value: '3-4', label: '3-4' }, { value: 'More than 4', label: 'More than 4' }]} />

                <SelectField
                label="How frequently have you participated in ICT workshops or seminars?"
                value={formData.workshopSeminarParticipation}
                onChange={(v) => update('workshopSeminarParticipation', v)}
                options={[{ value: '1-2', label: '1-2' }, { value: '3-4', label: '3-4' }, { value: 'More than 4', label: 'More than 4' }]} />

                <SelectField
                label="Have you participated in university clubs or societies?"
                value={formData.clubParticipation}
                onChange={(v) => update('clubParticipation', v)}
                options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]} />

                <SelectField
                label="How many hours per week do you spend on extracurricular activities?"
                value={formData.weeklyExtracurricularHours}
                onChange={(v) => update('weeklyExtracurricularHours', v)}
                options={[{ value: 'Less than 2 Hours', label: 'Less than 2 Hours' }, { value: '2-5 Hours', label: '2-5 Hours' }, { value: 'More than 5 Hours', label: 'More than 5 Hours' }]} />

              </div>
            </div>
            <div className="px-8 py-5 border-t border-slate-100 flex flex-col gap-2">
              {stepError &&
            <p className="text-xs text-red-500 font-medium text-right">
                  {stepError}
                </p>
            }
              <div className="flex justify-between">
                <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium border border-slate-200 px-5 py-2.5 rounded-full transition-colors">

                  <ArrowLeftIcon className="w-4 h-4" />
                  Back
                </button>
                <button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-blue-200">

                  Next: Career Readiness
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        }

        {/* ── STEP 4: Professional & Career Readiness ── */}
        {currentStep === 4 &&
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">4</span>
              </div>
              <div>
                <h2 className="font-bold text-slate-900">
                  Professional & Career Readiness
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Certifications, CV quality, and professional online presence
                </p>
              </div>
            </div>
            <div className="px-8 py-6 space-y-6">
              <InputField
              label="Certifications Completed"
              value={formData.ictCertifications}
              onChange={(v) => update('ictCertifications', v)}
              type="number"
              placeholder="e.g. 2"
              min="0"
              hint="e.g. AWS, Google, Microsoft, CompTIA" />


              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">
                  CV / Portfolio Readiness
                </p>
                <RatingScale
                label="How polished and ready is your CV / portfolio?"
                value={formData.cvPortfolioReadiness}
                onChange={(v) => update('cvPortfolioReadiness', v)} />

              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">
                  Job Application Activity
                </p>
                <RatingScale
                label="How actively are you currently applying for jobs or internships?"
                value={formData.jobApplicationActivity}
                onChange={(v) => update('jobApplicationActivity', v)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <SelectField
                label="LinkedIn Profile Available"
                value={formData.linkedinAvailable}
                onChange={(v) => update('linkedinAvailable', v)}
                options={[
                {
                  value: 'yes_active',
                  label: 'Yes, active and updated'
                },
                {
                  value: 'yes_inactive',
                  label: 'Yes, but not updated'
                },
                {
                  value: 'no',
                  label: 'No'
                }]
                } />

                <SelectField
                label="GitHub / Portfolio Available"
                value={formData.githubAvailable}
                onChange={(v) => update('githubAvailable', v)}
                options={[
                {
                  value: 'yes_active',
                  label: 'Yes, with projects'
                },
                {
                  value: 'yes_empty',
                  label: 'Yes, but empty'
                },
                {
                  value: 'no',
                  label: 'No'
                }]
                } />

              </div>
            </div>
            <div className="px-8 py-5 border-t border-slate-100 flex flex-col gap-2">
              {stepError &&
            <p className="text-xs text-red-500 font-medium text-right">
                  {stepError}
                </p>
            }
              <div className="flex justify-between">
                <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium border border-slate-200 px-5 py-2.5 rounded-full transition-colors">

                  <ArrowLeftIcon className="w-4 h-4" />
                  Back
                </button>
                <button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-blue-200">

                  Next: Soft Skills
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        }

        {/* ── STEP 5: Soft Skills ── */}
        {currentStep === 5 &&
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">5</span>
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Soft Skills</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Rate from 1 (Very Low) to 5 (Very High)
                </p>
              </div>
            </div>
            <div className="px-8 py-6">
              <SelectField
              label="What is the highest leadership responsibility you have held?"
              value={formData.leadershipResponsibility}
              onChange={(v) => update('leadershipResponsibility', v)}
              options={[{ value: 'Team Member', label: 'Team Member' }, { value: 'Coordinator', label: 'Coordinator' }, { value: 'Executive Member', label: 'Executive Member' }, { value: 'President/Chairperson', label: 'President/Chairperson' }]} />

              <div className="flex justify-end mb-2">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) =>
                <div
                  key={n}
                  className="w-9 text-center text-xs font-bold text-slate-400">

                      {n}
                    </div>
                )}
                  <div className="w-14" />
                </div>
              </div>
              <RatingScale
              label="Communication ability"
              value={formData.softCommunication}
              onChange={(v) => update('softCommunication', v)} />

              <RatingScale
              label="Teamwork / collaboration"
              value={formData.softTeamwork}
              onChange={(v) => update('softTeamwork', v)} />

              <RatingScale
              label="How would you rate your participation in group discussions?"
              value={formData.groupDiscussionParticipation}
              onChange={(v) => update('groupDiscussionParticipation', v)} />

              <RatingScale
              label="How would you rate your ability to communicate technical concepts?"
              value={formData.technicalCommunication}
              onChange={(v) => update('technicalCommunication', v)} />

              <RatingScale
              label="How would you rate your ability to meet project/task deadlines?"
              value={formData.meetingDeadlines}
              onChange={(v) => update('meetingDeadlines', v)} />

              <RatingScale
              label="Initiative in projects"
              value={formData.softInitiative}
              onChange={(v) => update('softInitiative', v)} />

              <RatingScale
              label="How would you rate your ability to adapt to new situations and technologies?"
              value={formData.adaptability}
              onChange={(v) => update('adaptability', v)} />

              <RatingScale
              label="How confident are you when presenting your ideas or projects?"
              value={formData.presentationConfidence}
              onChange={(v) => update('presentationConfidence', v)} />

              <RatingScale
              label="How would you rate your involvement in extracurricular activities?"
              value={formData.extracurricularInvolvement}
              onChange={(v) => update('extracurricularInvolvement', v)} />

            </div>
            <div className="px-8 py-5 border-t border-slate-100 flex flex-col gap-2">
              {stepError &&
            <p className="text-xs text-red-500 font-medium text-right">
                  {stepError}
                </p>
            }
              <div className="flex justify-between">
                <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium border border-slate-200 px-5 py-2.5 rounded-full transition-colors">

                  <ArrowLeftIcon className="w-4 h-4" />
                  Back
                </button>
                <button
                onClick={handlePredict}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold px-8 py-3 rounded-full flex items-center gap-2.5 transition-colors shadow-lg shadow-blue-200">

                  {isLoading ?
                <>
                      <LoaderIcon className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </> :

                <>
                      <BrainCircuitIcon className="w-4 h-4" />
                      Predict Employability
                    </>
                }
                </button>
              </div>
            </div>
          </div>
        }
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12 py-6">
        <div className="max-w-3xl mx-auto px-6 text-center text-xs text-slate-400">
          Employment Readiness Prediction System — Research Project © 2024 •
          Powered by XGBoost + Fuzzy Logic
        </div>
      </footer>
    </div>);

}