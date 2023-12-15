# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import requests
import traceback
import random

app = Flask(__name__)
CORS(app)

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

@app.route('/search-songs', methods=['GET'])
def search_songs():
    query = request.args.get('query', '')

    try:
        # If the query is empty, set it to a default value for random songs
        if not query:
            query = 'a'

        # Get Spotify tracks based on the search query
        search_url = 'https://api.spotify.com/v1/search'
        search_params = {'q': query, 'type': 'track', 'limit': 20}  # Increase limit to 20 for random songs
        search_headers = {'Authorization': f'Bearer {get_spotify_access_token()}'}

        search_response = requests.get(search_url, params=search_params, headers=search_headers)
        search_response.raise_for_status()  # Check for HTTP errors

        # Parse the Spotify tracks from the API response
        search_results = search_response.json().get('tracks', {}).get('items', [])
        
        # Extract relevant information for each track, including album image URL
        formatted_results = [
            {
                'name': track['name'],
                'artists': [artist['name'] for artist in track['artists']],
                'album_image': track['album']['images'][0]['url'] if track['album']['images'] else None,
                'spotify_link': track['external_urls']['spotify']
            }
            for track in search_results
        ]

        return jsonify({'songs': formatted_results})
    except requests.exceptions.HTTPError as e:
        raise
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': 'Internal Server Error'}), 500

def get_spotify_access_token():
    token_response = requests.post(token_url, data=token_data, headers=token_headers)

    if token_response.status_code == 200:
        return token_response.json().get('access_token')
    else:
        return None

if __name__ == '__main__':
    app.run(host='192.168.246.10', port=5001, debug=True)