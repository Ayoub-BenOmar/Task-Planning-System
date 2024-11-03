// Getting all the elements we need from HTML
let createBtn = document.getElementById("openModal");
let addModal = document.getElementById("taskModal");
let closeModal = document.getElementById("closeModal");
let taskForm = document.getElementById("form");

// Getting the three lists: Todo, Progress, and Done
let ToDoList = document.getElementById("todo-list");
let progressList = document.getElementById("progress-list");
let doneList = document.getElementById("done-list");

// Getting the counters for each list
let ToDoCount = document.getElementById("ToDo-Counter");
let progressCount = document.getElementById("Progress-Counter");
let doneCount = document.getElementById("Done-Counter");

// Initialize counters at 0
let todoCounter = 0;
let progressCounter = 0;
let doneCounter = 0;

// Open and close modal functions
createBtn.onclick = function() {
    addModal.classList.remove("hidden");
};

closeModal.onclick = function() {
    addModal.classList.add("hidden");
};

// Simple function to update the counter numbers
function updateCounters() {
    ToDoCount.textContent = todoCounter;
    progressCount.textContent = progressCounter;
    doneCount.textContent = doneCounter;
}

// Function to move task between lists
function moveTask(taskCard, newStatus) {
    // First, decrease the counter of the current list
    if (taskCard.parentElement === ToDoList) {
        todoCounter--;
    } else if (taskCard.parentElement === progressList) {
        progressCounter--;
    } else if (taskCard.parentElement === doneList) {
        doneCounter--;
    }

    // Then move the task to the new list and increase its counter
    if (newStatus === "C1") {
        ToDoList.appendChild(taskCard);
        todoCounter++;
    } else if (newStatus === "C2") {
        progressList.appendChild(taskCard);
        progressCounter++;
    } else if (newStatus === "C3") {
        doneList.appendChild(taskCard);
        doneCounter++;
    }

    // Update the display of all counters
    updateCounters();
}

// When the form is submitted to create a new task
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get all the values from the form
    let title = document.getElementById("task-title").value;
    let description = document.getElementById("description").value;
    let priority = document.getElementById("priority").value;
    let date = document.getElementById("date").value;
    let status = document.getElementById("status").value;

    // verification
    if (title === "") {
        alert("Title cannot be empty.");
        return;
    }
    if (description === "") {
        alert("Description cannot be empty.");
        return;
    }
    if (priority === "") {
        alert("Please select a priority.");
        return;
    }
    if (status === "") {
        alert("Please select a status.");
        return;
    }
    if (date === "") {
        alert("Please select a due date.");
        return;
    }

    // Create a new task card
    let taskCard = document.createElement("div");
    taskCard.classList.add("p-4", "rounded-lg", "shadow-md", "border-4");

    // Add the content to the task card with SVG buttons
    taskCard.innerHTML = `
        <div class="flex justify-between">
            <div>
                <h3 class="font-semibold text-lg">${title}</h3>
                <p>${description}</p>
                <span>${date}</span>
            </div>
            <div>
                <div>
                    <button type="button" aria-label="Edit status" class="relative p-2 rounded">
                        <svg
                            class="w-6 h-6 text-gray-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"
                        >
                            <path d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                        </svg>
                        <select
                            class="status-select absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            aria-label="Change status"
                        >
                            <option value="C1">To Do</option>
                            <option value="C2">In Progress</option>
                            <option value="C3">Done</option>
                        </select>
                    </button>
                </div>
                <div>
                    <button type="button" class="delete-btn p-2 rounded" aria-label="Delete">
                        <svg
                            class="w-6 h-6 text-gray-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"             
                        >
                            <path d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>`;

    // Add color based on priority
    if (priority === "P1") {
        taskCard.classList.add("border-red-400");
    } else if (priority === "P2") {
        taskCard.classList.add("border-yellow-400");
    } else if (priority === "P3") {
        taskCard.classList.add("border-green-400");
    }

    // Add event listener for status change
    let statusSelect = taskCard.querySelector(".status-select");
    statusSelect.addEventListener("change", function() {
        moveTask(taskCard, this.value);
    });

    // Add event listener for delete button
    let deleteBtn = taskCard.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function() {
        // Decrease the counter of the list the task is being deleted from
        if (taskCard.parentElement === ToDoList) {
            todoCounter--;
        } else if (taskCard.parentElement === progressList) {
            progressCounter--;
        } else if (taskCard.parentElement === doneList) {
            doneCounter--;
        }
        // Remove the task and update counters
        taskCard.remove();
        updateCounters();
    });

    // Add task to the correct list based on initial status
    if (status === "S1") {
        ToDoList.appendChild(taskCard);
        todoCounter++;
    } else if (status === "S2") {
        progressList.appendChild(taskCard);
        progressCounter++;
    } else if (status === "S3") {
        doneList.appendChild(taskCard);
        doneCounter++;
    }

    // Update counters, reset form, and close modal
    updateCounters();
    taskForm.reset();
    addModal.classList.add("hidden");
});