import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js"; 
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const loginButtonElement = document.getElementById("loginButton")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")

  const firebaseConfig = {
    apiKey: "AIzaSyCWu-oij3RKVep9WxShfchkdm6Y2eGMVz4",
    authDomain: "file-portal-99b92.firebaseapp.com",
    projectId: "file-portal-99b92",
    storageBucket: "file-portal-99b92.firebasestorage.app",
    messagingSenderId: "258932684613",
    appId: "1:258932684613:web:69b190f37cdb2455f0302c",
    measurementId: "G-NJQ4DZ7CZJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app)

  console.log("Firebase Auth initialized successfully:", auth);

  

loginButtonElement.addEventListener("click",
    async () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        // Optional basic client-side validation
            if (!email || !password) {
                alert("Please fill in all fields.");
                return;
            }

        // Disable button during network request to prevent double submissions
        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            console.log("Welcome!", userCredential.user.email);
            window.location.href = "dashboard.html"; 

        } catch (error) {
            console.log("Login failed:", error.code, error.message)
            alert("Error:", error.message)
        }
  })