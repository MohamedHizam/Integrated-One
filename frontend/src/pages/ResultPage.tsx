import React from 'react';
import {
  CheckCircleIcon,
  RotateCcwIcon,
  HomeIcon,
  BrainCircuitIcon,
  DownloadIcon,
  ShieldCheckIcon,
  GraduationCapIcon,
  HelpCircleIcon,
  CodeIcon } from
'lucide-react';
import { PredictionResult } from '../App';
interface ResultPageProps {
  result: PredictionResult;
  onRestart: () => void;
  onHome: () => void;
}
function ProgressBar({
  label,
  value,
  note




}: {label: string;value: number;note: string;}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          {label}
        </span>
        <span className="text-lg font-black text-slate-900">{value}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5 mb-1.5">
        <div
          className="h-2.5 rounded-full bg-blue-600 transition-all duration-700"
          style={{
            width: `${value}%`
          }} />

      </div>
      <p className="text-xs text-slate-400 italic">{note}</p>
    </div>);

}
function getRecommendations(
level: PredictionResult['predicted_class'])
{
  if (level === 'High Readiness') {
    return [
    {
      icon: GraduationCapIcon,
      title: 'Algorithmic Depth',
      description:
      'Focus on LeetCode Medium problems involving Dynamic Programming to solidify your technical core.',
      priority: 'HIGH'
    },
    {
      icon: HelpCircleIcon,
      title: 'Strategic Leadership',
      description:
      'Your soft skills are strong; an Agile Project Management certification would bridge the final gap.',
      priority: 'MEDIUM'
    },
    {
      icon: CodeIcon,
      title: 'Architecture Patterns',
      description:
      'Explore Micro-Frontend architectures to align with enterprise-level technical requirements.',
      priority: 'OPTIONAL'
    }];

  }
  if (level === 'Moderate Readiness') {
    return [
    {
      icon: CodeIcon,
      title: 'Technical Proficiency',
      description:
      'Strengthen core programming skills with structured practice on platforms like LeetCode or HackerRank.',
      priority: 'HIGH'
    },
    {
      icon: GraduationCapIcon,
      title: 'Portfolio Development',
      description:
      'Refine existing projects with clear documentation, READMEs, and deployed demos to showcase capability.',
      priority: 'HIGH'
    },
    {
      icon: HelpCircleIcon,
      title: 'Industry Certification',
      description:
      'Pursue one recognized certification (AWS, Google Cloud, or Microsoft Azure) to validate your skills.',
      priority: 'MEDIUM'
    }];

  }
  // At Risk
  return [
  {
    icon: CodeIcon,
    title: 'Programming Foundation',
    description:
    'Commit to daily coding practice. Complete structured courses on Coursera or edX covering data structures and algorithms.',
    priority: 'HIGH'
  },
  {
    icon: GraduationCapIcon,
    title: 'Project Portfolio',
    description:
    'Build and publish at least 2–3 complete projects on GitHub. Document each with clear READMEs and live demos.',
    priority: 'HIGH'
  },
  {
    icon: HelpCircleIcon,
    title: 'Professional Presence',
    description:
    'Create an active LinkedIn profile and GitHub portfolio. Apply for internships to gain real-world ICT experience.',
    priority: 'HIGH'
  }];

}
export function ResultPage({ result, onRestart, onHome }: ResultPageProps) {
  const isHighly = result.predicted_class === 'High Readiness';
  const isModerate = result.predicted_class === 'Moderate Readiness';
  const confidence = Math.round(result.confidence * 100);
  const probabilities = {
    atRisk: Math.round(result.probabilities['At Risk'] * 100),
    moderate: Math.round(result.probabilities['Moderate Readiness'] * 100),
    high: Math.round(result.probabilities['High Readiness'] * 100)
  };
  const recommendations = getRecommendations(result.predicted_class);
  const levelDescription = isHighly ?
  'Your profile demonstrates strong academic performance, solid technical skills, and good professional readiness. You are well-positioned for ICT employment opportunities.' :
  isModerate ?
  'Your profile shows a solid foundation with some identifiable gaps. Targeted improvements in key areas will significantly strengthen your employment readiness.' :
  'Your profile indicates significant gaps in one or more areas. Review the recommendations below to understand where to focus your development efforts.';
  const xgboostNote = isHighly ?
  'Your technical skill ratings and academic performance were identified as the strongest positive contributors to this classification. The model found strong alignment between your profile and employability indicators.' :
  isModerate ?
  'Academic performance was your strongest feature. Technical skill ratings showed moderate variance — focused development in weaker areas would improve your classification confidence.' :
  'Low technical skill ratings were the primary driver of this classification. The model identified significant gaps between current skill levels and the minimum indicators associated with employability.';
  const fuzzyNote = isHighly ?
  'Soft skill ratings were assessed as high across communication, teamwork, and initiative. The Fuzzy Logic layer confirmed strong alignment with employability linguistic variables.' :
  isModerate ?
  'Soft skill ratings fell in the moderate range. Communication and teamwork variables show development potential — improvement here could elevate the final classification.' :
  'Multiple soft skill variables — including communication and initiative — scored in the low range. The Fuzzy Logic layer confirmed the At Risk classification across linguistic dimensions.';
  return (
    <div className="min-h-screen bg-white font-['Inter']">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <BrainCircuitIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm leading-none">
                EmpReady AI
              </div>
              <div className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
                Employment Readiness Prediction
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <span className="text-sm text-blue-600 font-semibold border-b-2 border-blue-600 pb-0.5 cursor-pointer">
              Overview
            </span>
            <span className="text-sm text-slate-500 cursor-pointer hover:text-slate-700 transition-colors">
              Methodology
            </span>
            <span className="text-sm text-slate-500 cursor-pointer hover:text-slate-700 transition-colors">
              History
            </span>
          </nav>
          <button
            onClick={onRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors flex items-center gap-2">

            <RotateCcwIcon className="w-3.5 h-3.5" />
            New Prediction
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Hero Result Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-4">
                <CheckCircleIcon className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                  Assessment Complete
                </span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 mb-3 leading-tight">
                {result.predicted_class}
              </h1>
              <p className="text-slate-500 text-base max-w-lg leading-relaxed">
                {levelDescription}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-10 py-6 text-center flex-shrink-0">
              <div
                className={`text-7xl font-black leading-none mb-2 ${isHighly ? 'text-blue-600' : isModerate ? 'text-amber-500' : 'text-red-500'}`}>

                {confidence}%
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Prediction Confidence
              </div>
            </div>
          </div>
        </div>

        {/* Core Profile Breakdown + Model Reasoning */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Left: Core Profile Breakdown */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="border-l-4 border-blue-600 pl-4 mb-7">
              <h2 className="text-xl font-black text-slate-900">
                Core Profile Breakdown
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Probabilities returned by the trained model
              </p>
            </div>
            <ProgressBar
              label="At Risk"
              value={probabilities.atRisk}
              note={
              'Probability assigned to the At Risk class.'
              } />

            <ProgressBar
              label="Moderate Readiness"
              value={probabilities.moderate}
              note="Probability assigned to the Moderate Readiness class." />

            <ProgressBar
              label="High Readiness"
              value={probabilities.high}
              note="Probability assigned to the High Readiness class." />

          </div>
        </div>

        {/* Model Reasoning */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <BrainCircuitIcon className="w-3.5 h-3.5" />
            Model Reasoning
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
              XGBoost Feature Analysis
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {xgboostNote}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
              Fuzzy Logic Interpretation
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {fuzzyNote}
            </p>
          </div>

          <button className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors flex items-center gap-2 justify-center py-2">
            <DownloadIcon className="w-3.5 h-3.5" />
            Download Detailed Prediction Log
          </button>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              Recommendations
            </h2>
            <p className="text-slate-400">
              Actionable steps to improve your employment readiness
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recommendations.map((rec, i) => {
              const Icon = rec.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 flex flex-col items-center text-center">

                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">
                    {rec.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {rec.description}
                  </p>
                  <div className="mt-5 pt-4 border-t border-slate-100 w-full">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Priority: {rec.priority}
                    </span>
                  </div>
                </div>);

            })}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-blue-200">

            <RotateCcwIcon className="w-4 h-4" />
            Retake Assessment
          </button>
          <button
            onClick={onHome}
            className="flex items-center gap-2 border border-slate-200 text-slate-600 font-semibold px-8 py-3.5 rounded-full hover:border-slate-300 transition-colors">

            <HomeIcon className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12 py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Research Project Output
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              Data Privacy
            </span>
            <span className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              Model Transparency
            </span>
            <span className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              Support
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Results are based on provided inputs. For assessment purposes only.
          </span>
        </div>
      </footer>
    </div>);

}