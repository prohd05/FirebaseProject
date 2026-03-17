import { auth, db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const user = auth.currentUser;

// Listen for auth state changes
  onAuthStateChanged(auth, (user) => {
    if (!user) {
        setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    } 
  });

document.addEventListener("DOMContentLoaded", () => {
    const taskAdder = document.getElementById("addDiv");
    
    // Add Order
    taskAdder.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titleV = document.getElementById("taskTitle").value;
    const descV = document.getElementById("taskDesc").value;
    
    try {
      await addDoc(collection(db, "tasks"), {
        userID: user.uid, // Adds userID to doc
        title: titleV, // Task title from input
        desc: descV,   // Task description from input
        completed: false, // New tasks start as not completed
        createdAt: serverTimestamp() // Timestamp for sorting
      });
      console.log("Task Added: " + titleV);
      await displayTasks(); // Refresh the task list dynamically instead of reloading the page
            document.getElementById("taskTitle").value = ""; // Clear title input 
            document.getElementById("taskDesc").value = "";  // Clear description input
    } catch (error) {
       //alert("Error placing order: " + error.message); // Show error to user
        console.error("Order error:", error); // Log error to console
    }
  });
});