import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/questions/')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the questions!', error);
      });
  }, []);

  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {questions.map(question => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;

