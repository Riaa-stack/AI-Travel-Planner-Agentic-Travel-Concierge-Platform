from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.orchestrators.travel_orchestrator import TravelOrchestrator
from app.schemas.trip_schema import TripSchema
from app.services.trip_service import TripService

trip_bp = Blueprint(
    "trips",
    __name__,
    url_prefix="/api/trips"
)

trip_schema = TripSchema()


@trip_bp.route("", methods=["POST"])
@jwt_required()
def create_trip():
    """
    Create a new trip
    """

    data = request.get_json()

    if not data:
        return {
            "success": False,
            "message": "No input data provided."
        }, 400

    errors = trip_schema.validate(data)

    if errors:
        return {
            "success": False,
            "errors": errors
        }, 400

    user_id = get_jwt_identity()

    return TripService.create_trip(user_id, data)


@trip_bp.route("", methods=["GET"])
@jwt_required()
def get_all_trips():
    """
    Get all trips of logged-in user
    """

    user_id = get_jwt_identity()

    return TripService.get_all_trips(user_id)


@trip_bp.route("/<uuid:trip_id>", methods=["GET"])
@jwt_required()
def get_trip(trip_id):
    """
    Get trip by ID
    """

    user_id = get_jwt_identity()

    return TripService.get_trip_by_id(user_id, trip_id)


@trip_bp.route("/<uuid:trip_id>", methods=["PUT"])
@jwt_required()
def update_trip(trip_id):
    """
    Update trip
    """

    data = request.get_json()

    if not data:
        return {
            "success": False,
            "message": "No input data provided."
        }, 400

    errors = trip_schema.validate(data)

    if errors:
        return {
            "success": False,
            "errors": errors
        }, 400

    user_id = get_jwt_identity()

    return TripService.update_trip(user_id, trip_id, data)


@trip_bp.route("/plan", methods=["POST"])
@jwt_required()
def plan_trip():
    """
    Generate a complete AI travel plan.
    """

    try:

        data = request.get_json()

        if not data:
            return {
                "success": False,
                "message": "No input data provided."
            }, 400

        required_fields = [
            "destination",
            "budget",
            "days",
            "interests",
            "group_type",
            "season"
        ]

        missing = [
            field
            for field in required_fields
            if field not in data
        ]

        if missing:
            return {
                "success": False,
                "message": f"Missing fields: {', '.join(missing)}"
            }, 400

        orchestrator = TravelOrchestrator()

        result = orchestrator.generate_trip(data)

        return {
            "success": True,
            "data": result
        }, 200

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


@trip_bp.route("/<uuid:trip_id>", methods=["DELETE"])
@jwt_required()
def delete_trip(trip_id):
    """
    Delete trip
    """

    user_id = get_jwt_identity()

    return TripService.delete_trip(user_id, trip_id)