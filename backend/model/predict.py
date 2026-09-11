
import os
import joblib
import numpy as np
import pandas as pd
import skfuzzy.control as ctrl


# ============================================================
# LOAD DEPLOYMENT ARTIFACTS
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(
    os.path.join(BASE_DIR, "hybrid_fuzzy_xgboost_model.pkl")
)

label_encoder = joblib.load(
    os.path.join(BASE_DIR, "employment_readiness_label_encoder.pkl")
)

config = joblib.load(
    os.path.join(BASE_DIR, "complete_deployment_config.pkl")
)

fuzzy_systems = joblib.load(
    os.path.join(BASE_DIR, "fuzzy_systems.pkl")
)


# ============================================================
# CONFIGURATION
# ============================================================

required_features = config["required_features"]

hybrid_features = config["hybrid_features"]

ordinal_mappings = config["ordinal_mappings"]

nominal_columns = config["nominal_columns"]

fuzzy_features = config["fuzzy_features"]

class_names = config["class_names"]


academic_system = fuzzy_systems["academic_system"]
technical_system = fuzzy_systems["technical_system"]
soft_skill_system = fuzzy_systems["soft_skill_system"]
professional_system = fuzzy_systems["professional_system"]


# ============================================================
# FUZZY CATEGORICAL MAPPINGS
# ============================================================

PROJECT_COUNT_MAP = {
    "1-2": 1,
    "3-4": 3,
    "More than 4": 5
}

ICT_WORK_EXPERIENCE_MAP = {
    "No": 1,
    "Yes": 5
}

WORK_EXPERIENCE_DURATION_MAP = {
    "Less than 3 Months": 1,
    "3-6 Months": 3,
    "More than 6 Months": 5
}

CERTIFICATION_STATUS_MAP = {
    "1-2": 1,
    "3-4": 3,
    "More than 4": 5
}

HACKATHON_PARTICIPATION_MAP = {
    "1-2": 1,
    "3-4": 3,
    "More than 4": 5
}

WORKSHOP_SEMINAR_MAP = {
    "1-2": 1,
    "3-4": 3,
    "More than 4": 5
}

CLUB_PARTICIPATION_MAP = {
    "No": 1,
    "Yes": 5
}

WEEKLY_EXTRACURRICULAR_HOURS_MAP = {
    "Less than 2 Hours": 1,
    "2-5 Hours": 3,
    "More than 5 Hours": 5
}

HIGHEST_PROJECT_LEVEL_MAP = {
    "Academic Assignment": 1,
    "Personal Project": 2,
    "Research Project": 4,
    "Industry-Based Project": 5
}

LEADERSHIP_RESPONSIBILITY_MAP = {
    "Team Member": 2,
    "Coordinator": 3,
    "Executive Member": 4,
    "President/Chairperson": 5
}


# ============================================================
# PREDICTION FUNCTION
# ============================================================

