from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://mongo:27017/")
db = client.notesdb
notes_collection = db.notes

@app.route("/api/notes", methods=["GET"])
def get_notes():
    notes = list(notes_collection.find({}, {"_id": 0}))
    return jsonify(notes)

@app.route("/api/notes", methods=["POST"])
def add_note():
    data = request.get_json()
    note = data.get("note")
    if note:
        notes_collection.insert_one({"note": note})
        return jsonify({"message": "Note added"}), 201
    return jsonify({"error": "Note is required"}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
