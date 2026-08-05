import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js"; 
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


    const firebaseConfig = { 
    apiKey: "AIzaSyCWu-oij3RKVep9WxShfchkdm6Y2eGMVz4",
    authDomain: "file-portal-99b92.firebaseapp.com",
    projectId: "file-portal-99b92",
    storageBucket: "file-portal-99b92.firebasestorage.app",
    messagingSenderId: "258932684613",
    appId: "1:258932684613:web:69b190f37cdb2455f0302c",
    measurementId: "G-NJQ4DZ7CZJ"
     };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // This listener runs automatically as soon as the page loads
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // No valid session found -> Boot them back to the login screen
            window.location.href = "index.html"; 
        } else {
            console.log("Access granted to:", user.email);
            // You can safely reveal your protected UI content here
            const welcomeMessage = document.getElementById("welcomeMessage");

        
        const userName = user.displayName || user.email.split("@")[0];

        welcomeMessage.textContent = `Welcome ${userName}`;
        }
    });

    const logoutButtonElement = document.getElementById("logoutButton")

    logoutButtonElement.addEventListener("click",
        async() => {
            try {
                logoutButton.disabled = true;
                logoutButton.textContent = "Logging out...";
                // 5. Trigger Firebase Sign Out
                await signOut(auth);
                console.log("User signed out successfully.");

            } catch (error) {
                console.error("Error signing out:", error.message);
                alert("Logout failed: " + error.message);
            }
        }
    )