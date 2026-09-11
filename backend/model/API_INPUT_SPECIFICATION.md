# Employment Readiness Prediction API Input Specification

## Purpose

This API predicts an ICT student's employment-readiness class using the deployed Hybrid Fuzzy Logic + XGBoost model. The request contains the student's raw predictor values. The backend validates them, generates four fuzzy features, combines those features with the encoded predictors, and sends the resulting 63-feature vector to XGBoost.

The API requires exactly 51 raw predictor fields before preprocessing. The request schema uses `extra="forbid"`, so fields not listed in this document are rejected.

## Endpoint

| Item | Value |
| --- | --- |
| Method | `POST` |
| Path | `/predict/employment-readiness` |
| Content-Type | `application/json` |
| Request body | One JSON object containing all 51 raw fields below |
| Success response | JSON object containing `predicted_class`, `confidence`, and `probabilities` |

The root and health endpoints also exist, but they do not perform prediction: `GET /`, `GET /health`, and `GET /api/health`.

## Required Raw Inputs

The names below are the exact JSON aliases accepted by `EmploymentReadinessRequest` and the exact names in `complete_deployment_config.pkl`.

| # | Field name | Type | Kind | Allowed values or expected range | Description | Preprocessing |
|---:|---|---|---|---|---|---|
| 1 | `ICT 1305` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 2 | `ICT 1209` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 3 | `ICT 2207` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 4 | `ICT 2308` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 5 | `ICT 3201` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 6 | `ICT 3312` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 7 | `ICT 4205` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 8 | `ICT 1108` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 9 | `ICT 2212` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 10 | `ICT 3206` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 11 | `CMT 1205` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 12 | `CMT 1209` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 13 | `ICT 2109` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 14 | `CML 1203` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 15 | `CML 4201` | number | Numeric | No range constraint in the API schema | Course/academic input | Passed through unchanged |
| 16 | `Batch` | string | Categorical | `BATCH 18/19`, `BATCH 19/20`, `BATCH 20/21` | Student batch | One-hot encoded as configured nominal input |
| 17 | `Graduation_Year` | integer | Numeric | No range constraint in the API schema | Graduation year | Passed through unchanged |
| 18 | `Third_Year_GPA` | number | Numeric | $2 \leq x \leq 4$ | GPA at the end of the third year | Used unchanged in the academic fuzzy mean |
| 19 | `Final_Degree_GPA` | number | Numeric | $2 \leq x \leq 4$ | Final degree GPA | Used unchanged in the academic fuzzy mean |
| 20 | `School_Type` | string | Categorical | `National`, `Private`, `Provincial` | School type | One-hot encoded as configured nominal input |
| 21 | `Gender` | string | Categorical | `Female`, `Male` | Gender | One-hot encoded as configured nominal input |
| 22 | `Programming_Ability` | integer | Numeric | 1 through 5 | Ability to write programs | Passed through unchanged |
| 23 | `OOP_Knowledge` | integer | Numeric | 1 through 5 | Object-oriented programming knowledge | Passed through unchanged |
| 24 | `Debugging_Ability` | integer | Numeric | 1 through 5 | Debugging ability | Passed through unchanged |
| 25 | `Application_Development` | integer | Numeric | 1 through 5 | Application development ability | Passed through unchanged |
| 26 | `Frontend_Backend_Integration` | integer | Numeric | 1 through 5 | Frontend/backend integration ability | Passed through unchanged |
| 27 | `SQL_Database_Skill` | integer | Numeric | 1 through 5 | SQL/database skill | Passed through unchanged |
| 28 | `Data_Manipulation` | integer | Numeric | 1 through 5 | Data manipulation ability | Passed through unchanged |
| 29 | `Technical_Problem_Analysis` | integer | Numeric | 1 through 5 | Technical problem analysis | Passed through unchanged |
| 30 | `Learning_New_Technologies` | integer | Numeric | 1 through 5 | Ability to learn new technologies | Passed through unchanged |
| 31 | `Project_Count` | string | Categorical | `1-2`, `3-4`, `More than 4` | Number of projects | Fuzzy score: `1-2` -> 1, `3-4` -> 3, `More than 4` -> 5; model ordinal encoding: 1, 2, 3 respectively |
| 32 | `Highest_Project_Level` | string | Categorical | `Academic Assignment`, `Personal Project`, `Research Project`, `Industry-Based Project` | Highest project level | Fuzzy score: Academic Assignment -> 1, Personal Project -> 2, Research Project -> 4, Industry-Based Project -> 5; one-hot encoded for the model |
| 33 | `ICT_Work_Experience` | string | Categorical | `No`, `Yes` | ICT work experience | Fuzzy score: `No` -> 1, `Yes` -> 5; one-hot encoded for the model |
| 34 | `Work_Experience_Duration` | string | Categorical | `Less than 3 Months`, `3-6 Months`, `More than 6 Months` | Duration of work experience | Fuzzy score: 1, 3, 5 respectively; model ordinal encoding: 1, 2, 3 respectively |
| 35 | `Certification_Status` | string | Categorical | `1-2`, `3-4`, `More than 4` | Number of certifications | Fuzzy score: 1, 3, 5 respectively; model ordinal encoding: 1, 2, 3 respectively |
| 36 | `Hackathon_Participation` | string | Categorical | `1-2`, `3-4`, `More than 4` | Hackathon participation count band | Fuzzy score: 1, 3, 5 respectively; model ordinal encoding: 1, 2, 3 respectively |
| 37 | `Workshop_Seminar_Participation` | string | Categorical | `1-2`, `3-4`, `More than 4` | Workshop/seminar participation count band | Fuzzy score: 1, 3, 5 respectively; model ordinal encoding: 1, 2, 3 respectively |
| 38 | `Club_Participation` | string | Categorical | `No`, `Yes` | Club participation | Fuzzy score: `No` -> 1, `Yes` -> 5; one-hot encoded for the model |
| 39 | `Weekly_Extracurricular_Hours` | string | Categorical | `Less than 2 Hours`, `2-5 Hours`, `More than 5 Hours` | Weekly extracurricular hours band | Fuzzy score: 1, 3, 5 respectively; model ordinal encoding: 1, 2, 3 respectively |
| 40 | `Leadership_Responsibility` | string | Categorical | `Team Member`, `Coordinator`, `Executive Member`, `President/Chairperson` | Leadership responsibility level | Fuzzy score: Team Member -> 2, Coordinator -> 3, Executive Member -> 4, President/Chairperson -> 5; one-hot encoded for the model |
| 41 | `Extracurricular_Involvement` | integer | Numeric | 1 through 5 | Extracurricular involvement | Passed through unchanged and included in the professional fuzzy mean |
| 42 | `Group_Discussion_Participation` | integer | Numeric | 1 through 5 | Group discussion participation | Passed through unchanged and included in the soft-skill fuzzy mean |
| 43 | `Technical_Communication` | integer | Numeric | 1 through 5 | Technical communication | Passed through unchanged and included in the soft-skill fuzzy mean |
| 44 | `Meeting_Deadlines` | integer | Numeric | 1 through 5 | Meeting deadlines | Passed through unchanged and included in the soft-skill fuzzy mean |
| 45 | `Initiative_Taking` | integer | Numeric | 1 through 5 | Initiative taking | Passed through unchanged and included in the soft-skill fuzzy mean |
| 46 | `Adaptability` | integer | Numeric | 1 through 5 | Adaptability | Passed through unchanged and included in the soft-skill fuzzy mean |
| 47 | `Presentation_Confidence` | integer | Numeric | 1 through 5 | Presentation confidence | Passed through unchanged and included in the soft-skill fuzzy mean |
| 48 | `CV_Portfolio_Readiness` | integer | Numeric | 1 through 5 | CV/portfolio readiness | Passed through unchanged |
| 49 | `Job_Application_Activity` | integer | Numeric | 1 through 5 | Job application activity | Passed through unchanged |
| 50 | `LinkedIn_Availability` | string | Categorical | `No`, `Yes` | LinkedIn availability | One-hot encoded as configured nominal input; no separate fuzzy mapping is applied |
| 51 | `GitHub_Availability` | string | Categorical | `No`, `Yes` | GitHub availability | One-hot encoded as configured nominal input; no separate fuzzy mapping is applied |

