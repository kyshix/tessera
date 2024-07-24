from flask import (
    Flask,
    jsonify,
    make_response,
    request,
)  # Importing the Flask library and some helper functions
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3  # Library for talking to  our database
import re
from datetime import datetime, timedelta
from flask_cors import CORS

from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity,
    set_access_cookies,
    unset_jwt_cookies,
    get_jwt
)

# add in implementation for token refresh later on

app = Flask(
    __name__
)  # Creating a new Flask app. This will help us create API endpoints hiding the complexity of writing network code!

CORS(app, supports_credentials=True)
# https://flask-jwt-extended.readthedocs.io/en/3.0.0_release/tokens_in_cookies/
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_SECRET_KEY"] = "hello-world"  # Change this!
jwt = JWTManager(app)


# Returns a connection to the database which can be used to send SQL commands to the database
def get_db_connection():
    conn = sqlite3.connect("../database/tessera.db")
    conn.row_factory = sqlite3.Row
    return conn

# Continue to edit as more filters are being added in the frontend
# Returns the events fitting the filters provided
@app.route("/events", methods=["GET"])
def get_events():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Start with the base SQL query
    query = "SELECT * FROM Events"
    params = []
    query_conditions = []

    # Check for the 'afterDate' filter
    after_date = request.args.get("afterDate")
    if after_date:
        query_conditions.append("date >= ?")
        params.append(after_date)

    # Check for the 'beforeDate' filter
    before_date = request.args.get("beforeDate")
    if before_date:
        query_conditions.append("date <= ?")
        params.append(before_date)

    # Check for the 'location' filter
    location = request.args.get("location")
    if location:
        query_conditions.append("location = ?")
        params.append(location)

    # Add WHERE clause if conditions are present
    if query_conditions:
        query += " WHERE " + " AND ".join(query_conditions)

    # Execute the query with the specified conditions
    cursor.execute(query, params)
    events = cursor.fetchall()

    # Convert the rows to dictionaries to make them serializable
    events_list = [dict(event) for event in events]

    conn.close()

    return jsonify(events_list)

# Returns all the users (for Admin)
@app.route("/user", methods=["GET"])
def get_users():
    conn = get_db_connection()  # Establish database connection
    cursor = conn.cursor()

    # SQL query to select all events
    cursor.execute("SELECT * FROM Users")
    users = cursor.fetchall()  # Fetch all events

    # Convert rows into a list of dicts to make them serializable
    users_list = [dict(user) for user in users]

    conn.close()  # Close the database connection

    return jsonify(users_list)  # Return the list of events as JSON

# Add new users
@app.route("/user", methods=["PUT"])
def create_user():
    # Extract data from user from the JSON payload
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")
    avatar_url = request.json.get("avatar_url")

    # Basic validation to ensure all fields are provided
    if not first_name or not last_name or not username or not email or not password or not avatar_url:
        return jsonify(
            {"error": "All fields are required."}
        ), 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    try:
        conn = get_db_connection() # Establish database connection
        cursor = conn.cursor()

        # Attempt to insert the new user into the Users table
        cursor.execute(
            "INSERT INTO Users (first_name, last_name, username, email, password_hash, avatar_url) VALUES (?, ?, ?, ?, ?, ?)",
            (first_name, last_name, username, email, hashed_password, avatar_url),
        )
        conn.commit()  # Commit the changes to the database

        # Retrieve the user_id of the newly created user to confirm creation
        cursor.execute("SELECT user_id FROM Users WHERE username = ?", (username,))
        new_user_id = cursor.fetchone()

        conn.close()

        return jsonify(
            {"message": "User created successfully", "user_id": new_user_id["user_id"]}
        ), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username or email already exists."}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Returns cookie for valid users
