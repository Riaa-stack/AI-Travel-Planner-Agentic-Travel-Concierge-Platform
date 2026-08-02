from app.extensions import db
from app.models.trip import Trip


class TripService:

    @staticmethod
    def create_trip(user_id, data):
        """
        Create a new trip.
        """

        trip = Trip(
            user_id=user_id,
            destination=data["destination"],
            budget=data["budget"],
            days=data["days"],
            interests=data["interests"],
            status="draft"
        )

        db.session.add(trip)
        db.session.commit()

        return {
            "success": True,
            "message": "Trip created successfully.",
            "data": trip.to_dict()
        }, 201

    @staticmethod
    def get_all_trips(user_id):
        """
        Get all trips of a user.
        """

        trips = Trip.query.filter_by(user_id=user_id).order_by(
            Trip.created_at.desc()
        ).all()

        return {
            "success": True,
            "message": "Trips fetched successfully.",
            "data": [trip.to_dict() for trip in trips]
        }, 200

    @staticmethod
    def get_trip_by_id(user_id, trip_id):
        """
        Get a single trip.
        """

        trip = Trip.query.filter_by(
            id=trip_id,
            user_id=user_id
        ).first()

        if not trip:
            return {
                "success": False,
                "message": "Trip not found."
            }, 404

        return {
            "success": True,
            "data": trip.to_dict()
        }, 200

    @staticmethod
    def update_trip(user_id, trip_id, data):
        """
        Update trip details.
        """

        trip = Trip.query.filter_by(
            id=trip_id,
            user_id=user_id
        ).first()

        if not trip:
            return {
                "success": False,
                "message": "Trip not found."
            }, 404

        trip.destination = data["destination"]
        trip.budget = data["budget"]
        trip.days = data["days"]
        trip.interests = data["interests"]

        db.session.commit()

        return {
            "success": True,
            "message": "Trip updated successfully.",
            "data": trip.to_dict()
        }, 200

    @staticmethod
    def delete_trip(user_id, trip_id):
        """
        Delete a trip.
        """

        trip = Trip.query.filter_by(
            id=trip_id,
            user_id=user_id
        ).first()

        if not trip:
            return {
                "success": False,
                "message": "Trip not found."
            }, 404

        db.session.delete(trip)
        db.session.commit()

        return {
            "success": True,
            "message": "Trip deleted successfully."
        }, 200