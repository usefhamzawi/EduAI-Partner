from transformers import BertTokenizer, BertForQuestionAnswering
import torch
import logging

logger = logging.getLogger(__name__)

# Load pre-trained model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-large-uncased-whole-word-masking-finetuned-squad')
model = BertForQuestionAnswering.from_pretrained('bert-large-uncased-whole-word-masking-finetuned-squad')

def answer_question(question):
    logger.info(f"Encoding question: {question}")
    inputs = tokenizer.encode_plus(question, return_tensors='pt')
    input_ids = inputs['input_ids']
    token_type_ids = inputs['token_type_ids']

    # Get the model's output
    outputs = model(input_ids, token_type_ids=token_type_ids)
    start_scores, end_scores = outputs.start_logits, outputs.end_logits

    # Get the most likely beginning and end of the answer
    start_idx = torch.argmax(start_scores)
    end_idx = torch.argmax(end_scores) + 1

    answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(input_ids[0][start_idx:end_idx]))
    logger.info(f"Generated answer: {answer}")
    return answer