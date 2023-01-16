from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from models import User, Post
import jwt, os
from auth_middleware import token_required
from dotenv import load_dotenv
from datetime import datetime

now = datetime.now()


load_dotenv()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS' ] = 'Content-Type'

SECRET_KEY = os.environ.get('SECRET_KEY')
app.config['SECRET_KEY'] = SECRET_KEY

@app.route('/registeruser', methods=["POST"])
def registeruser():
    try:
        data = request.json
        if not data:
            return {
                'message' : 'Please provide user details',
                "data" : None,
                "error" : "Bad request"
            }, 400
        user = User().create(**data)

        if user == "userName":
            return {
                'message' : "User Name exists",
                "error" : "Conflict",
                "data" : None,
            }, 409
        elif user == "email":
            return {
                'message' : "Email exists",
                "error" : "Conflict",
                "data" : None,
            }, 409
        elif user == "phoneNumber":
            return {
                'message' : "Phone number exists",
                "error" : "Conflict",
                "data" : None,
            }, 409
        return {
            'message' : "User created successfully",
                "data" : user,
        }, 201
    except Exception as e:
        return {
            'message' : "Something went wrong",
            "error" : str(e),
            "data" : None,
        }, 500

@app.route('/loginuser', methods=["POST"])
def loginuser():
    try:
        data = request.json
        if not data:
            return {
                'message' : 'Please provide user details',
                "data" : None,
                "error" : "Bad request"
            }, 400
        user = User().login(data['userName'], data['password'])

        if user:
            try:
                user["token"] = jwt.encode({
                    "userName": user["userName"]},
                    app.config["SECRET_KEY"],
                    algorithm="HS256"
                )
                return {
                    "message" : "Successfully fetched auth token",
                    "data" : user
                }
            except Exception as e:
                return {
                    "error" : "Something went wrong",
                    "message" : str(e)
                }, 500
        return {
            "message" : "Error fetching auth token invalid username or password",
            "data" : None,
            "error" : "Unauthorized"
        }, 404
    except Exception as e:
        return {
            "message" : "Something went wrong",
            "error" : str(e),
            "data" : None
        }, 500

@app.route("/user/createBlogPost", methods=["POST"])
@token_required
def createBlog(current_user):
    try:
        data = request.json
        data["dateTime"] = now.strftime("%d/%m/%Y  %H:%M:%S")
        data["userName"] = current_user["userName"]
        if not data:
            return {
                'message' : 'Provide post title and content',
                "data" : None,
                "error" : "Bad request"
            }, 400
        post = Post().create(**data)

        if not post:
            return {
                'message' : "UserName not valid",
                "error" : "conflict"
            }, 409
        return jsonify({
            'message' : "Post created successfully",
        }), 201
    except Exception as e:
        return jsonify({
            'message' : "Failed to create the post",
            "error" : str(e),
            "data" : None,
        }), 500

@app.route("/user/details")
@token_required
def getDetails(current_user):
    return {
        "name" : current_user["name"]
    }

@app.route("/user/signout")
@token_required
def signout(current_user):
    current_user["token"] = " "
    return {
        "message" : "logged out succesfully"
    }

@app.route("/user/allposts")
@token_required
def getallposts(current_user):
    try:
        posts = Post().get_all_posts(current_user["userName"])
        return jsonify({
            "message" : "Successfully returned all posts",
            "data" : posts
        })
    except Exception as e:
        return jsonify({
            "message" : "Failed to retrieve posts",
            "error" : str(e),
            "data" : None
        }), 500

@app.route("/user/post/<int:post_id>", methods = ["GET"])
@token_required
def get_fullpost(current_user, post_id):
    try:
        post = Post().get_by_id(post_id)
        if not post:
            return {
                "message" : "Post not found",
                "data" : None,
                "error" : "Not Found"
            }, 404
        return jsonify({
            "message" : "Successfully retrieved a post",
            "data" : post
        })
    except Exception as e:
        return jsonify({
            "message" : "Something went wrong",
            "error" : str(e),
            "data" : None,
        }), 500

app.run(debug=False)




























# @app.route('/updatepost/', methods=['POST'])
# def editpost():
#     """get the blog changes and update them"""
#     pass

# @app.route('/deletepost/', methods=['POST'])
# def deletepost():
#     """get blog id and delete i"""
#     pass

# @app.route('/deleteuser', methods=['POST'])
# def deleteuser():
#     """get user id and delete data"""
#     pass