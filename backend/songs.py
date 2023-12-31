from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS extension
import requests
import base64
import traceback  # Import traceback module for printing exception details

app = Flask(__name__)
CORS(app)  # Enable CORS

# Your Spotify API credentials
client_id = '4ea024aaf7bb491487899cac62614372'
client_secret = 'd36476a069ae42c387c73c73b3aeb6b8'

# Encode your client_id and client_secret in base64
client_credentials = f"{client_id}:{client_secret}"
base64_credentials = base64.b64encode(client_credentials.encode()).decode()

# Request a Spotify access token
token_url = 'https://accounts.spotify.com/api/token'
token_data = {'grant_type': 'client_credentials'}
token_headers = {'Authorization': f'Basic {base64_credentials}'}

@app.route('/detect-emotion', methods=['POST'])
def detect_emotion():
    user_text = request.json.get('text')

    headers = {
        'apikey': 'EypJex9jUpJCYyOQ9ffnjhW3C1m3d5QL',
        'Authorization': f'Bearer {get_spotify_access_token()}'
    }

    try:
        # Send the user text to the emotion detection API
        response = requests.post('https://api.apilayer.com/text_to_emotion', headers=headers, data=user_text.encode("utf-8"))
        response.raise_for_status()  # Check for HTTP errors

        # Parse the detected emotions from the API response
        detected_emotions = response.json()

        emotion_threshold = 0.5

        mood_mapping = {
            'Happy': 'happy',
            'Sad': 'sad',
            'Angry': 'metal',
            'Surprise': 'electronic',
            'Fear': 'ambient',
        }

        max_mood = None
        for emotion, score in detected_emotions.items():
            if score >= emotion_threshold:
                mapped_mood = mood_mapping.get(emotion)
                if mapped_mood:
                    max_mood = mapped_mood
                    break

        if max_mood:
            # Get Spotify recommendations based on the detected mood
            recommendations_url = 'https://api.spotify.com/v1/recommendations'
            recommendations_params = {'limit': 10, 'seed_genres': max_mood}
            recommendations_headers = {'Authorization': f'Bearer {get_spotify_access_token()}'}

            recommendations_response = requests.get(recommendations_url, params=recommendations_params, headers=recommendations_headers)
            recommendations_response.raise_for_status()  # Check for HTTP errors

            recommended_tracks = recommendations_response.json().get('tracks')
            return jsonify({'tracks': recommended_tracks})
        else:
            return jsonify({'error': 'No specific emotion or mood detected; using default mood or no recommendations available.'}), 400
    except requests.exceptions.HTTPError as e:
        # Handle the specific HTTPError for "Text too short" from the emotion detection API
        if response.status_code == 400 and 'Text too short' in response.text:
            return jsonify({'error': 'Text too short. Minimum length: 10 characters'}), 400
        else:
            # Re-raise the exception for other HTTP errors
            raise
    except Exception as e:
        traceback.print_exc()  # Print the full traceback
        print(response.content)  # Print the content of the emotion detection API response
        return jsonify({'error': 'Internal Server Error'}), 500

def get_spotify_access_token():
    token_response = requests.post(token_url, data=token_data, headers=token_headers)

    if token_response.status_code == 200:
        return token_response.json().get('access_token')
    else:
        return None

if __name__ == '__main__':
    app.run(host='192.168.246.10', port=5000, debug=True)