### Grade and numeric conversion

No grade-to-numeric conversion is implemented in `predict.py`. The 15 course fields are numeric request values and are passed through unchanged. `Third_Year_GPA` and `Final_Degree_GPA` are numeric request values, validated between 2 and 4, and passed into the academic mean unchanged. The API schema does not define a grade-letter category or a course-grade mapping.

`Graduation_Year` is parsed as an integer by Pydantic and has no additional range constraint in the schema. Ratings are integers constrained to 1 through 5 by the schema. The six configured ordinal fields use the ordinal mappings shown in the table; the ten fuzzy categorical mappings are used only to calculate fuzzy dimension inputs.

## Fuzzy Logic Stage

`predict.py` computes four dimension inputs and runs the corresponding saved scikit-fuzzy control system:

- `Academic_Fuzzy_Score`: the academic system receives the mean of `Third_Year_GPA` and `Final_Degree_GPA`.
- `Technical_Fuzzy_Score`: the technical system receives the mean of the nine technical rating fields, `Programming_Ability` through `Learning_New_Technologies`.
- `Soft_Skill_Fuzzy_Score`: the soft-skill system receives the mean of `Leadership_Responsibility`'s fuzzy score plus `Group_Discussion_Participation`, `Technical_Communication`, `Meeting_Deadlines`, `Initiative_Taking`, `Adaptability`, and `Presentation_Confidence`.
- `Professional_Fuzzy_Score`: the professional system receives the mean of the ten values consisting of the fuzzy scores for project count, highest project level, ICT work experience, work-experience duration, certification status, hackathon participation, workshop/seminar participation, club participation, weekly extracurricular hours, and `Extracurricular_Involvement`.