def predict_employment_readiness(student_data):

    # --------------------------------------------------------
    # Convert input to DataFrame
    # --------------------------------------------------------

    input_df = pd.DataFrame([student_data])

    # --------------------------------------------------------
    # Check required features
    # --------------------------------------------------------

    missing_features = [
        feature
        for feature in required_features
        if feature not in input_df.columns
    ]

    if missing_features:
        raise ValueError(
            "Missing required features: "
            + ", ".join(missing_features)
        )

    # Keep only required raw features
    input_df = input_df[required_features].copy()

    # --------------------------------------------------------
    # Create fuzzy input data
    # --------------------------------------------------------

    fuzzy_data = input_df.copy()

    # Project count
    fuzzy_data["Project_Count_Score"] = fuzzy_data[
        "Project_Count"
    ].map(PROJECT_COUNT_MAP)

    # ICT work experience
    fuzzy_data["ICT_Work_Experience_Score"] = fuzzy_data[
        "ICT_Work_Experience"
    ].map(ICT_WORK_EXPERIENCE_MAP)

    # Work experience duration
    fuzzy_data["Work_Experience_Duration_Score"] = fuzzy_data[
        "Work_Experience_Duration"
    ].map(WORK_EXPERIENCE_DURATION_MAP)

    # Certification status
    fuzzy_data["Certification_Status_Score"] = fuzzy_data[
        "Certification_Status"
    ].map(CERTIFICATION_STATUS_MAP)

    # Hackathon participation
    fuzzy_data["Hackathon_Participation_Score"] = fuzzy_data[
        "Hackathon_Participation"
    ].map(HACKATHON_PARTICIPATION_MAP)

    # Workshop / seminar participation
    fuzzy_data["Workshop_Seminar_Score"] = fuzzy_data[
        "Workshop_Seminar_Participation"
    ].map(WORKSHOP_SEMINAR_MAP)

    # Club participation
    fuzzy_data["Club_Participation_Score"] = fuzzy_data[
        "Club_Participation"
    ].map(CLUB_PARTICIPATION_MAP)

    # Weekly extracurricular hours
    fuzzy_data["Weekly_Extracurricular_Hours_Score"] = fuzzy_data[
        "Weekly_Extracurricular_Hours"
    ].map(WEEKLY_EXTRACURRICULAR_HOURS_MAP)

    # Highest project level
    fuzzy_data["Highest_Project_Level_Score"] = fuzzy_data[
        "Highest_Project_Level"
    ].map(HIGHEST_PROJECT_LEVEL_MAP)

    # Leadership responsibility
    fuzzy_data["Leadership_Responsibility_Score"] = fuzzy_data[
        "Leadership_Responsibility"
    ].map(LEADERSHIP_RESPONSIBILITY_MAP)

    # --------------------------------------------------------
    # Validate fuzzy mappings
    # --------------------------------------------------------

    fuzzy_score_columns = [
        "Project_Count_Score",
        "ICT_Work_Experience_Score",
        "Work_Experience_Duration_Score",
        "Certification_Status_Score",
        "Hackathon_Participation_Score",
        "Workshop_Seminar_Score",
        "Club_Participation_Score",
        "Weekly_Extracurricular_Hours_Score",
        "Highest_Project_Level_Score",
        "Leadership_Responsibility_Score"
    ]

    if fuzzy_data[fuzzy_score_columns].isnull().any().any():
        missing_mapping_columns = fuzzy_data[
            fuzzy_score_columns
        ].columns[
            fuzzy_data[fuzzy_score_columns].isnull().any()
        ].tolist()

        raise ValueError(
            "Invalid categorical value found in: "
            + ", ".join(missing_mapping_columns)
        )

    # --------------------------------------------------------
    # Calculate fuzzy dimension input scores
    # --------------------------------------------------------

    # Academic
    fuzzy_data["Academic_Input_Score"] = fuzzy_data[
        [
            "Third_Year_GPA",
            "Final_Degree_GPA"
        ]
    ].mean(axis=1)

    # Technical
    technical_features = [
        "Programming_Ability",
        "OOP_Knowledge",
        "Debugging_Ability",
        "Application_Development",
        "Frontend_Backend_Integration",
        "SQL_Database_Skill",
        "Data_Manipulation",
        "Technical_Problem_Analysis",
        "Learning_New_Technologies"
    ]

    fuzzy_data["Technical_Input_Score"] = fuzzy_data[
        technical_features
    ].mean(axis=1)

    # Soft skills
    soft_skill_score_columns = [
        "Leadership_Responsibility_Score",
        "Group_Discussion_Participation",
        "Technical_Communication",
        "Meeting_Deadlines",
        "Initiative_Taking",
        "Adaptability",
        "Presentation_Confidence"
    ]

    fuzzy_data["Soft_Skill_Input_Score"] = fuzzy_data[
        soft_skill_score_columns
    ].mean(axis=1)

    # Professional
    professional_score_columns = [
        "Project_Count_Score",
        "Highest_Project_Level_Score",
        "ICT_Work_Experience_Score",
        "Work_Experience_Duration_Score",
        "Certification_Status_Score",
        "Hackathon_Participation_Score",
        "Workshop_Seminar_Score",
        "Club_Participation_Score",
        "Weekly_Extracurricular_Hours_Score",
        "Extracurricular_Involvement"
    ]

    fuzzy_data["Professional_Input_Score"] = fuzzy_data[
        professional_score_columns
    ].mean(axis=1)

    # --------------------------------------------------------
    # Generate fuzzy scores
    # --------------------------------------------------------

    # Academic
    sim = ctrl.ControlSystemSimulation(academic_system)
    sim.input["academic_input"] = fuzzy_data[
        "Academic_Input_Score"
    ].iloc[0]
    sim.compute()

    academic_fuzzy_score = sim.output[
        "academic_output"
    ]

    # Technical
    sim = ctrl.ControlSystemSimulation(technical_system)
    sim.input["technical_input"] = fuzzy_data[
        "Technical_Input_Score"
    ].iloc[0]
    sim.compute()

    technical_fuzzy_score = sim.output[
        "technical_output"
    ]

    # Soft skill
    sim = ctrl.ControlSystemSimulation(soft_skill_system)
    sim.input["soft_skill_input"] = fuzzy_data[
        "Soft_Skill_Input_Score"
    ].iloc[0]
    sim.compute()

    soft_skill_fuzzy_score = sim.output[
        "soft_skill_output"
    ]

    # Professional
    sim = ctrl.ControlSystemSimulation(professional_system)
    sim.input["professional_input"] = fuzzy_data[
        "Professional_Input_Score"
    ].iloc[0]
    sim.compute()

    professional_fuzzy_score = sim.output[
        "professional_output"
    ]

    # --------------------------------------------------------
    # Add fuzzy features
    # --------------------------------------------------------

    fuzzy_data["Academic_Fuzzy_Score"] = academic_fuzzy_score
    fuzzy_data["Technical_Fuzzy_Score"] = technical_fuzzy_score
    fuzzy_data["Soft_Skill_Fuzzy_Score"] = soft_skill_fuzzy_score
    fuzzy_data["Professional_Fuzzy_Score"] = professional_fuzzy_score

    # --------------------------------------------------------
    # Prepare XGBoost input
    # --------------------------------------------------------

    model_data = fuzzy_data[required_features].copy()

    # Ordinal encoding
    for column, mapping in ordinal_mappings.items():

        if column in model_data.columns:

            model_data[column] = model_data[
                column
            ].map(mapping)

    # Nominal one-hot encoding
    model_data = pd.get_dummies(
        model_data,
        columns=nominal_columns,
        drop_first=True
    )

    # Add fuzzy features
    for feature in fuzzy_features:

        model_data[feature] = fuzzy_data[
            feature
        ].iloc[0]

    # --------------------------------------------------------
    # Exact training feature order
    # --------------------------------------------------------

    model_data = model_data.reindex(
        columns=hybrid_features,
        fill_value=0
    )

    # --------------------------------------------------------
    # Final validation
    # --------------------------------------------------------

    if model_data.shape[1] != len(hybrid_features):

        raise ValueError(
            f"Expected {len(hybrid_features)} features, "
            f"but received {model_data.shape[1]}"
        )

    if model_data.isnull().any().any():

        raise ValueError(
            "NaN values detected in model input."
        )

    # --------------------------------------------------------
    # Prediction
    # --------------------------------------------------------

    prediction_encoded = model.predict(
        model_data
    )[0]

    probabilities = model.predict_proba(
        model_data
    )[0]

    predicted_class = label_encoder.inverse_transform(
        [prediction_encoded]
    )[0]

    confidence = float(
        np.max(probabilities)
    )

    # --------------------------------------------------------
    # Return API-friendly result
    # --------------------------------------------------------

    return {
        "predicted_class": predicted_class,
        "confidence": confidence,
        "probabilities": {
            class_name: float(probability)
            for class_name, probability in zip(
                label_encoder.classes_,
                probabilities
            )
        }
    }
