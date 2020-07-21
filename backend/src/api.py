import os
from flask import Flask, request, jsonify, abort, render_template, url_for
from sqlalchemy import exc
import json
from flask_cors import CORS

from .database.models import db_drop_and_create_all, setup_db, Actor, Movie
from .auth.auth import AuthError, requires_auth

app = Flask(__name__, template_folder='frontend/src/templates')
setup_db(app)
cors = CORS(app)

#db_drop_and_create_all()

ITEM_PER_PAGE = 10


def paginate(request, selection):
    page = request.args.get("page", 1, type=int)
    start = (page - 1) * ITEM_PER_PAGE
    end = start + ITEM_PER_PAGE
    items = [item for item in selection]
    current_items = items[start: end]

    return current_items

@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Headers",
                         "Content-Type, Authorization, true")
    response.headers.add("Access-Control-Allow-Methods",
                         "GET, POST, PATCH, DELETE, OPTIONS")
    return response

@app.route('/actors', methods=['GET'])
def actors():
    try:
        selection = Actor.query.all()
        actors = paginate(request, selection)
        formatted_actors = [actor.format() for actor in actors]
        return jsonify({
            'success': True,
            'actors': formatted_actors,
            'totalActors': len(Actor.query.all())
        }), 200
    except:
        abort(404)

@app.route('/actors/<int:actor_id>', methods=['GET'])
def actor_details(actor_id):
    try:
        actor = Actor.query.filter(Actor.id == actor_id).first()
        return jsonify({
            'success': True,
            'actor': actor.format()
        }), 200
    except:
        abort(404)

@app.route('/actors/create', methods=['POST'])
def create_actor():
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    gender = request.get_json()['gender']
    age = request.get_json()['age']
    try:
        new_actor = Actor(first_name=first_name, last_name=last_name,
                          age=age, gender=gender)
        new_actor.create()
        return jsonify({
            'success': True,
            'created': new_actor.id
        }), 201
    except:
        abort(401)

@app.route('/actors/<int:actor_id>', methods=['PATCH'])
def update_actor(actor_id):
    actor = Actor.query.filter(Actor.id == actor_id).first()
    data = request.json()
    try:
        actor.first_name = data.get('first_name')
        actor.last_name = data.get('last_name')
        actor.gender = data.get('gender')
        actor.age = data.get('age')
        actor.update()
        return jsonify({
            'success': True,
            'updated': actor.id
        }), 200
    except:
        abort(401)

@app.route('/actors/<int:actor_id>', methods=['DELETE'])
def delete_actor(actor_id):
    actor = Actor.query.filter(Actor.id == actor_id).first()
    try:
        actor.delete()
        return jsonify({
            'success': True,
            'deleted': actor.id
        }), 200
    except:
        abort(401)

@app.route('/movies', methods=['GET'])
def movies():
    try:
        selection = Movie.query.all()
        movies = paginate(request, selection)
        formatted_movies = [movie.format() for movie in movies]
        return jsonify({
            'success': True,
            'movies': formatted_movies,
            'totalMovies': len(Movie.query.all())
        }), 200
    except:
        abort(404)

@app.route('/movies/<int:movie_id>', methods=['GET'])
def movie_details():
    try:
        movie = Movie.query.filter(Movie.id == movie_id).first()
        return jsonify({
            'success': True,
            'movie': movie
        }), 200
    except:
        abort(404)

@app.route('/movies/create', methods=['POST'])
def create_movie():
    data = request.get_json()
    title = data.get('title')
    genre = data.get('genre')
    release_date = data.get('release_date')
    try:
        new_movie = Movie(title=title, genre=genre,
                          release_date=release_date)
        new_movie.create()
        return jsonify({
            'success': True,
            'created': new_movie.id
        }), 201
    except:
        abort(401)

@app.route('/movies/<int:movie_id>', methods=['PATCH'])
def update_movie():
    movie = Movie.query.filter(Movie.id == movie_id).first()
    data = request.json()
    try:
        movie.title = data.get('title')
        movie.genre = data.get('genre')
        movie.release_date = data.get('release_date')
        movie.update()
        return jsonify({
            'success': True,
            'updated': movie.id
        }), 200
    except:
        abort(401)

@app.route('/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie():
    movie = Movie.query.filter(Movie.id == movie_id).first()
    try:
        movie.delete()
        return jsonify({
            'success': True,
            'deleted': movie.id
        }), 200
    except:
        abort(401)

@app.errorhandler(404)
def not_found(error):
    actor = Actor.query.filter(Actor.id == 1).first()
    return jsonify({
        "success": False,
        "error": 404,
        "message": "Resource Not Found",
        "actor": actor
         }), 404

@app.errorhandler(422)
def unprocessable(error):
    return jsonify({
        "success": False,
        "error": 422,
        "message": "Unprocessable Entity"
        }), 422

@app.errorhandler(AuthError)
def forbidden(AuthError):
    return jsonify({
        "success": False,
        "error": 401,
        "message": "Auth Error"
    }), 401