The four generated fuzzy features are added to the preprocessed raw features. The resulting columns are reindexed to the exact `hybrid_features` list in `complete_deployment_config.pkl`, producing the confirmed 63-feature hybrid vector used by XGBoost.

## Prediction Classes and Response

The saved label encoder contains these actual classes:

- `At Risk`
- `High Readiness`
- `Moderate Readiness`

The backend returns `predicted_class`, not `prediction`. `confidence` is the maximum class probability as a decimal. `probabilities` is an object keyed by the three class names, with decimal probability values.

```json
{
  "predicted_class": "At Risk",
  "confidence": 0.7245,
  "probabilities": {
	"At Risk": 0.7245,
	"High Readiness": 0.0158,
	"Moderate Readiness": 0.2597
  }
}
```

## Complete Request Example

```json
{
  "ICT 1305": 3,
  "ICT 1209": 3,
  "ICT 2207": 3,
  "ICT 2308": 3,
  "ICT 3201": 3,
  "ICT 3312": 3,
  "ICT 4205": 3,
  "ICT 1108": 3,
  "ICT 2212": 3,
  "ICT 3206": 3,
  "CMT 1205": 3,
  "CMT 1209": 3,
  "ICT 2109": 3,
  "CML 1203": 3,
  "CML 4201": 3,
  "Batch": "BATCH 20/21",
  "Graduation_Year": 2025,
  "Third_Year_GPA": 3.5,
  "Final_Degree_GPA": 3.65,
  "School_Type": "National",
  "Gender": "Female",
  "Programming_Ability": 4,
  "OOP_Knowledge": 3,
  "Debugging_Ability": 4,
  "Application_Development": 4,
  "Frontend_Backend_Integration": 4,
  "SQL_Database_Skill": 3,
  "Data_Manipulation": 3,
  "Technical_Problem_Analysis": 4,
  "Learning_New_Technologies": 5,
  "Project_Count": "3-4",
  "Highest_Project_Level": "Research Project",
  "ICT_Work_Experience": "Yes",
  "Work_Experience_Duration": "3-6 Months",
  "Certification_Status": "1-2",
  "Hackathon_Participation": "1-2",
  "Workshop_Seminar_Participation": "3-4",
  "Club_Participation": "Yes",
  "Weekly_Extracurricular_Hours": "2-5 Hours",
  "Leadership_Responsibility": "Coordinator",
  "Extracurricular_Involvement": 4,
  "Group_Discussion_Participation": 4,
  "Technical_Communication": 4,
  "Meeting_Deadlines": 5,
  "Initiative_Taking": 4,
  "Adaptability": 4,
  "Presentation_Confidence": 4,
  "CV_Portfolio_Readiness": 4,
  "Job_Application_Activity": 3,
  "LinkedIn_Availability": "Yes",
  "GitHub_Availability": "Yes"
}
```

## cURL Example

```bash
curl -X POST "http://127.0.0.1:8000/predict/employment-readiness" \
  -H "Content-Type: application/json" \
  --data-binary @request.json
```

Here, `request.json` must contain the complete JSON request shown above. The frontend uses the same endpoint and content type.

