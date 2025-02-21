from flask import Flask

from config import app
from job_seeker_routes import job_seeker_bp
from login_routes import login_bp
from provide_service_routes import provide_service_bp

# Register Blueprints
app.register_blueprint(job_seeker_bp, url_prefix='/job_seeker_routes')
app.register_blueprint(login_bp, url_prefix='/login_routes')
app.register_blueprint(provide_service_bp, url_prefix='/provide_service_routes')

if __name__ == '__main__':
    app.run(debug=True)
