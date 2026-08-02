def create_app():
    print("✅ create_app() is running")

    app = Flask(__name__)

    app.config.from_object(config["development"])

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)

    @app.route("/")
    def home():
        return "Backend Working!"

    return app