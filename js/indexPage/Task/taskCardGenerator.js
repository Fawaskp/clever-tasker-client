// Creating the task card
function createTaskCard(task) {
    const statusColor = getStatusColor(task.status);
    const [day, month, year, time] = separateDateTime(task.start);
  
    const eventItem = document.createElement("div");
    eventItem.classList.add("event-card", "bg-white", "shadow-lg", "rounded-lg", "m-2", "flex", "justify-between", "items-center");
  
    eventItem.appendChild(createDateSection(day, month, year));
    eventItem.appendChild(createTitleSection(task, time, statusColor));
    eventItem.appendChild(createDetailsSection(task));
  
    return eventItem;
  }
  
  // gives the date part of the card
  function createDateSection(day, month, year) {
    const datePart = document.createElement("div");
    datePart.classList.add("p-4");
    datePart.innerHTML = `<p class="font-semibold text-center">${month}</p><p class="font-semibold text-center">${day}</p><p class="font-semibold text-center">${year}</p>`;
    return datePart;
  }
  
  // gives the title, time, and status part of the card
  function createTitleSection(task, time, statusColor) {
    const titlePart = document.createElement("div");
    titlePart.classList.add("flex", "flex-col", "justify-between", "p-4");
  
    titlePart.innerHTML = `
      <h5 class="text-md font-semibold text-gray-800">${task.title}</h5>
      <div>
        <span class="text-gray-500">When:</span> <span>${time}</span>
      </div>
      <span class="px-4 my-2 text-sm border bg-${statusColor}-100 text-${statusColor}-500 border-${statusColor}-500 text-center rounded-full">
        ${task.status}
      </span>`;
  
    return titlePart;
  }
  
  // gives the details part of the card
  function createDetailsSection(task) {
    const detailsPart = document.createElement("div");
    detailsPart.classList.add("w-2/5", "px-2");
  
    detailsPart.innerHTML = `
      <div>
        <p class="text-gray-500">Details:</p> 
        <span class="text-sm">${task.description}</span>
      </div>`;
  
    const btnContainer = createButtonContainer(task);
    detailsPart.appendChild(btnContainer);
  
    return detailsPart;
  }
  
  // gives  the button container (edit, delete, mark as complete)
  function createButtonContainer(task) {
    const [editBtn, deleteBtn, markCompleteBtn] = getButtons(task);
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("float-right", "flex", "justify-between", "items-center");
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);
    btnContainer.appendChild(markCompleteBtn);
  
    return btnContainer;
  }
  
  // gives the status color based on status
  function getStatusColor(status) {
    if (status === "Completed") {
      return "green";
    }
    return "yellow"; 
  }
  