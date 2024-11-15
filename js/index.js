var globalTasks = []
let TASK_API_URL = "http://localhost:8000/task/api";

// Assigning logged-n username at page top
const asssignUserName = () => {
  const current_user = JSON.parse(localStorage.getItem("current_user"));
  console.log(current_user);
  document.getElementById("user-name").textContent = current_user.name;
};


// Handle Tab Switching
function changeTabTo(tab){

  let queryParams = new URLSearchParams(window.location.search);
  queryParams.set('tab',tab)
  history.replaceState(null,null,'?'+queryParams.toString())

  if(tab=='tasks'){
    document.getElementById("tab1Content").classList.remove("active");
    document.getElementById("tab2Content").classList.add("active");
  }
  else{
    document.getElementById("tab1Content").classList.add("active");
    document.getElementById("tab2Content").classList.remove("active");
  }
}

document.getElementById("tab1Btn").addEventListener("click", function () {
  document.getElementById("tab1Content").classList.add("active");
  document.getElementById("tab2Content").classList.remove("active");
  this.classList.add("bg-gray-300");
  document.getElementById("tab2Btn").classList.remove("bg-gray-300");
  changeTabTo('calendar')
  initCalendar(globalTasks)
});

document.getElementById("tab2Btn").addEventListener("click", function () {
  document.getElementById("tab2Content").classList.add("active");
  document.getElementById("tab1Content").classList.remove("active");
  this.classList.add("bg-gray-300");
  document.getElementById("tab1Btn").classList.remove("bg-gray-300");
  changeTabTo('tasks')
});

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
        loadTasks()
      }
    })
  }
  catch(err){
    console.log('Something went wrong while chaning complete status: ',err)
  }
}

function getButtons(event) {

  const commonClasses = [
    "text-white",
    "p-2",
    "text-sm",
    "rounded-full",
    "focus:outline-none",
  ];

  const editBtn = document.createElement("button");
  editBtn.classList.add(
    "hover:bg-gray-200",
    "mr-2",
    ...commonClasses
  );
  editBtn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"
  x="0px"
  y="0px"
  width="15"
  height="15"
  viewBox="0 0 72 72"
>
  <path
    d="M38.406 22.234l11.36 11.36L28.784 54.576l-12.876 4.307c-1.725.577-3.367-1.065-2.791-2.79l4.307-12.876L38.406 22.234zM41.234 19.406l5.234-5.234c1.562-1.562 4.095-1.562 5.657 0l5.703 5.703c1.562 1.562 1.562 4.095 0 5.657l-5.234 5.234L41.234 19.406z"
  ></path>
</svg>`;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("hover:bg-gray-200", ...commonClasses);
  deleteBtn.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  x="0px"
  y="0px"
  width="15"
  height="15"
  viewBox="0 0 30 30"
>
  <path
    d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"
  ></path>
</svg>`;

  let markCompleteIcon = `Mark completed <svg class="ms-4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
  <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
  </svg>`

  if(event.status == 'Completed'){
      markCompleteIcon = `Mark Uncompleted <svg class="ms-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="17" height="17" viewBox="0 0 40 40">
  <path fill="#f78f8f" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"></path><path fill="#c74343" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"></path><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-134.999 20 20)"></path><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-45.001 20 20)"></path>
  </svg>`
    }

  const markCompleteBtn = document.createElement('button')
  markCompleteBtn.classList.add( "text-black", 
    "hover:bg-gray-100", 
    "font-medium", 
    "rounded-lg", 
    "text-sm", 
    "px-2", 
    "py-2", 
    "text-center", 
    "inline-flex", 
    "items-center", 
    "dark:hover:bg-gray-100")
    markCompleteBtn.innerHTML = markCompleteIcon

  editBtn.addEventListener("click", () => openEditModal(event));
  deleteBtn.addEventListener("click", () =>
    openDeleteModal(event.id, event.title)
  );
  markCompleteBtn.addEventListener('click', ()=>{
    changeCompleteStatus(event.id,event.status)
  })

  return [editBtn, deleteBtn, markCompleteBtn];
}


