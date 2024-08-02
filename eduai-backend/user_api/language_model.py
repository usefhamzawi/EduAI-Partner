from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch

model_name = "google/flan-t5-small"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

def answer_question(question):
    input_text = f"Answer the following question: {question}"
    
    inputs = tokenizer(input_text, return_tensors="pt", max_length=512, truncation=True).to(device)
    
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=100,
            num_return_sequences=1,
            temperature=0.7,
            top_p=0.95,
            do_sample=True,
        )
    
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    # Truncate the answer to the first two sentences or a maximum of 150 characters
    sentences = answer.split('.')
    answer = '. '.join(sentences[:2]).strip()
    if len(answer) > 150:
        answer = answer[:147] + "..."
    
    return answer if answer else "I'm sorry, I don't have enough information to answer that question accurately."