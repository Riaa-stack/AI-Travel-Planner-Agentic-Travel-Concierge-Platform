from marshmallow import Schema, fields, validate, validates, ValidationError


class TripSchema(Schema):
    destination = fields.String(
        required=True,
        validate=validate.Length(min=2, max=150)
    )

    budget = fields.Float(
        required=True
    )

    days = fields.Integer(
        required=True
    )

    interests = fields.List(
        fields.String(),
        required=True,
        validate=validate.Length(min=1)
    )

    @validates("budget")
    def validate_budget(self, value, **kwargs):
        if value <= 0:
            raise ValidationError("Budget must be greater than 0.")

    @validates("days")
    def validate_days(self, value, **kwargs):
        if value <= 0:
            raise ValidationError("Days must be greater than 0.")