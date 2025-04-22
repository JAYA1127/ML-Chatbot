//using KNN Nearest Algorithm for fiding best suitable response 
function levenshteinDistance(a, b) {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function findBestMatch(input, questions) {
    input = input.toLowerCase();
    let minDistance = Infinity;
    let bestMatch = null;

    for (const q of questions) {
        const dist = levenshteinDistance(input, q.toLowerCase());
        if (dist < minDistance) {
            minDistance = dist;
            bestMatch = q;
        }
    }

    // Threshold can be adjusted based on input length
    if (minDistance <= 3) {
        return bestMatch;
    }
    return null;
}




document.addEventListener("DOMContentLoaded", function() { //first html code page will and after that js script code will run 
    //all html elements are loaded with using id 
    const chatbotIcon = document.getElementById("chatbotIcon"); //for chatbot icon
    const chatbotContainer = document.getElementById("chatbotContainer"); //chatbot container 
    const closeChat = document.getElementById("closeChat"); //for closing chatbot chats 
    const chatBody = document.getElementById("chatBody"); //fro the body of chatbot 
    const userInput = document.getElementById("userInput"); //for the input that user gives 
    const sendMessage = document.getElementById("sendMessage"); //sending msg back to user as output 
    const imageInput = document.getElementById("imageInput"); //for image as input 

    chatbotIcon.addEventListener("click", () => chatbotContainer.style.display = "block"); //for opening the chatbot window  
    closeChat.addEventListener("click", () => chatbotContainer.style.display = "none"); //for hiding the chatbot window  
    
    sendMessage.addEventListener("click", () => handleUserMessage(userInput.value)); //for taking input of user when send button is clicked 
    userInput.addEventListener("keypress", function(event) { //if enter is pressed then also take input of user as proceed it 
        if (event.key === "Enter") handleUserMessage(userInput.value);
    });
//taking image as input 
    imageInput.addEventListener("change", function(event) {
        const file = event.target.files[0]; //Gets the first selected file.
        if (file) {
            const reader = new FileReader(); //reads the users input image 
            reader.onload = function(e) { 
                displayUserMessage(`<img src="${e.target.result}" width="100">`); //display the image in chats 
                botReply("I received your image!"); //responding with msg to image 
                botReply("I will analyze this image and help you out !!");
            };
            reader.readAsDataURL(file);
        }
    });

    function handleUserMessage(message) { //for sending adn displaying msg  
        if (!message.trim()) return; //ensures that the input msg is not empty 
        displayUserMessage(message); //display user msg in right side 
        botReply(getResponse(message)); //displaying msg acc to bot response 
        userInput.value = ""; //clearing the input field 
    }
    /*
        
    function handleUserMessage(message) {
        const userMessage = message.trim();
        if (!userMessage) return;
    
        sendMessage(userMessage, "user");
    
        const botResponse = getResponse(userMessage);
        setTimeout(() => {
            sendMessage(botResponse, "bot");
        }, 500);
    
        userInput.value = ""; // clear input field
    }
        */
    

    function displayUserMessage(message) {
        const userMsgDiv = document.createElement("div"); //creating a new div to hold the msgs 
        userMsgDiv.className = "user-message";
        userMsgDiv.innerHTML = message;
        chatBody.appendChild(userMsgDiv);
        scrollToBottom();  // 🔹 Scroll after adding user message
    }

    function botReply(message) { //ensuring a minimum delay of 0.5 sec to seems to be natural 
        setTimeout(() => {
            const botMsgDiv = document.createElement("div");
            botMsgDiv.className = "bot-message";
            botMsgDiv.textContent = message;
            chatBody.appendChild(botMsgDiv); //appending bot replys in the chatbox 
            scrollToBottom();
        }, 500);
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight; //ensures the chat always scrolls to the bottom when a message is added
    }

    const responses = { //a disctionary of key bot responses(each key values pair)
        // Greetings
        "hello": "Hello! Welcome to MediCare. How can I assist you today?",
        "hi": "Hi there! I’m here to help. What can I do for you?",
        "good morning": "Good morning! How can I assist you today?",
        "good afternoon": "Good afternoon! How can I help you?",
        "good evening": "Good evening! What brings you to MediCare today?",
        "hey": "Hey! How can I help you today?",
        "greetings": "Greetings! How may I assist you?",
        "howdy": "Howdy! Need any medical advice?",
        "how are you": [
        "I'm doing great, thank you for asking!",
        "I'm good, how about you?",
        "I'm just a chatbot, but I'm functioning perfectly!"
        ],
        "what’s up": "Not much, just here to help you. What’s going on?",

        // Asking for help
        "i need help": "Of course! Please let me know what you’re experiencing or how I can assist you.",
        "can you help me?": "Absolutely! Please describe your symptoms or let me know what you need help with.",
        "what can you do?": "I can help you with symptom analysis, appointment booking, general health advice, and more. How can I assist you?",
        "i’m not sure what to do": "Don’t worry! Let’s start by understanding what’s wrong. What are you experiencing?",
        "i feel sick": "I’m here to help. Can you describe your symptoms more specifically?",
    
        // Asking for symptoms
        "i’m not feeling well": "I’m sorry to hear that. Can you describe your symptoms?",
        "i have some symptoms": "Please share your symptoms so I can guide you better.",
        "what should I do?": "Let’s start by understanding your symptoms. Can you describe how you’re feeling?",
        "i feel weird": "I understand. Can you explain a bit more about how you’re feeling?",
        "i feel uncomfortable": "Let’s figure this out. What kind of discomfort are you feeling?",
        // Common symptoms and guidance
        "i have a headache": "Headaches can be caused by stress, dehydration, or other factors. Have you been drinking enough water? If it persists, consult a doctor.",
        "i have a fever": "A fever is often a sign of infection. Please monitor your temperature and stay hydrated. If it’s above 102°F, seek medical attention.",
        "i have a cough": "A cough can be due to a cold, flu, or allergies. If it’s persistent or accompanied by chest pain, consult a doctor.",
        "i feel nauseous": "Nausea can be caused by food poisoning, stress, or other issues. Avoid heavy meals and stay hydrated. If it persists, seek medical advice.",
        "i have a sore throat": "A sore throat can be due to a viral infection or allergies. Gargle with warm salt water and stay hydrated. If it lasts more than a week, see a doctor.",
        "i have a rash": "Rashes can be caused by allergies, infections, or skin conditions. Avoid scratching and consult a doctor if it worsens.",
        "i feel dizzy": "Dizziness can be due to dehydration, low blood sugar, or other issues. Sit down, drink water, and eat something light. If it persists, seek medical help.",
        "i have chest pain": "Chest pain can be serious. If it’s severe or accompanied by shortness of breath, seek emergency medical attention immediately.",
        "i have stomach pain": "Stomach pain can be due to indigestion, gas, or other issues. Avoid spicy foods and rest. If it’s severe or persistent, consult a doctor.",
        "i have back pain": "Back pain can be due to poor posture, strain, or other issues. Rest and apply a warm compress. If it persists, see a doctor.",
        "i have a headache": "Headaches can be caused by stress, dehydration, or other factors. Have you been drinking enough water? If it persists, consult a doctor.",
        "i have eye pain": "Eye pain can result from strain, dryness, or infection. Rest your eyes, avoid screens, and rinse with clean water. If the pain continues, seek medical advice.",
        "my eyes are itchy": "Itchy eyes can be from allergies or dryness. Avoid rubbing them, rinse with cold water, and use eye drops if needed. See a doctor if it worsens.",
        "i have itching rashes": "Itchy rashes could be from allergies, insect bites, or skin conditions. Try an anti-itch cream, and avoid scratching. If it spreads or gets worse, consult a doctor.",
        // Diseases and their symptoms
        "what are the symptoms of flu?": "Flu symptoms include fever, cough, sore throat, body aches, and fatigue. Rest and stay hydrated. If symptoms worsen, consult a doctor.",
        "what are the symptoms of covid?": "COVID-19 symptoms include fever, cough, loss of taste or smell, and difficulty breathing. Isolate yourself and get tested if you suspect COVID-19.",
        "what are the symptoms of diabetes?": "Diabetes symptoms include frequent urination, excessive thirst, fatigue, and blurred vision. Consult a doctor for a blood sugar test.",
        "what are the symptoms of high blood pressure?": "High blood pressure often has no symptoms. Regular check-ups are important. If you experience headaches or dizziness, consult a doctor.",
        "what are the symptoms of asthma?": "Asthma symptoms include wheezing, shortness of breath, and chest tightness. Use your inhaler and consult a doctor if symptoms worsen.",
        "what are the symptoms of allergies?": "Allergy symptoms include sneezing, runny nose, itchy eyes, and rashes. Avoid allergens and take antihistamines if needed.",
    
        // General health advice
        "how can I stay healthy?": "Eat a balanced diet, exercise regularly, stay hydrated, and get enough sleep. Regular check-ups are also important.",
        "how to improve immunity?": "Stay active, eat fruits and veggies, get enough sleep, and reduce stress. A healthy lifestyle supports strong immunity!",

        // Doctor recommendations
        "can you recommend a doctor?": "Certainly! Would you like me to recommend a general practitioner or a specialist for your specific symptoms?",
        "i need a specialist": "Got it! Please specify — do you need a cardiologist, dermatologist, ophthalmologist, or another specialist?",

        // Endings
        "afn": "Alright! Have a fantastic night!",
        "goodbye": "Goodbye! Take care and stay healthy.", 
        "good bye": "Byee",
        "goodbyee": "byee take care",
        "thank you": "You're welcome! If you need anything else, I'm here to help.", 
        "thank u": "Welcome",
        "bye": "Goodbye. Have a nice day!",
        "see ya": "See you later! Take care.",
        "that’s all": "Got it! If you need anything else, I’ll be here.",
        "take care": "You too! Stay healthy and safe.",

        //adding more info
        //for doctor-consultation

        "i_need_a_doctor_consultation": 
        [
        "What type of doctor do you need? (e.g., Cardiologist, Neurologist, Dermatologist, Orthopedic, Psychiatrist, Gastroenterologist, Pulmonologist, Endocrinologist, Ophthalmologist, ENT Specialist, Pediatrician)?",
        {
        "Cardiologist": ["Dr. A Kumar", "Dr. B Singh"],
        "Neurologist": ["Dr. C Verma", "Dr. D Yadav"],
        "Dermatologist": ["Dr. E Sharma", "Dr. F Gupta"],
        "Orthopedic": ["Dr. G Mehta", "Dr. H Kapoor"],
        "Psychiatrist": ["Dr. I Reddy", "Dr. J Nair"],
        "Gastroenterologist": ["Dr. K Shah", "Dr. L Das"],
        "Pulmonologist": ["Dr. M Chatterjee", "Dr. N Bajaj"],
        "Endocrinologist": ["Dr. O Agarwal", "Dr. P Malhotra"],
        "Ophthalmologist": ["Dr. Q Bose", "Dr. R Sen"],
        "ENT Specialist": ["Dr. S Patel", "Dr. T Roy"],
        "Pediatrician": ["Dr. U Joshi", "Dr. V Menon"]
        }
        ],
        //for medical test
        "medical_test_suggestion": 
        [
        "What symptoms are you experiencing? (e.g., Diabetes, Typhoid, Dengue, Hypertension, Anemia, Thyroid Issues, Asthma, Liver Disease, Kidney Disease, Arthritis, Eye Problems)?",
        {
        "Diabetes": ["Blood Sugar Test", "HbA1c Test"],
        "Typhoid": ["Widal Test", "Blood Culture Test"],
        "Dengue": ["Dengue NS1 Antigen Test", "Dengue IgM/IgG Test"],
        "Hypertension": ["Blood Pressure Monitoring", "Electrocardiogram (ECG)", "Lipid Profile Test"],
        "Anemia": ["Complete Blood Count (CBC)", "Iron Studies", "Vitamin B12 Test"],
        "Thyroid Issues": ["TSH Test", "T3 & T4 Test"],
        "Asthma": ["Spirometry", "Allergy Testing"],
        "Liver Disease": ["Liver Function Test (LFT)", "Ultrasound Abdomen"],
        "Kidney Disease": ["Creatinine Test", "Urinalysis", "Kidney Function Test (KFT)"],
        "Arthritis": ["Rheumatoid Factor Test", "ESR Test", "X-ray of Joints"],
        "Eye Problems": ["Vision Test", "OCT Scan", "Retinal Examination"]
        }
        ],
        //for general advice
        "general_health_advice": [
        "1. Ensure a balanced diet, regular exercise, and routine health checkups.\n",
        "2. Would you like tips on mental health, nutrition, or fitness?\n",
        "3. Get at least 7-8 hours of sleep every night for overall well-being.\n",
        "4. Stay hydrated by drinking at least 8 glasses of water daily.\n",
        "5. Avoid excessive consumption of processed foods and focus on whole foods.\n",
        "6. Regular physical activity can help prevent many health conditions.\n",
        "7. Practicing mindfulness and stress management techniques improves mental health."
        ],
        "emergency_assistance": [
        "1. If this is a medical emergency, please call emergency services or visit the nearest hospital immediately.\n",
        "2. Would you like to find the nearest emergency center?\n",
        "3. For a suspected heart attack, seek immediate medical help and try to stay calm.\n",
        "4. In case of severe allergic reactions, use an epinephrine injection if available and get medical assistance immediately.\n",
        "5. For burns, run cool (not cold) water over the affected area and seek medical attention if necessary.\n",
        "6. For choking, attempt the Heimlich maneuver or seek immediate medical assistance.\n",
        "7. If someone is unconscious but breathing, place them in the recovery position and call emergency services."
        ],

        //important information
        "faq_information": 
        [
        "I can answer frequently asked questions, explain medical conditions, and provide information about medications. Please note that this is for informational purposes only and should not be considered medical advice.",
        "Would you like to know more about a specific condition or medication?"
        ],

        //symptons
        "triage_symptoms": 
        [
        "I can help you assess your symptoms and suggest whether you should see a doctor. What symptoms are you experiencing?"
        ],

        //appointment management
        "appointment_management": 
        [
        "Would you like to schedule an appointment with a doctor? I can also provide reminders and manage your bookings."
        ],

        //website nagivation
        "website_navigation": 
        [
        "I can help you find information on our website. What are you looking for?"
        ],
        //resouces
        "medical_resources": [
        "Here are some vetted medical resources for more detailed information: [Link 1], [Link 2], [Link 3]."
        ]
    };

    function getResponse(input) {
        const questionList = Object.keys(responses);
        const matched = findBestMatch(input, questionList);
    
        if (matched) {
            return responses[matched];
        } else {
            return "I'm sorry, I didn't quite understand that. Could you please rephrase?";
        }
    }
    
});
