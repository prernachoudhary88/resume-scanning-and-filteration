from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
import pandas as pd
import re

app = Flask(__name__)
CORS(app)

# Load job roles and required skills from CSV (semicolon-separated)
job_data = pd.read_csv('job_skills.csv')

# Parse all unique known skills
def get_all_skills(df):
    all_skills = set()
    for skills in df['skills']:
        for skill in str(skills).split(';'):
            all_skills.add(skill.strip().lower())
    return all_skills

ALL_SKILLS = get_all_skills(job_data)

# Extract text from uploaded PDF
def extract_text_from_pdf(file):
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text.lower()

# Fuzzy skill matcher using regex boundaries
def extract_skills(resume_text, known_skills):
    found = set()
    for skill in known_skills:
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, resume_text):
            found.add(skill)
    return found

@app.route('/rate-resume', methods=['POST'])
def rate_resume():
    try:
        if 'resume' not in request.files or 'role' not in request.form:
            return jsonify({'error': 'Missing resume file or jobRole'}), 400

        file = request.files['resume']
        job_role = request.form['role'].strip().lower()

        # Extract resume text
        resume_text = extract_text_from_pdf(file)

        # Find matching job role row
        matched_job = job_data[job_data['role'].str.lower() == job_role]
        if matched_job.empty:
            return jsonify({'error': 'Job role not found'}), 400

        required_skills = set(map(str.strip, matched_job.iloc[0]['skills'].lower().split(';')))
        resume_skills = extract_skills(resume_text, ALL_SKILLS)

        matched = resume_skills.intersection(required_skills)
        missing = required_skills - matched

        score = round((len(matched) / len(required_skills)) * 10, 2) if required_skills else 0.0

        return jsonify({
            'rating': score,
            'feedback': f"✅ Matched Skills: {', '.join(matched) or 'None'}\n❌ Missing Skills: {', '.join(missing) or 'None'}"
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
