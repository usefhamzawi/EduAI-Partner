from openai import OpenAI

client = OpenAI(api_key='sk-V5VSU109O3POc_TD6dD0yUhtPQQuPEh5lsUTyD8az7T3BlbkFJrSJZnvZtNWvJcNMR_5-Odnaj44B6xEdIzcABe_YSkA')
import logging

logger = logging.getLogger(__name__)




def answer_question(question):
    try:
        response = client.chat.completions.create(model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful tutor."},
            {"role": "user", "content": question}
        ])
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"OpenAI API error: {e}")
        return "I'm sorry, I don't have enough information to answer that question accurately."

