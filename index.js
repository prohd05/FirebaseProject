import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp, doc, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const taskAdder = document.getElementById("addDiv");
    
    // Add Order
    taskAdder.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titleV = document.getElementById("taskTitle").value;
    const descV = document.getElementById("taskDesc").value;

    try {
      await addDoc(collection(db, "tasks"), {
        
        title: titleV,
        desc: descV,
        completed: false,
        createdAt: serverTimestamp()
      });
      console.log("Task Added:" + titleV);
      window.location.reload();
    } catch (error) {
      alert("Error placing order: " + error.message);
      console.error("Order error:", error);
    }
  });
});

  // Orders Listed

  document.addEventListener("DOMContentLoaded", async () => { // Wait for the DOM to fully load before executing the code
    // Select the collection
    const ordersCollection = collection(db, "tasks"); // Reference to the "orders" collection in Firestore
  
    try { // Use getDocs to retrieve all documents from the collection
      // Retrieve all documents from the collecti                                                                                                                                                                            on
      const querySnapshot = await getDocs(ordersCollection); // Get a snapshot of the "orders" collection
  
      // Debugging: Print the snapshot to the console
      console.log("Query Snapshot:", querySnapshot); // This will show the structure of the snapshot and help identify any issues
  
      // Store documents in an array
      const orders = []; // Initialize an empty array to hold the orders
      querySnapshot.forEach((doc) => { // Iterate through each document in the snapshot and push its data into the orders array
        orders.push({ // Create an object for each document with its ID and data
          id: doc.id, // Include the document ID in the order object
          ...doc.data(), // Spread the document data into the order object
        });
      });
  
      // Debugging: Print the orders array to the console
      console.log("Orders Array:", orders); // This will show the array of orders retrieved from Firestore and help verify that the data is being processed correctly
  
      // Display data on the webpage
      const list = document.getElementById("viewTasks"); // Select the HTML element where the orders will be displayed
      orders.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = `${task.title} ${task.desc} ${task.completed} ${task.createdAt}`;
        list.appendChild(li);
      });
    } catch (error) { // Handle any errors that occur during the data retrieval process and log them to the console, as well as alert the user
      console.error("Error reading data from Firestore:", error); // Log the error to the console for debugging purposes
      alert("Failed to load tasks" + error); // Alert the user about the failure to load orders
    }
  });