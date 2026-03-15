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
    await displayTasks();
  });

  async function displayTasks() {
    // Select the collection
    const ordersCollection = collection(db, "tasks"); // Reference to the "tasks" collection in Firestore
  
    try { // Use getDocs to retrieve all documents from the collection
      // Retrieve all documents from the collection
      const querySnapshot = await getDocs(ordersCollection); // Get a snapshot of the "tasks" collection
  
      // Store documents in an array
      const orders = []; // Initialize an empty array to hold the orders
      querySnapshot.forEach((doc) => { // Iterate through each document in the snapshot and push its data into the orders array
        orders.push({ // Create an object for each document with its ID and data
          id: doc.id, // Include the document ID in the order object
          ...doc.data(), // Spread the document data into the order object
        });
      });
  
      // Sort orders by createdAt descending (newest first)
      orders.sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
  
      // Display data on the webpage
      const list = document.getElementById("viewTasks"); // Select the HTML element where the orders will be displayed
      list.innerHTML = ''; // Clear existing content
      orders.forEach((task) => {
        const card = document.createElement("div"); // Created a div for that task.
        card.className = "card"; // Gives the div the classname "card". 
        
        const title = document.createElement("h1"); // Adds the title. 
        title.textContent = task.title; // Sets title to the title value in the database.
        card.appendChild(title); // Puts the title in the card div.
        
       
        const buttonDiv = document.createElement("div"); // Adds div for the buttons
        buttonDiv.className = "sideButtons"; // Gives the div the classname "sideButtons".

        const statusButton = document.createElement("button"); // Adds the status button on the side

        // Manages status button.
        statusButton.textContent = task.completed ? "Completed" : "Mark Complete"; // Checks boolean to see if completed or not
        statusButton.addEventListener("click", async () => {
          try {
            await updateDoc(doc(db, "tasks", task.id), { // When clicked, it will revese the boolean value in database
              completed: !task.completed
            });
            await displayTasks(); // Refresh the list
          } catch (error) {
            alert("Error updating task: " + error.message);
          }
        });
        buttonDiv.appendChild(statusButton); // Puts the status button in the side button div
        
        const removeButton = document.createElement("button"); // Adds the remove button on the side
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", async () => {
          try {
            await deleteDoc(doc(db, "tasks", task.id)); // When clicked, it will delete the document from the database
            await displayTasks(); // Refresh the list
          } catch (error) {
            alert("Error deleting task: " + error.message);
          }
        });
        buttonDiv.appendChild(removeButton); // Puts the remove button in the side button div
        card.appendChild(buttonDiv);  // Puts the side button div in the card div
        
        const separator = document.createElement("div"); // Adds a div
        separator.className = "seperator"; // Gives the div the classname "separator".
        
        const descH4 = document.createElement("h4"); // Adds the description.
        descH4.textContent = "Desc: " + task.desc; // Adds the value from the database to the description text.
        separator.appendChild(descH4); // Puts the description in the separator div
        
        const statusH4 = document.createElement("h4"); // Adds the status.
        statusH4.textContent = "Status: " + (task.completed ? "Completed" : "Pending"); // Changes text value for when button is clicked.
        separator.appendChild(statusH4); // Puts the status in the separator div
        
        card.appendChild(separator); // Puts the separator div in the card div
        
        list.appendChild(card); // Puts the card div in the list div.
      });
    } catch (error) { // Handle any errors that occur during the data retrieval process and log them to the console, as well as alert the user
      console.error("Error reading data from Firestore:", error); // Log the error to the console for debugging purposes
      alert("Failed to load tasks: " + error.message); // Alert the user about the failure to load orders
    }
  }