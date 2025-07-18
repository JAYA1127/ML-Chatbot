# ML-Chatbot
# 💬 MediCare: ML-Based Healthcare Chatbot

**MediCare** is a web-based AI chatbot designed to assist users with healthcare-related queries, appointment scheduling, and minor diagnosis support. Built using **HTML, CSS, JavaScript**, and powered by a **K-Nearest Neighbors (KNN)** machine learning model, MediCare offers a user-friendly interface and smart, context-aware responses.

---

## 🚀 Features

- 🧠 **Machine Learning Driven:** Uses a KNN model for message classification and response prediction.
- 💡 **Spelling Correction & Similar Word Matching:** Handles minor typos and suggests closely matched queries.
- 💬 **Interactive Floating Chatbox UI:** Clean and elegant design with animated toggle for opening/closing chat.
- 📄 **Predefined Responses:** Trained on various healthcare-related inputs with predefined outputs.
- 🌐 **Fully Web-Based:** No backend or external APIs required – runs entirely in the browser.
- 🖼️ **Image Input Support:** Users can send images for further analysis.
- 🎨 **Custom Styling:** Dark and light blue theme using Google Fonts (Montserrat).

---

## 🧠 How It Works

1. User enters a message in the chat window.
2. Message is compared with a dataset using **Levenshtein Distance** and **KNN algorithm**.
3. The chatbot finds the best match and displays the appropriate response.
4. If no exact match is found, the bot suggests similar words from the dataset.

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **ML Model:** K-Nearest Neighbors (KNN)  
- **Styling:** Google Fonts (Outfit: Montserrat), custom CSS  
- **NLP Techniques:** Spelling correction, string similarity matching

---

## 📁 Project Structure

📦 MediCare-Chatbot/
├── index.html # Main chat UI
├── style.css # Custom styling
├── script.js # Chat logic + ML model
├── model-data.json # Predefined input-response dataset (if used)
└── assets/ # Fonts, images, icons


---

## 🖼️ UI Preview

> ![Chatbox UI](preview-image.png)  
> *A floating chat interface with theme colors, custom fonts, and interactive features.*

---

## 🧪 Example Use Cases

- "I have a fever and headache" → Suggests flu symptoms and remedies.  
- "Book appointment with doctor" → Provides mock booking confirmation.  
- "What is diabetes?" → Offers brief explanation of the condition.

---

## 🏆 Achievements

- Developed during a Google AI/ML Internship.
- Built entirely from scratch using core web technologies.
- Implements real ML logic without third-party AI APIs.

---

## 📜 License

This project is open source under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Open issues or submit pull requests to improve functionality or add new features.

---

## 🔗 Connect with Me

- 💼 [LinkedIn](https://www.linkedin.com/in/your-profile)  
- 🌐 [Portfolio](https://your-portfolio.com)  
- ✉️ Email: your.email@example.com  

---

