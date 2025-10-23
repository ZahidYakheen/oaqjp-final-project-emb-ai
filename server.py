"""
server.py: Flask web service for emotion detection
"""

from flask import Flask, request, render_template, jsonify
from EmotionDetection.emotion_detection import emotion_detector

app = Flask(__name__)

@app.route("/emotionDetector", methods=["POST"])
def emotion_detector_route():
    """
    Flask route that handles POST requests for emotion detection.
    Returns JSON with emotion scores or error message.
    """
    text_to_analyze = request.form.get("text") or (request.get_json() or {}).get("text")
    result = emotion_detector(text_to_analyze)
    if result.get("dominant_emotion") is None:
        return jsonify({"message": "Invalid text! Please try again!"})
    return jsonify(result)


@app.route("/", methods=["GET"])
def index():
    """
    Renders the main index.html page.
    """
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
