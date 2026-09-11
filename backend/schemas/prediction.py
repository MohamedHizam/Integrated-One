from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


Rating = int
CountBand = Literal["1-2", "3-4", "More than 4"]
YesNo = Literal["Yes", "No"]


class EmploymentReadinessRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ict_1305: float = Field(alias="ICT 1305")
    ict_1209: float = Field(alias="ICT 1209")
    ict_2207: float = Field(alias="ICT 2207")
    ict_2308: float = Field(alias="ICT 2308")
    ict_3201: float = Field(alias="ICT 3201")
    ict_3312: float = Field(alias="ICT 3312")
    ict_4205: float = Field(alias="ICT 4205")
    ict_1108: float = Field(alias="ICT 1108")
    ict_2212: float = Field(alias="ICT 2212")
    ict_3206: float = Field(alias="ICT 3206")
    cmt_1205: float = Field(alias="CMT 1205")
    cmt_1209: float = Field(alias="CMT 1209")
    ict_2109: float = Field(alias="ICT 2109")
    cml_1203: float = Field(alias="CML 1203")
    cml_4201: float = Field(alias="CML 4201")
    batch: Literal["BATCH 18/19", "BATCH 19/20", "BATCH 20/21"] = Field(alias="Batch")
    graduation_year: int = Field(alias="Graduation_Year")
    third_year_gpa: float = Field(alias="Third_Year_GPA", ge=2, le=4)
    final_degree_gpa: float = Field(alias="Final_Degree_GPA", ge=2, le=4)
    school_type: Literal["National", "Private", "Provincial"] = Field(alias="School_Type")
    gender: Literal["Female", "Male"] = Field(alias="Gender")
    programming_ability: Rating = Field(alias="Programming_Ability", ge=1, le=5)
    oop_knowledge: Rating = Field(alias="OOP_Knowledge", ge=1, le=5)
    debugging_ability: Rating = Field(alias="Debugging_Ability", ge=1, le=5)
    application_development: Rating = Field(alias="Application_Development", ge=1, le=5)
    frontend_backend_integration: Rating = Field(alias="Frontend_Backend_Integration", ge=1, le=5)
    sql_database_skill: Rating = Field(alias="SQL_Database_Skill", ge=1, le=5)
    data_manipulation: Rating = Field(alias="Data_Manipulation", ge=1, le=5)
    technical_problem_analysis: Rating = Field(alias="Technical_Problem_Analysis", ge=1, le=5)
    learning_new_technologies: Rating = Field(alias="Learning_New_Technologies", ge=1, le=5)
    project_count: CountBand = Field(alias="Project_Count")
    highest_project_level: Literal[
        "Academic Assignment", "Personal Project", "Research Project", "Industry-Based Project"
    ] = Field(alias="Highest_Project_Level")
    ict_work_experience: YesNo = Field(alias="ICT_Work_Experience")
    work_experience_duration: Literal[
        "Less than 3 Months", "3-6 Months", "More than 6 Months"
    ] = Field(alias="Work_Experience_Duration")
    certification_status: CountBand = Field(alias="Certification_Status")
    hackathon_participation: CountBand = Field(alias="Hackathon_Participation")
    workshop_seminar_participation: CountBand = Field(alias="Workshop_Seminar_Participation")
    club_participation: YesNo = Field(alias="Club_Participation")
    weekly_extracurricular_hours: Literal[
        "Less than 2 Hours", "2-5 Hours", "More than 5 Hours"
    ] = Field(alias="Weekly_Extracurricular_Hours")
    leadership_responsibility: Literal[
        "Team Member", "Coordinator", "Executive Member", "President/Chairperson"
    ] = Field(alias="Leadership_Responsibility")
    extracurricular_involvement: Rating = Field(alias="Extracurricular_Involvement", ge=1, le=5)
    group_discussion_participation: Rating = Field(alias="Group_Discussion_Participation", ge=1, le=5)
    technical_communication: Rating = Field(alias="Technical_Communication", ge=1, le=5)
    meeting_deadlines: Rating = Field(alias="Meeting_Deadlines", ge=1, le=5)
    initiative_taking: Rating = Field(alias="Initiative_Taking", ge=1, le=5)
    adaptability: Rating = Field(alias="Adaptability", ge=1, le=5)
    presentation_confidence: Rating = Field(alias="Presentation_Confidence", ge=1, le=5)
    cv_portfolio_readiness: Rating = Field(alias="CV_Portfolio_Readiness", ge=1, le=5)
    job_application_activity: Rating = Field(alias="Job_Application_Activity", ge=1, le=5)
    linkedin_availability: YesNo = Field(alias="LinkedIn_Availability")
    github_availability: YesNo = Field(alias="GitHub_Availability")

    def to_student_data(self) -> dict[str, object]:
        return self.model_dump(by_alias=True)