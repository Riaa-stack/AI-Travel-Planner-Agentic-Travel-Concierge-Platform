from app.extensions import db
from app.models.base import BaseModel


class Itinerary(BaseModel):
    __tablename__ = "itineraries"

    trip_id = db.Column(
        db.ForeignKey("trips.id"),
        nullable=False
    )

    day_number = db.Column(
        db.Integer,
        nullable=False
    )

    activities = db.Column(
        db.JSON,
        nullable=False
    )

    hotel_id = db.Column(
        db.ForeignKey("hotels.id"),
        nullable=True
    )

    estimated_cost = db.Column(
        db.Float,
        nullable=True
    )

    route_data = db.Column(
        db.JSON,
        nullable=True
    )

    weather_note = db.Column(
        db.Text,
        nullable=True
    )

    trip = db.relationship(
        "Trip",
        backref=db.backref(
            "itinerary",
            lazy=True,
            cascade="all, delete-orphan"
        )
    )

    hotel = db.relationship(
        "Hotel",
        backref=db.backref(
            "itinerary",
            lazy=True
        )
    )

    def to_dict(self):
        return {
            "id": str(self.id),
            "trip_id": str(self.trip_id),
            "day_number": self.day_number,
            "activities": self.activities,
            "hotel_id": str(self.hotel_id) if self.hotel_id else None,
            "estimated_cost": self.estimated_cost,
            "route_data": self.route_data,
            "weather_note": self.weather_note,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

    def __repr__(self):
        return f"<Itinerary Day {self.day_number}>"