var task_ul = document.getElementById('task_list');

function addTask(text, time){

    if (!time){
        var task_text = document.createTextNode(text);
        var due_text = document.createTextNode(" None");
        var btn_text = document.createTextNode("Done");
    } else {
        var task_text = document.createTextNode(text);
        var due_text = document.createTextNode(" due " + new Date(time).toLocaleString().replace(',',''));
        var btn_text = document.createTextNode("Done");
    }

    const li_node = document.createElement("li");
    const span_node = document.createElement("span");
    const btn_node = document.createElement("button");

    // added event listener for done button on click
    btn_node.addEventListener('click', ()=> {
    btn_node.parentElement.remove()
    });

    span_node.className = "due";
    btn_node.className = "btn btn-sm btn-outline-danger done";
    btn_node.type = "button";

    li_node.appendChild(task_text);
    span_node.appendChild(due_text);
    btn_node.appendChild(btn_text);

    li_node.appendChild(span_node);
    li_node.appendChild(btn_node);

    task_ul.appendChild(li_node);

    document.getElementById("task_description_input").value = '';

}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    };
}

function addTaskFromUI(text){
    const date = document.getElementById("duedate_input");
    const time = document.getElementById("duetime_input");
    const date_time = dateAndTimeToTimestamp(date, time);
    console.log(date_time);
    addTask(text, date_time);
}

addTask("Learn to wrap gifts", 1639944400000);

const add_task_btn = document.getElementById('add_task');
const input_section = document.getElementsByTagName('section')[0];

add_task_btn.addEventListener("click", ()=>{
    addTaskFromUI(document.getElementById("task_description_input").value);
    });

input_section.addEventListener("keydown", (event) =>{
    switch(event.key){
        case "Enter":
            addTaskFromUI(document.getElementById("task_description_input").value);
    };
});

// old implementation of delete button function

// task_ul.addEventListener("click", (event)=>{
//     const a_btn = event.target.textContent === "Done";
//     if(a_btn){
//         event.target.parentElement.remove();
//     };
// });