@app.route("/login", methods=["POST"])
def login_user():
    # Extract username and password from the JSON payload
    username = request.json.get("username")
    password = request.json.get("password")
    email = request.json.get("email")

    # Basic validation to ensure all fields required to verify user are provided
    if not ((username and password) or (email and password)):
        return jsonify(
            {"error": "Fields are missing: username/email and password are required."}
        ), 400

    try:
        conn = get_db_connection()  # Establish database connection
        cursor = conn.cursor()

        # Determines the query parameter based on what the user entered
        identity_input = "username = ?" if username else "email = ?"
        param = username if username else email

        cursor.execute(f"SELECT * FROM Users WHERE {identity_input}", (param,))
        user_info = cursor.fetchone()
        if user_info is None:
            return jsonify({"error": "User does not exist"}), 404

        hashed = user_info["password_hash"]
        if check_password_hash(hashed, password) is False:
            return jsonify({"error": "Password is invalid"}), 401

        identifiers_dict = {
            "first_name" : user_info["first_name"],
            "last_name" : user_info["last_name"],
            "username": user_info["username"],
            "email": user_info["email"],
            "avatar_url" : user_info["avatar_url"],
            "authType": "USER",
        }
        conn.close()

        access_token = create_access_token(
            identity=identifiers_dict, expires_delta=(timedelta(days=2))
        )
        resp = jsonify({"message": "User Successfully Logged In"})
        set_access_cookies(resp, access_token)
        return resp, 200
    except sqlite3.IntegrityError:
        return jsonify({"error": "Invalid Credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Removes cookie to log out of account
@app.route("/logout", methods=["POST"])
def logout():
    resp = jsonify({"logout": True})
    unset_jwt_cookies(resp)
    # set_access_cookies(resp, '')
    return resp, 200

# @app.route("/profile", method={"GET"})
# @jwt_required()
# def get_user():
#     jwt = get_jwt()
#     username = jwt["username"]
#     email = jwt["email"]

# create forget password thing (update password)
# generate code for recovery, maybe edit the change password code to accomdate
# can provide either the code (store as a new col in Users table) or the current password
# post for sending email with recovery link/code
# post for setting new password
# not finished
# @app.route('/forgot login', methods=['POST'])
# def forgot_login():
#     email = request.json.get('email')

#     if not email or :
#         return jsonify({'error': 'Email field is required.'}), 400
#     try:
#        conn = get_db_connection()
#        cursor = conn.cursor()

#        cursor.execute('SELECT email FROM Users WHERE email = ?', (email,))

#        conn.close()
#        if cursor.fetchone is None:
#            return jsonify({'error': 'Invalid Email Entered'}), 404

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


# Allow users to change their password
@app.route("/change/password", methods=["PUT"])
def change_password():
    # Extract username, current_password, new_password, and verify_new_password from the JSON payload
    username = request.json.get("username")
    current_password = request.json.get("current_password")
    new_password = request.json.get("new_password")
    verify_new_password = request.json.get("verify_new_password")

    # Basic validation to ensure all fields are provided
    if (
        not username
        or not current_password
        or not new_password
        or not verify_new_password
    ):
        return jsonify({"error": "All fields are required."}), 400

    try:
        conn = get_db_connection()  # Establish database connection
        cursor = conn.cursor()

        # Attempt to find the user in the Users table
        cursor.execute("SELECT username FROM Users WHERE username = ?", (username,))
        # Return error message if no user of the provided username is found
        if cursor.fetchone() is None:
            conn.close()
            return jsonify(
                {"error": "Invalid Credentials (username and/or current password)"}
            ), 403

        # Attempt to retrieve password_hasxh currently associated with the username from Users table
        cursor.execute(
            "SELECT password_hash FROM Users WHERE username = ?", (username,)
        )
        hashed = cursor.fetchone()

        # Basic validation to ensure that the current_password provided matches password_hash and that new password is correct
        if check_password_hash(hashed["password_hash"], new_password):
            conn.close()
            #!!!!! to maintain a list of past passwords should you add a new column in user table? a list?
            return jsonify(
                {
                    "error": "You used this password recently. Please choose a different one."
                }
            ), 406
        elif (
            check_password_hash(hashed["password_hash"], current_password) is False
            or hashed["password_hash"] is None
        ):
            conn.close()
            return jsonify(
                {"error": "Invalid Credentials (username and/or current password)"}
            ), 403
        elif new_password != verify_new_password:
            conn.close()
            return jsonify({"error": "Passwords do not match"}), 400
        else:
            message = validate_password(new_password)
            if message == "valid":
                cursor.execute(
                    "UPDATE Users SET password_hash = ? WHERE username = ?",
                    (
                        generate_password_hash(new_password),
                        username,
                    ),
                )
                conn.commit()
                conn.close()
                return jsonify({"message": "Password changed successfully"}), 200
            else:
                conn.close()
                return jsonify({"error": message})
    except sqlite3.IntegrityError:
        return jsonify({"error": "Invalid Credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def validate_password(password):
    while True:
        if len(password) < 8 or len(password) > 16:
            return "Make sure the password is at least 8 to 16 characters long"
        elif re.search("[0-9]", password) is None:
            return "Make sure the password contains a number"
        elif re.search("[A-Z]", password) is None:
            return "Make sure the password contains a capital letter"
        elif re.search("[a-z]", password) is None:
            return "Make sure that the password contains a lowercase letter"
        elif re.search("[-&!@?#]", password) is None:
            return "Make sure that the pasword contains a special character (!@?-&#)"
        else:
            return "valid"


# Allow users to change the username and/or email
# check if the username/email they provided is already being used by someone else in the User table
@app.route("/change/username_email", methods=["PUT"])
def change_username_email():
    username = request.json.get("username")
    new_username = request.json.get("new_username")
    new_email = request.json.get("new_email")

    if (username and new_username) or (username and new_email):
        try:
            conn = get_db_connection()  # Establish database connection
            cursor = conn.cursor()

            cursor.execute("SELECT * from Users WHERE username = ?", (username,))
            if cursor.fetchone() is None:
                return jsonify({"error": "User does not exist"}), 404

            cursor.execute("SELECT * from Users WHERE username = ?", (new_username))
            if cursor.fetchone():
                return jsonify(
                    {
                        "error": "A user with this username already exists. Use a different name."
                    }
                )
            cursor.execute("SELECT * from Users WHERE email = ?", (new_email))
            if cursor.fetchone():
                return jsonify(
                    {
                        "error": "The email address is already used. Use a different email"
                    }
                )

            query = "UPDATE Users SET "
            params = []
            query_conditions = []

            if new_username:
                query_conditions.append("username = ?")
                params.append(new_username)
            if new_email:
                query_conditions.append("email = ?")
                params.append(new_email)
            query += ", ".join(query_conditions) + " WHERE username = ?"
            params.append(username)

            cursor.execute(query, params)
            conn.commit()
            conn.close()
            return jsonify({"message": "Username and/or email changed"}), 200
        except sqlite3.IntegrityError:
            return jsonify({"error": "Invalid Credentials"}), 401
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify(
            {
                "error": "Please provide your username and at least one other field (new_username or new_email)."
            }
        ), 400


# delete account enabled (can get account back in 15 days)
@app.route("/delete_acc", methods=["DELETE"])
def delete_acc():
    username = request.json.get("username")
    password = request.json.get("password")
    confirmation = request.json.get(
        "confirmation"
    )  # frontend can be like a check box boolean

    if not username or not password or not confirmation:
        return jsonify(
            {"error": "All fields are required (username, email, confirmation)"}
        ), 400

    try:
        conn = get_db_connection()  # Establish database connection
        cursor = conn.cursor()

        cursor.execute(
            "SELECT password_hash FROM Users WHERE username = ?", (username,)
        )
        hashed = cursor.fetchone()
        if check_password_hash(hashed["password_hash"], password):
            cursor.execute("DELETE FROM Users WHERE username = ?", (username,))
            conn.commit()
            conn.close()
            return jsonify(
                {
                    "message": "The account under the username "
                    + username
                    + " has been deleted"
                }
            ), 200
        else:
            return jsonify({"error": "Invalid Credentials"}), 401
    except sqlite3.IntegrityError:
        return jsonify({"error": "Invalid Credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# POST endpoint allowing event creation
# (maybe you want to build an admin section on your website for admins to create new events)
@app.route("/events", methods=["POST"])
def create_event():
    # Extract name, description, date, time, and location from the JSON payload
    name = request.json.get("name")
    description = request.json.get("description")
    date = request.json.get("date")
    start_time = request.json.get("start_time")
    end_time = request.json.get("end_time")
    location = request.json.get("location")
    image_url = request.json.get("image_url")

    # Basic validation to ensure all fields are provided
    if (
        not name
        or not description
        or not date
        or not start_time
        or not end_time
        or not location
        or not image_url
    ):
        return jsonify(
            {
                "error": "All fields (name, description, date, time, and location) are required."
            }
        ), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Attempt to insert the new user into the Users table
        cursor.execute(
            "INSERT INTO Events (name, description, date, start_time, end_time, location, image_url) VALUES (?,?,?,?,?,?,?)",
            (
                name,
                description,
                date,
                start_time,
                end_time,
                location,
                image_url,
            ),
        )
        conn.commit()  # Commit the changes to the database

        # Retrieve the user_id of the newly created user to confirm creation
        cursor.execute("SELECT event_id FROM Events WHERE name = ?", (name,))
        new_event_id = cursor.fetchone()

        conn.close()

        return jsonify(
            {
                "message": "Event created successfully",
                "event_id": new_event_id["event_id"],
            }
        ), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username or email already exists."}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# GET endpoint to return all emails in a database so we can sell data to partners
@app.route("/data", methods=["GET"])
def get_data():
    # event_id = request.json.get('event_id')
    # add admin credentials when thats all set up
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT emails FROM Users")
        emails = cursor.fetchall()

        email_list = [dict(email) for email in emails]
        conn.closer()
        return jsonify(email_list)
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username or email already exists."}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/ticket/reward", methods=["POST"])
def reward_ticket():
    user_id = request.json.get("user_id")
    event_id = request.json.get("event_id")
    if not user_id or not event_id:
        return jsonify(
            {"error": "All fields (user_id and event_id) are required."}
        ), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO Tickets(event_id, user_id, purchase_date, price) VALUES (?,?,?,0)",
            (
                event_id,
                user_id,
                datetime.datetime.now().date(),
            ),
        )
        conn.commit()

        cursor.execute(
            "SELECT ticket_id FROM Tickets WHERE event_id = ?, user_id = ?",
            (
                event_id,
                user_id,
            ),
        )
        ticket_id = cursor.fetchone
        cursor.execute("SELECT username FROM Users WHERE user_id = ?", (user_id))
        username = cursor.fetchone
        cursor.execute("SELECT name FROM Events WHERE event_id = ?", (event_id))
        event_name = cursor.fetchone
        conn.close()

        message = (
            username["username"]
            + " you have been chosen to earn a free ticket to "
            + event_name["name"]
            + "!"
        )

        return jsonify({"message": message, "ticket_id": ticket_id["ticket_id"]}), 200
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username or email already exists."}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/events/<event_id>", methods={"GET"})
@jwt_required()
def get_event(event_id):
    try:
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify({"error": "Unauthorized"}), 401
        
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM Events WHERE event_id = ?", (event_id,))
        event = cursor.fetchone()
        if event is None:
            return jsonify({"error": "No event found"}), 404
        event_detail = dict(event)
        conn.close()
        return jsonify(event_detail)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# admin portal to add events
if __name__ == "__main__":
    app.run(debug=True)
