from flask import Flask, request, jsonify, redirect
from flask_cors import CORS  # 👈 Add this
from datetime import datetime, timedelta
import string, random
from logger_middleware import setup_logger

app = Flask(__name__)
CORS(app)  # 👈 Enable CORS for all routes
logger = setup_logger()

# In-memory DB
url_store = {}

def generate_shortcode(length=6):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "URL Shortener API is running"}), 200

@app.route('/shorten', methods=['POST'])
def shorten_url():
    data = request.json
    long_url = data.get("url")
    custom_code = data.get("shortcode")
    validity_minutes = data.get("validity", 30)

    if not long_url:
        return jsonify({"error": "URL is required"}), 400

    shortcode = custom_code if custom_code else generate_shortcode()
    if shortcode in url_store:
        return jsonify({"error": "Shortcode already exists"}), 400

    expiry = datetime.utcnow() + timedelta(minutes=validity_minutes)
    url_store[shortcode] = {"url": long_url, "expiry": expiry}

    short_url = f"http://127.0.0.1:5000/{shortcode}"  # Updated host to 127.0.0.1
    logger.info(f"Shortened {long_url} -> {short_url} (valid {validity_minutes} mins)")
    return jsonify({"short_url": short_url, "expiry": expiry.isoformat()})

@app.route('/<shortcode>', methods=['GET'])
def redirect_url(shortcode):
    record = url_store.get(shortcode)
    if not record:
        return jsonify({"error": "Shortcode not found"}), 404
    if datetime.utcnow() > record["expiry"]:
        return jsonify({"error": "Shortcode expired"}), 410
    return redirect(record["url"])

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=False)
