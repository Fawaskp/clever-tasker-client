var globalTasks = []

function toastify(message,type){
  Toastify({
    text:message,
    duration: 3000, 
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true,
    backgroundColor: type == 'error'
    ? "linear-gradient(315deg, #ff0000, #ff4d4d)"
    : "linear-gradient(315deg, #36d348, #51da22)",
    className: "!rounded-lg shadow-lg",
  }).showToast()

}

function changeCompleteStatus(taskId,status){
  const url = status=='Completed'? 'uncompleted' : 'completed' 
  try{
    fetch(`${TASK_API_URL}/mark-${url}/${taskId}/`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    }).then((response)=>{
      if(response.ok){
        if(url=='uncompleted'){
          toastify('Task marked as Un-Completed.')
        }
        else{
          toastify('Task marked as Completed.')
        }
        loadTasks()
      }
    })
  }
  catch(err){
    console.log('Something went wrong while chaning complete status: ',err)
  }
}


// Load tasks
function loadTasks() {
  let queryParams = new URLSearchParams(window.location.search);
  let status = queryParams.get('status')
  let filter='';
  if(status){
    filter = `status=${status}`
  }

  fetch(`${TASK_API_URL}/?${filter}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((events) => {
      const tasks = events.results;
      initCalendar(tasks);
      console.log("Events", tasks);

      globalTasks = tasks;
      const eventList = document.getElementById("eventList");
      const totalTaskCountEl = document.getElementById("total-task-count");
      totalTaskCountEl.textContent = events.total_count;

      // Dynamically generate task cards
      if (tasks.length > 0) {
        eventList.innerHTML = ""; 
        tasks.forEach((task) => {
          const eventItem = createTaskCard(task);
          eventList.appendChild(eventItem);
        });
      } else {
        eventList.innerHTML = `<div class="w-full bg-gray-200 text-center rounded-lg p-4 select-none">No Tasks to show</div>`;
      }
    })
    .catch((error) => console.error("Error fetching events:", error));
}


// Render the calendar
function initCalendar(event_list = []) {
  console.log("event list form calendar: ", event_list);
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: event_list,
    eventClick: function (info) {
      const event = info.event;

      document.getElementById("task-detailed-view-title").innerText =
        event.title;
      document.getElementById("task-detailed-view-description").innerText =
        event.extendedProps.description || "No description available";
      document.getElementById("task-detailed-view-start").innerText =
        event.start.toLocaleString();

      const modal = document.getElementById("task-detailed-view-modal");
      modal.classList.remove("hidden");

      document
        .getElementById("task-detailed-view-close-modal")
        .addEventListener("click", function () {
          modal.classList.add("hidden");
        });
    },
  });
  calendar.render();
}

window.onload = function () {
  activeInitialTab()
  initialTaskLoad()
  asssignUserName();
  ready_logout();
};