function separateDateTime(datetimeStr) {
  const dateObj = new Date(datetimeStr);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()].toLowerCase();
  const year = dateObj.getFullYear();

  const time = dateObj.toLocaleTimeString([], {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  return [day, month, year, time];
}

// Load tasks
function loadTasks(filter="") {

  fetch(`${TASK_API_URL}/list-create/?${filter}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((events) => {
      const tasks = events.results
      initCalendar(tasks);
      console.log("Events", tasks);
      globalTasks = tasks
      const eventList = document.getElementById("eventList");
      const totalTaskCountEl = document.getElementById("total-task-count");
      totalTaskCountEl.textContent = events.total_count

      //Dynamic task card generation
      if (tasks.length > 0) {
        eventList.innerHTML = "";
        tasks.forEach((event) => {
          let statusColorTheme = 'yellow'
          const [day, month, year, time] = separateDateTime(event.start);
            if(event.status == 'Completed'){
              statusColorTheme =  'green'
            }

          // main card
          const eventItem = document.createElement("div");
          eventItem.classList.add(
            "event-card",
            "bg-white",
            "shadow-lg",
            "rounded-lg",
            "m-2",
            "flex",
            "justify-between",
            "items-center"
          );

          // Date Part
          const firstPart = document.createElement("div");
          firstPart.classList.add("p-4");
          firstPart.innerHTML = ` <p class="font-semibold text-center">${month}</p><p class="font-semibold text-center">${day}</p>
          <p class="font-semibold text-center">${year}</p>`;
          
          // Title, time, and status
          const secondPart = document.createElement("div");
          secondPart.classList.add("flex", "flex-col", "justify-between", "p-4");
          secondPart.innerHTML = `<h5 class="text-md font-semibold text-gray-800">${event.title}</h5><div>
          <span class="text-gray-500">When:</span> <span>${time}</span>
          </div>
          <span
          class="px-4 my-2 text-sm border bg-${statusColorTheme}-100 text-${statusColorTheme}-500 border-${statusColorTheme}-500 text-center rounded-full"
          >
          ${event.status}
          </span>`;
          
          // details
          const thirdPart = document.createElement("div");
          thirdPart.classList.add("w-2/5","px-2")
          thirdPart.innerHTML = ` <div>
            <p class="text-gray-500">Details:</p> 
            <span class="text-sm" >${event.description}</span>
          </div>`
          
          // edit&delete buttons
          const [editBtn, deleteBtn, markCompleteBtn] = getButtons(event);
          const btnContainer = document.createElement("div");
          btnContainer.classList.add("float-right","flex","justify-between","items-center");
          btnContainer.appendChild(editBtn);
          btnContainer.appendChild(deleteBtn);
          btnContainer.appendChild(markCompleteBtn);
          thirdPart.appendChild(btnContainer)

          eventItem.appendChild(firstPart)
          eventItem.appendChild(secondPart)
          eventItem.appendChild(thirdPart)


          eventList.appendChild(eventItem);
        });
      } else {
        var message = "No Tasks to show";
        eventList.innerHTML = `<div class="w-full bg-gray-200 text-center rounded-lg p-4 select-none" >${message}</div>`;
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

// Logout
function ready_logout() {
  document.getElementById("logout-btn").addEventListener("click", () => {
    const AUTH_API_URL = "http://localhost:8000/auth/api";
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (confirm("Are you sure to logout?")) {
      fetch(`${AUTH_API_URL}/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }).then((response) => {
        response.json().then((res) => console.log(res));
        if (response.status == 204) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("current_user");
          window.location.href = "/";
        }
      });
    }
  });
}

// filter the tasks
function filterTasks(param,value){
  let queryParams = new URLSearchParams(window.location.search);
  if(param && value){
    queryParams.set(param, value);
    history.replaceState(null, null, "?"+queryParams.toString());
    loadTasks(`${param}=${value}`)
    setFilterButtonActive(value)
  }
  else{
    loadTasks()
    setFilterButtonActive('all')
    queryParams.delete('status')
    let newURL = window.location.origin+window.location.pathname+'?'+queryParams.toString()
    history.replaceState(null, null, newURL);
  }
}


// Activate the selected filter button
function setFilterButtonActive(status){
  const filterAllBtn = document.getElementById('task-filter-btn-all')
  const filterPendingBtn = document.getElementById('task-filter-btn-pending')
  const filterCompletedBtn = document.getElementById('task-filter-btn-completed')
  const activeClasses = ['text-white','bg-slate-800','border-slate-800']
  if(status=='completed'){
    filterAllBtn.classList.remove(...activeClasses)    
    filterPendingBtn.classList.remove(...activeClasses)    
    filterCompletedBtn.classList.add(...activeClasses)    
  }
  else if(status=='pending'){
    filterAllBtn.classList.remove(...activeClasses)    
    filterPendingBtn.classList.add(...activeClasses)    
    filterCompletedBtn.classList.remove(...activeClasses)    
  }
  else{
    filterAllBtn.classList.add(...activeClasses)    
    filterPendingBtn.classList.remove(...activeClasses)    
    filterCompletedBtn.classList.remove(...activeClasses)    
  }
}

// Set a initial tab based on url query param
function activeInitialTab(){
  let queryParams = new URLSearchParams(window.location.search);
  let currentTab = queryParams.get('tab')
  
  if(currentTab=='tasks'){
    changeTabTo('tasks')
  }
}

  
function initialLoadTaskLoadWithFilter(){

  let queryParams = new URLSearchParams(window.location.search);
  let statusFilter = queryParams.get('status')

  let initialFilter = window.location.search
  setFilterButtonActive(statusFilter)
  loadTasks(initialFilter.slice(1));
}

window.onload = function () {
  activeInitialTab()
  initialLoadTaskLoadWithFilter()
  asssignUserName();
  ready_logout();
};
