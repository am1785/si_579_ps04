var task_ul = document.getElementById('task_list');

function addTask(text, time){
    var task_text = document.createTextNode(text);
    var due_text = document.createTextNode(" due " + new Date(time).toLocaleString().replace(',',''));
    var btn_text = document.createTextNode("Done");

    var li_node = document.createElement("li");
    var span_node = document.createElement("span");
    var btn_node = document.createElement("button");

    span_node.className = "due";
    btn_node.className = "btn btn-sm btn-outline-danger done";
    btn_node.type = "button";

    li_node.appendChild(task_text);
    span_node.appendChild(due_text);
    btn_node.appendChild(btn_text);

    li_node.appendChild(span_node);
    li_node.appendChild(btn_node);

    task_ul.appendChild(li_node);
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    // console.log(dueDate);
    // console.log(dueTime);

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000 + 3600000; // +3600000 because the time is 1 hour behind
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

function taskAdd(){
    const text = document.getElementById("task_description_input").value;
    const date = document.getElementById("duedate_input");
    const time = document.getElementById("duetime_input");

    const date_time = dateAndTimeToTimestamp(date, time);

    var task_text = document.createTextNode(text);
    var due_text = document.createTextNode(" due " + new Date(date_time).toLocaleString().replace(',',''));
    var btn_text = document.createTextNode("Done");

    var li_node = document.createElement("li");
    var span_node = document.createElement("span");
    var btn_node = document.createElement("button");

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

addTask("Learn to wrap gifts", 1639944400000);

const add_task_btn = document.getElementById('add_task');
const input_section = document.getElementsByTagName('section')[0];
const done_btns = document.getElementsByClassName('done');

add_task_btn.addEventListener("click", taskAdd);
input_section.addEventListener("keydown", (event) =>{
    switch(event.key){
        case "Enter":
            taskAdd();
    };
});

task_ul.addEventListener("click", (event)=>{
    const a_btn = event.target.textContent === "Done";
    if(a_btn){
        event.target.parentElement.remove();
    };
});