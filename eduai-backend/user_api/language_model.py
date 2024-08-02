import openai

# Set your OpenAI API key
openai.api_key = 'sk-V5VSU109O3POc_TD6dD0yUhtPQQuPEh5lsUTyD8az7T3BlbkFJrSJZnvZtNWvJcNMR_5-Odnaj44B6xEdIzcABe_YSkA'

def answer_question(question):
    input_text = f"Answer the following question: {question}"

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful tutor."},
            {"role": "user", "content": input_text},
        ],
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.7,
        top_p=0.95,
    )

    answer = response.choices[0].message['content'].strip()

    # Truncate the answer to the first two sentences or a maximum of 150 characters
    sentences = answer.split('.')
    answer = '. '.join(sentences[:2]).strip()
    if len(answer) > 150:
        answer = answer[:147] + "..."

    return answer if answer else "I'm sorry, I don't have enough information to answer that question accurately."