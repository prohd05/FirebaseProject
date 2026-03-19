import { auth, db } from "./firebase-config.js";
import { collection, doc, addDoc, getDoc , serverTimestamp} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const user = auth.currentUser;

// Listen for auth state changes
  onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const un = document.getElementById("unAdd"); // Get the element to display the username
      const userRef = doc(db, "users", user.uid); // Reference to users/{uid}
      const userSnapshot = await getDoc(userRef); // Get the user document from Firestore
      const username = userSnapshot.data(); // Get data from Firestore
      un.textContent = username.username; // Set the username in the navbar
    } catch (error) {
      console.error("Error fetching user:", error); 
    }

  } else {
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  }
});

  /// Sign Out Button
    const logoutButt = document.getElementById("logoutAdd"); // Select the logout button using its ID
    logoutButt.addEventListener("click", async () => {
    try {
      await signOut(auth);
      //alert("Logged out successfully!");
      window.location.href = "login.html";
    } catch (error) {
      console.log("Error logging out: " + error.message);
    }
    });

document.addEventListener("DOMContentLoaded", () => {
    const taskAdder = document.getElementById("addDiv");
    
    // Add Order
    taskAdder.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titleV = document.getElementById("taskTitle").value;
    const descV = document.getElementById("taskDesc").value;
    const dueV = document.getElementById("taskDate").value;
    const user = auth.currentUser;
    
    try {
      await addDoc(collection(db, "tasks"), {
        userID: user.uid, // Adds userID to doc
        title: titleV, // Task title from input
        desc: descV,   // Task description from input
        dueDate: dueV,   // Task due date from input
        completed: false, // New tasks start as not completed
        createdAt: serverTimestamp() // Timestamp for sorting
      });
      console.log("Task Added: " + titleV);
            document.getElementById("taskTitle").value = ""; // Clear title input 
            document.getElementById("taskDesc").value = "";  // Clear description input
            document.getElementById("taskDate").value = "";  // Clear dueDate input
    } catch (error) {
        //alert("Error placing order: " + error.message); // Show error to user
        console.error("Order error:", error); // Log error to console
    }
  });
});

const backButt = document.getElementById("backButton");

// Add event listener to button before appending to page
backButt.addEventListener("click", () => {
  window.location.href = "index.html";
  });