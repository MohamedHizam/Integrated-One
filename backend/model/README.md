# Employment Readiness Prediction
## Hybrid Fuzzy Logic + XGBoost Deployment

This package contains the trained machine-learning model and the
required configuration files for predicting student Employment
Readiness.

---

## 1. Model Output

The model predicts one of three classes:

- At Risk
- Moderate Readiness
- High Readiness

The prediction also returns class probabilities and the highest
probability as the prediction confidence.

---

## 2. Model Architecture

The deployed model uses:

Raw Student Input
        ↓
Preprocessing / Encoding
        ↓
Fuzzy Feature Generation
        ↓
63 Hybrid Features
        ↓
XGBoost Classifier
        ↓
Employment Readiness Prediction

Four fuzzy features are generated:

- Academic_Fuzzy_Score
- Technical_Fuzzy_Score
- Soft_Skill_Fuzzy_Score
- Professional_Fuzzy_Score

These four fuzzy features are combined with the original encoded
predictor features before prediction.

---

## 3. Deployment Files

### hybrid_fuzzy_xgboost_model.pkl
Trained hybrid XGBoost model.

### complete_deployment_config.pkl
Contains the deployment configuration, including:

- Required input features
- Fuzzy feature groups
- Ordinal mappings
- Nominal columns
- Final 63-feature order
- Class names

### fuzzy_systems.pkl
Contains the four trained/defined fuzzy inference systems:

- Academic
- Technical
- Soft Skill
- Professional

### hybrid_feature_information.pkl
Contains model feature information.

### employment_readiness_label_encoder.pkl
Contains the label encoder used for the three target classes.

### deployment_config.pkl
Earlier deployment configuration artifact.

### predict.py
Main backend prediction module.

### requirements.txt
Python dependencies required by the deployment module.

---

## 4. Installation

Install the required dependencies:

    pip install -r requirements.txt

---

## 5. Basic Usage

Example:

    from predict import predict_employment_readiness

    student_data = {
        # Provide all required student input fields here
    }

    result = predict_employment_readiness(student_data)

    print(result)

---

## 6. Prediction Response

The prediction function returns:

    {
        "predicted_class": "At Risk",
        "confidence": 0.7245,
        "probabilities": {
            "At Risk": 0.7245,
            "High Readiness": 0.0158,
            "Moderate Readiness": 0.2597
        }
    }

The probability values are returned as decimal values between
0 and 1.

---

## 7. Important Input Requirement

The backend must provide the required student fields using the
same feature names and category values used during model training.

The deployment configuration contains the exact required feature
list and mappings.

Do not rename feature fields or change categorical values without
updating the preprocessing pipeline.

The model expects the preprocessing and fuzzy transformation to
remain consistent with the training pipeline.

---

## 8. Validation

The deployment module was independently tested using a student
record from the processed dataset.

Notebook prediction:

    At Risk
    Confidence: 72.45%

Independent predict.py prediction:

    At Risk
    Confidence: 72.45%

Class probabilities:

    At Risk: 72.45%
    High Readiness: 1.58%
    Moderate Readiness: 25.97%

The two predictions matched exactly for this test case.

---

## 9. Backend Integration

Recommended API flow:

Frontend
    ↓
Backend API
    ↓
Validate student input
    ↓
predict_employment_readiness(student_data)
    ↓
Return JSON response
    ↓
Frontend displays readiness result

Example API response:

    {
        "predicted_class": "At Risk",
        "confidence": 0.7245,
        "probabilities": {
            "At Risk": 0.7245,
            "High Readiness": 0.0158,
            "Moderate Readiness": 0.2597
        }
    }

---

## 10. Important Deployment Note

The model artifacts should be kept together in the same directory
as predict.py.

Do not modify the .pkl files manually.

If the model is retrained, the deployment artifacts should be
regenerated from the same training pipeline.

