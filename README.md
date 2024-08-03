Here’s an updated `README.md` file for your project based on the new requirements and dependencies:

---

# EduAI Study Partner

## Project Overview

EduAI Study Partner is a web-based application designed to assist students with academic questions and practice tests. The application integrates Django for the backend, React for the frontend, and utilizes a pre-trained language model from Hugging Face to provide accurate answers to academic queries.

## Features

- **User Authentication**: Secure login and registration system.
- **Chat Interface**: A chatbot interface to ask academic questions.
- **Dynamic Question Bank**: A comprehensive question bank for practice tests.
- **AI Integration**: Uses GPT-3.5 Turbo for answering questions and providing academic assistance.

## Setup Instructions

### Backend (Django)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/eduai-study-partner.git
   cd eduai-study-partner/backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Run the development server**:
   ```bash
   python manage.py runserver
   ```

### Frontend (React)

1. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the React development server**:
   ```bash
   npm start
   ```

## Usage Instructions

1. **Open your browser** and navigate to `http://localhost:3000` to access the React frontend.
2. **Login or Register** to access the features.
3. **Use the chatbot** interface to ask academic questions. The chatbot uses the GPT-3.5 Turbo model to generate responses.

## Contribution Guidelines

1. **Fork the repository** and clone it to your local machine.
2. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Make your changes** and test them thoroughly.
4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add your message"
   ```
5. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature
   ```
6. **Create a pull request** from your fork to the main repository.

## Dependencies

### Backend

- **Django**: 5.0.7
- **Django REST Framework**: 3.15.2
- **Hugging Face Transformers**: 4.43.3
- **PyTorch**: 2.4.0
- **Other dependencies**: Refer to `requirements.txt`

### Frontend

- **React**: 18.3.1
- **React Router DOM**: 6.25.1
- **Axios**: 1.7.2
- **Bootstrap**: 5.3.3

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
