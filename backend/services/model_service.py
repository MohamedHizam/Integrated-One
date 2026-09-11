from collections.abc import Mapping
from typing import Any


class ModelLoadingError(RuntimeError):
	"""Raised when the trained deployment artifacts cannot be loaded."""


class ModelPredictionError(RuntimeError):
	"""Raised when inference fails after the artifacts have loaded."""


_predictor: Any | None = None


def _load_predictor():
	global _predictor

	if _predictor is not None:
		return _predictor

	try:
		try:
			from backend.model.predict import predict_employment_readiness
		except ModuleNotFoundError:
			from model.predict import predict_employment_readiness
	except Exception as exc:
		raise ModelLoadingError("The employment readiness model could not be loaded.") from exc

	_predictor = predict_employment_readiness
	return _predictor


def predict_employment_readiness(student_data: Mapping[str, object]) -> dict[str, object]:
	try:
		result = _load_predictor()(dict(student_data))
	except ModelLoadingError:
		raise
	except ValueError:
		raise
	except Exception as exc:
		raise ModelPredictionError("Employment readiness prediction failed.") from exc

	if not isinstance(result, dict):
		raise ModelPredictionError("The employment readiness model returned an invalid response.")

	return result
