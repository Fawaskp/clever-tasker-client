//Add modal handler
const modal = document.getElementById("task-add-modal");
const openModalButton = document.getElementById("task-add-btn");
const closeModalButton = document.getElementById("close-modal");
const cancelBtn = document.getElementById("cancel-btn");

openModalButton.addEventListener("click", () => {
modal.classList.remove("hidden");
});

closeModalButton.addEventListener("click", () => {
    modal.classList.add("hidden");
});

cancelBtn.addEventListener("click", () => {
modal.classList.add("hidden");
});

window.addEventListener("click", (event) => {
if (event.target === modal) {
    modal.classList.add("hidden");
}
});


// Edit modal handler
function openEditModal(event) {
    document.getElementById("task-edit-id").value = event.id;
    document.getElementById("task-edit-title").value = event.title;
    document.getElementById("task-edit-description").value = event.description;
    console.log("STARTTTT --> ", event.start);
    document.getElementById("task-edit-start").value = event.start.split("+")[0];
  
    const modal = document.getElementById("task-edit-modal");
    modal.classList.remove("hidden");
    document
      .getElementById("close-edit-modal")
      .addEventListener("click", () => modal.classList.add("hidden"));
    document
      .getElementById("cancel-task-edit-modal")
      .addEventListener("click", () => {
        modal.classList.add("hidden");
      });
}
  

// Delte modal handler
function openDeleteModal(taskId, taskTitle) {
document.getElementById("deleting-task-title").textContent = taskTitle;
document.getElementById("task-delete-id").value = taskId;
const modal = document.getElementById("task-delete-modal");
modal.classList.remove("hidden");

document
    .getElementById("task-delete-modal")
    .addEventListener("click", (btn) => {
    modal.classList.add("hidden");
    });
document
    .getElementById("close-task-delete-modal")
    .addEventListener("click", (btn) => {
    modal.classList.add("hidden");
    });
}