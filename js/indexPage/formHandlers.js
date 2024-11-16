// Add Task
const taskAddForm = document.getElementById("task-add-form");

const startFormLoading = (formLoader, formBtnText) => {
  formLoader.classList.remove("hidden");
  formBtnText.classList.add("hidden");
};

const stopFormLoading = (formLoader, formBtnText) => {
  formLoader.classList.add("hidden");
  formBtnText.classList.remove("hidden");
};

taskAddForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formLoader = document.getElementById("task-add-form-loader");
  const formBtnText = document.getElementById("task-add-form-submit-btn-text");
  const responseMessage = document.getElementById("task-add-response-message");
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
      responseMessage.textContent = "Task successfully added!";
      responseMessage.classList.remove("hidden");
      responseMessage.classList.add("text-green-500");

      taskAddForm.reset();
      loadTasks();
      setTimeout(() => {
        responseMessage.classList.add("hidden")
        modal.classList.add("hidden")
    }, 1000);
    } else {
      response.json().then((result) => console.log(result));

      responseMessage.textContent = "Failed to add task. Please try again.";
      responseMessage.classList.remove("hidden");
      responseMessage.classList.add("text-red-500");
    }
  } catch (error) {
    stopFormLoading(formLoader, formBtnText);
    console.error("Task Add Error:>> ", error);
    responseMessage.textContent = "An error occurred. Please try again.";
    responseMessage.classList.remove("hidden");
    responseMessage.classList.add("text-red-500");
  }
});

// Edit Task
const taskEditForm = document.getElementById("task-edit-form");

taskEditForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formLoader = document.getElementById("task-edit-form-loader");
  const modal = document.getElementById("task-edit-modal");
  const formBtnText = document.getElementById("task-edit-form-submit-btn-text");
  const responseMessage = document.getElementById("task-edit-response-message");
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
      responseMessage.textContent = "Task edited successfully!";
      responseMessage.classList.remove("hidden");
      responseMessage.classList.add("text-green-500");

      taskEditForm.reset();
      loadTasks();
      setTimeout(() => {
        modal.classList.add("hidden")
        responseMessage.classList.add("hidden")
      }, 1000);
    } else {
      response.json().then((result) => console.log(result));

      responseMessage.textContent = "Failed to edit task. Please try again.";
      responseMessage.classList.remove("hidden");
      responseMessage.classList.add("text-red-500");
    }
  } catch (error) {
    stopFormLoading(formLoader, formBtnText);
    console.error("Task edit Error:>> ", error);
    responseMessage.textContent = "An error occurred. Please try again.";
    responseMessage.classList.remove("hidden");
    responseMessage.classList.add("text-red-500");
  }
});

// Delete Task
const taskDeleteForm = document.getElementById("task-delete-form");

taskDeleteForm.addEventListener("click", async (event) => {
  event.preventDefault();

  const formData = new FormData(taskDeleteForm);
  const responseMessage = document.getElementById(
    "task-delete-response-message"
  );
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
      setTimeout(() => {
        responseMessage.classList.add('hidden')
        modal.classList.add("hidden");
      }, 1000);
    } else {
      response.json().then((result) => console.log(result));
      responseMessage.textContent = "Failed to edit task. Please try again.";
      responseMessage.classList.remove("hidden");
      responseMessage.classList.add("text-red-500");
    }
  } catch (err) {
    stopFormLoading(formLoader, formBtnText);
    console.log(err);
  }
});
