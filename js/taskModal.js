const modal = document.getElementById("task-add-modal");
const openModalButton = document.getElementById("task-add-btn");
const closeModalButton = document.getElementById("close-modal");
const cancelBtn = document.getElementById("cancel-btn");

// Show the modal
openModalButton.addEventListener("click", () => {
modal.classList.remove("hidden");
});

// Close the modal when clicking the close button
closeModalButton.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Close the modal when clicking the cancel button
cancelBtn.addEventListener("click", () => {
modal.classList.add("hidden");
});

// Close the modal when clicking outside
window.addEventListener("click", (event) => {
if (event.target === modal) {
    modal.classList.add("hidden");
}
});