## Validation and Error Behavior

- **Missing fields:** Pydantic returns HTTP 422 for a request missing one or more of the 51 schema fields. If a direct call reaches `predict.py` without a required field, it raises `ValueError` with `Missing required features: ...`; FastAPI maps that to HTTP 422.
- **Extra or unsupported fields:** The request schema uses `extra="forbid"`, so predictor inputs outside the 51 fields are rejected with HTTP 422.
- **Invalid categorical values:** Pydantic returns HTTP 422 for values outside the declared literals. Direct prediction also raises `ValueError` when a fuzzy-mapped category produces no mapping.
- **Invalid numeric values:** Pydantic returns HTTP 422 for non-numeric values and for ratings outside 1 through 5. GPA values outside 2 through 4 also return HTTP 422. Course values and graduation year have no additional schema range checks.
- **Invalid grades:** Letter grades or other non-numeric course/GPA values are invalid because no grade conversion is implemented; Pydantic rejects them as non-numeric.
- **Model loading errors:** If deployment imports or artifact loading fails, the service raises `ModelLoadingError` and FastAPI returns HTTP 503 with `The employment readiness model could not be loaded.`
- **Prediction/inference errors:** An inference failure after loading raises `ModelPredictionError` and FastAPI returns HTTP 500 with `Employment readiness prediction failed.` A `ValueError` from preprocessing or prediction is returned as HTTP 422.

During artifact inspection, loading `hybrid_fuzzy_xgboost_model.pkl` with the currently installed XGBoost runtime raised `XGBoostError: input stream corrupted`; this is a model-loading/runtime compatibility issue, not an additional request-field rule.

## Fields That Must Not Be Predictor Inputs

The target is the employment-readiness class represented by the label encoder. It must not be supplied as a request predictor field. Post-outcome fields, predictions, confidence values, probability values, fuzzy-score outputs, and any other fields not in the 51-field schema must also not be supplied. The implementation does not expose a separate named leakage-field list; its concrete enforcement is the 51-field allowlist plus `extra="forbid"`. No target or post-outcome field is included in `required_features`.

## Frontend Integration Requirements

React must send one JSON object containing all 51 exact aliased names, with the categorical spellings and numeric constraints documented above. The backend does not accept the frontend's internal `FormData` names directly. `src/services/api.ts` converts those internal names into model names before calling the endpoint, and the response consumer must read `predicted_class`, `confidence`, and `probabilities`.

The current assessment collects only 18 user-controlled values. `api.ts` fills the remaining model inputs as follows:

- Hardcoded course values: all 15 course fields are `3`.
- Hardcoded demographic/context values: `Batch` is `BATCH 20/21`, `School_Type` is `National`, and `Gender` is `Female`.
- Hardcoded experience/activity values: `Work_Experience_Duration` is `Less than 3 Months`, `Hackathon_Participation` is `1-2`, `Workshop_Seminar_Participation` is `1-2`, `Club_Participation` is `No`, `Weekly_Extracurricular_Hours` is `2-5 Hours`, and `Leadership_Responsibility` is `Team Member`.
- Reused frontend values: `techProgrammingFundamentals` populates `OOP_Knowledge`, `SQL_Database_Skill`, and `Data_Manipulation`; `techCompleteApps` populates `Frontend_Backend_Integration`; `techDebugging` populates `Technical_Problem_Analysis`; `techLearnNewTech` populates `Adaptability`; `softTeamwork` populates `Extracurricular_Involvement`, `Group_Discussion_Participation`, and `Meeting_Deadlines`; `softCommunication` populates `Technical_Communication` and `Presentation_Confidence`; and `softInitiative` populates `Initiative_Taking`.
- Derived mappings: numeric project and certification inputs are converted to the three count bands; frontend project-level values are converted to the model categories; and availability fields are converted to `Yes` or `No` based on whether the frontend value starts with `yes`.

Therefore the current frontend does not collect 33 of the 51 model fields independently, and it sends hardcoded or reused proxy values for those fields. This is a frontend/model input mismatch even though `api.ts` produces a schema-shaped request.

## Data Flow

```text
React Assessment
	↓
api.ts
	↓
POST /predict/employment-readiness
	↓
FastAPI
	↓
validation
	↓
preprocessing
	↓
fuzzy feature generation
	↓
63-feature hybrid vector
	↓
XGBoost
	↓
prediction + probabilities
	↓
React ResultPage
```

