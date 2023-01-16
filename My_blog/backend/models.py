import mysql.connector as msconnector
from configparser import ConfigParser
from flask import jsonify
from passlib.hash import sha256_crypt as encrypt

config = ConfigParser()
config.read("C:\\Users\\user\\Desktop\\Sayur Learning\\Sowmiya\\My_blog\\backend\\blogDB\\connection.ini")
config_data  = config["credentials"]
try:
    mydatabase = msconnector.connect(
    host = config_data["host"],
    user = config_data["username"],
    password = config_data["password"],
    database = config_data["dbname"]
    )
except:
    print("No connection made")

mycursor = mydatabase.cursor(dictionary=True)
cursor = mydatabase.cursor(buffered=True)

class User():
    """User Model"""
    def __init__(self):
        return
    
    def create(self, name="", userName="", email="", password="", phoneNumber=""):
        "Create a new user"

        user = self.get_user_by_userName(userName)
        if user:
            return "userName"
        user = self.get_user_by_email(email)
        if user:
            return "email"
        user = self.get_user_by_phonenumber(phoneNumber)
        if user:
            return "phoneNumber"
        password = self.encrypt_password(password)
        new_user = (name, userName, email, password, phoneNumber)
        insertStatement = 'INSERT INTO `tbl_users` (name, userName, email, password, phoneNumber) VALUES (%s, %s, %s, %s, %s);'
        mycursor.execute(insertStatement, new_user)
        mydatabase.commit()
        return self.get_user_by_userName(userName)

    def get_user_by_userName(self, userName):
        "Checks for existing user name"
        get_userName = 'SELECT * FROM tbl_users where userName = %s'
        mycursor.execute(get_userName, (userName,))
        user = mycursor.fetchone()
        if not user:
            return False
        return user

    def get_user_by_email(self, email):
        "Checks for existing email"
        get_email = 'SELECT * FROM tbl_users where email = %s'
        mycursor.execute(get_email, (email,))
        user = mycursor.fetchone()
        if not user:
            return False
        return user
    
    def get_user_by_phonenumber(self, phoneNumber):
        "Checks for existing email"
        get_phoneNumber = 'SELECT * FROM tbl_users where phoneNumber = %s'
        mycursor.execute(get_phoneNumber, (phoneNumber,))
        user = mycursor.fetchone()
        if not user:
            return False
        return user

    def encrypt_password(self, password):
        "Encrypt or hash password"
        return encrypt.hash(password)
    
    def login(self, userName, password):
        "Checks userName and password match"
        user = self.get_user_by_userName(userName)
        if not user or not encrypt.verify(password, user["password"]):
            return False
        return user


class Post():
    """Post Model"""
    def __init__(self):
        return

    def create(self, title = "", content = "", dateTime="", userName = ""):
        author = self.get_user_by_userName(userName)
        if author:
            new_post = (userName, title, content, dateTime)
            insertStatement = 'INSERT INTO `tbl_posts` (userName, blogTitle, blogContent, dateTime) VALUES (%s, %s, %s, %s);'
            mycursor.execute(insertStatement, new_post)
            # mycursor.callproc('createPost', [new_post])
            mydatabase.commit()
            return True
        return False
    
    def get_user_by_userName(self, userName):
        "Checks for existing user name"
        get_userName = 'SELECT * FROM tbl_users where userName = %s'
        mycursor.execute(get_userName, (userName,))
        user = mycursor.fetchone()
        if not user:
            return False
        return user
    
    def get_all_posts(self, userName):
        """get all posts"""
        get_posts = "SELECT * FROM tbl_posts where userName = %s"
        mycursor.execute(get_posts, (userName, ))
        posts = mycursor.fetchall()
        if not posts:
            return False
        return posts
    
    def get_by_id(self, post_id):
        """get a post by its ID"""
        get_post = "SELECT * FROM tbl_posts where postID = %s"
        mycursor.execute(get_post, (post_id, ))
        post = mycursor.fetchone()
        if not post:
            return False
        return post