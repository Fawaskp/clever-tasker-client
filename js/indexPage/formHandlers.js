const startFormLoading = (formLoader, formBtnText) => {
  formLoader.classList.remove("hidden");
  formBtnText.classList.add("hidden");
};

const stopFormLoading = (formLoader, formBtnText) => {
  formLoader.classList.add("hidden");
  formBtnText.classList.remove("hidden");
};


// Add Task
const taskAddForm = document.getElementById("task-add-form");

taskAddForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formLoader = document.getElementById("task-add-form-loader");
  const formBtnText = document.getElementById("task-add-form-submit-btn-text");
  const formData = new FormData(taskAddForm);

  startFormLoading(formLoader, formBtnText);
  try {
    const response = await fetch(`${TASK_API_URL}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    if (response.ok) {
      stopFormLoading(formLoader, formBtnText);
      taskAddForm.reset();
      loadTasks();
      modal.classList.add("hidden")
      toastify("Task successfully added!")
    } else {
      response.json().then((result) => console.log("Error->",result));
      toastify("Failed to add task. Please try again.","error")
    }
  } catch (error) {
    stopFormLoading(formLoader, formBtnText);
    console.error("Task Add Error:>> ", error);
    toastify("An error occurred. Please try again.","error")
  }
});


// Edit Task
const taskEditForm = document.getElementById("task-edit-form");

taskEditForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formLoader = document.getElementById("task-edit-form-loader");
  const modal = document.getElementById("task-edit-modal");
  const formBtnText = document.getElementById("task-edit-form-submit-btn-text");
  const taskId = document.getElementById("task-edit-id").value;
  const formData = new FormData(taskEditForm);

  startFormLoading(formLoader, formBtnText);
  try {
    const response = await fetch(`${TASK_API_URL}/detail/${taskId}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (response.ok) {
      stopFormLoading(formLoader, formBtnText);
      taskEditForm.reset();
      loadTasks();
      modal.classList.add("hidden")
      toastify("Task edited successfully!")
    } else {
      response.json().then((result) => console.log(result));
      toastify("Failed to edit task. Please try again.")
    }
  } catch (error) {
    stopFormLoading(formLoader, formBtnText);
    console.error("Task edit Error:>> ", error);
    toastify("An error occurred. Please try again.","error")
  }
});


// Delete Task
const taskDeleteForm = document.getElementById("task-delete-form");

taskDeleteForm.addEventListener("click", async (event) => {
  event.preventDefault();

  const formData = new FormData(taskDeleteForm);
  const taskId = document.getElementById("task-delete-id").value;
  const formLoader = document.getElementById("task-delete-form-loader");
  const formBtnText = document.getElementById(
    "task-delete-form-submit-btn-text"
  );
  const modal = document.getElementById("task-delete-modal");

  startFormLoading(formLoader, formBtnText);
  try {
    const response = await fetch(`${TASK_API_URL}/detail/${taskId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    stopFormLoading(formLoader, formBtnText);
    if (response.status == 204) {
      taskDeleteForm.reset();
      loadTasks();
      modal.classList.add("hidden");
      toastify("Task Deleted Successfully!")
    } else {
      response.json().then((result) => console.log(result));
      toastify("Failed to edit task. Please try again.","error")
    }
  } catch (err) {
    stopFormLoading(formLoader, formBtnText);
    console.log(err);
    toastify("An error occurred. Please try again.","error")
  }
});