
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