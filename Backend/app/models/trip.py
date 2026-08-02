from app.extensions import db
from app.models.base import BaseModel


class Trip(BaseModel):
    __tablename__ = "trips"

    user_id = db.Column(
        db.ForeignKey("users.id"),
        nullable=False
    )

    destination = db.Column(
        db.String(150),
        nullable=False
    )

    budget = db.Column(
        db.Float,
        nullable=False
    )

    days = db.Column(
        db.Integer,
        nullable=False
    )

    interests = db.Column(
        db.JSON,
        nullable=False
    )

    travel_style = db.Column(
        db.String(100),
        nullable=True
    )

    status = db.Column(
        db.String(20),
        default="draft",
        nullable=False
    )

    user = db.relationship(
        "User",
        backref=db.backref("trips", lazy=True)
    )

    def to_dict(self):
        return {
            "id": str(self.id),
            "destination": self.destination,
            "budget": self.budget,
            "days": self.days,
            "interests": self.interests,
            "travel_style": self.travel_style,
            "status": self.status,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

    def __repr__(self):
        return f"<Trip {self.destination}>"
    