// Set a initial tab based on url query param
function activeInitialTab(){
    let queryParams = new URLSearchParams(window.location.search);
    let currentTab = queryParams.get('tab')
    
    if(currentTab=='tasks'){
      changeTabTo('tasks')
    }
  }
  
// Initial tasks loader by acrivating the right filter button
function initialTaskLoad(){
    let queryParams = new URLSearchParams(window.location.search);
    let statusFilter = queryParams.get('status')
  
    setFilterButtonActive(statusFilter)
    loadTasks();
  }


// Assigning logged-n username at page top
const asssignUserName = () => {
    const current_user = JSON.parse(localStorage.getItem("current_user"));
    console.log(current_user);
    document.getElementById("user-name").textContent = current_user.name;
  };