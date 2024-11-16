// filter the tasks
function filterTasks(param,value){
    let queryParams = new URLSearchParams(window.location.search);
    if(param && value){
      queryParams.set(param, value);
      history.replaceState(null, null, "?"+queryParams.toString());
      loadTasks()
      setFilterButtonActive(value)
    }
    else{
      setFilterButtonActive('all')
      queryParams.delete('status')
      let newURL = window.location.origin+window.location.pathname+'?'+queryParams.toString()
      history.replaceState(null, null, newURL);
      loadTasks()
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