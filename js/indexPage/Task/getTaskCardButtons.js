// Creates a button element
function createButton({ classes, innerHTML, onClick }) {
    const button = document.createElement("button");
    button.classList.add(...classes);
    button.innerHTML = innerHTML;
    button.addEventListener("click", onClick);
    return button;
  }
  

// Returns necessary Icon SVG  
function getMarkCompleteIcon(status) {
    if (status === 'Completed') {
      return `
        Mark Uncompleted <svg class="ms-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="17" height="17" viewBox="0 0 40 40">
          <path fill="#f78f8f" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"></path>
          <path fill="#c74343" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"></path>
          <path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-134.999 20 20)"></path>
          <path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-45.001 20 20)"></path>
        </svg>`;
    }
  
    return `
      Mark completed <svg class="ms-4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
        <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
        <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
      </svg>`;
  }
  
// Returns a completed button based on a task/event
function getButtons(event) {
    const commonClasses = [
      "text-white", "p-2", "text-sm", "rounded-full", "focus:outline-none",
    ];
  
    const editBtn = createButton({
      classes: ["hover:bg-gray-200", "mr-2", ...commonClasses],
      innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 72 72">
        <path d="M38.406 22.234l11.36 11.36L28.784 54.576l-12.876 4.307c-1.725.577-3.367-1.065-2.791-2.79l4.307-12.876L38.406 22.234zM41.234 19.406l5.234-5.234c1.562-1.562 4.095-1.562 5.657 0l5.703 5.703c1.562 1.562 1.562 4.095 0 5.657l-5.234 5.234L41.234 19.406z"></path>
      </svg>`,
      onClick: () => openEditModal(event),
    });
  
    const deleteBtn = createButton({
      classes: ["hover:bg-gray-200", ...commonClasses],
      innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 30 30">
        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
      </svg>`,
      onClick: () => openDeleteModal(event.id, event.title),
    });
  
    const markCompleteBtn = createButton({
      classes: [
        "text-black", "hover:bg-gray-100", "font-medium", "rounded-lg", 
        "text-sm", "px-2", "py-2", "text-center", "inline-flex", "items-center", 
        "dark:hover:bg-gray-100"
      ],
      innerHTML: getMarkCompleteIcon(event.status),
      onClick: () => changeCompleteStatus(event.id, event.status),
    });
  
    return [editBtn, deleteBtn, markCompleteBtn];
  }
  