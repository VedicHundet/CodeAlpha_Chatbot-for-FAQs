import streamlit as st
import pandas as pd
import spacy
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load NLP model
nlp = spacy.load("en_core_web_md")

# Load FAQs
@st.cache_data
def load_faqs():
    df = pd.read_csv("faqs.csv.csv")
    questions = df['Question'].astype(str).tolist()
    answers = df['Answer'].astype(str).tolist()
    vectors = [nlp(q).vector for q in questions]
    return questions, answers, vectors

faq_questions, faq_answers, faq_vectors = load_faqs()

# Find best answer
def get_faq_answer(user_input):
    user_vec = nlp(user_input).vector
    similarities = cosine_similarity([user_vec], faq_vectors)
    best_idx = int(np.argmax(similarities))
    return faq_answers[best_idx]

# Streamlit UI
st.title("💬 Banking FAQ Chatbot")
user_input = st.text_input("Ask me anything about our banking services:")

if user_input:
    response = get_faq_answer(user_input)
    st.markdown(f"**Answer:** {response}")
