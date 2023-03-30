const taskInputBox = document.getElementById('taskInputBox');
const addTaskBtn = document.getElementById('addTaskBtn');

taskInputBox.addEventListener('input', btnDisableToggler)
taskInputBox.addEventListener('focus', function () {
    this.style.backgroundColor = 'white';
    this.style.outline = 'none';
    this.style.color = 'black';
    this.style.border = '3px solid #d60746'
})

//if task available in task input box then activates addTask button otherwise disables it.
function btnDisableToggler() {
    if (taskInputBox.value.length == 0) {
        addTaskBtn.setAttribute('disabled', '')
        addTaskBtn.style.backgroundColor = '#d60746'
        addTaskBtn.style.color = 'white'
        addTaskBtn.style.border = '3px solid #e3e2df'
    } else {
        addTaskBtn.removeAttribute('disabled');
        addTaskBtn.style.backgroundColor = '#e3e2df'
        addTaskBtn.style.color = '#d60746'
    }
}

window.onload = function(){
    taskInputBox.focus();
    btnDisableToggler();
} //focuses the task input area


const taskListArea = document.querySelector('#taskListArea');

addTaskBtn.addEventListener('click', addTask)

function addTask() {
    //creating a wrapper div
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'wrapper';

    //creating an input which displays added task
    const newInp = document.createElement('input');
    newInp.value = `${taskInputBox.value}`;
    newInp.setAttribute('disabled', '');

    
    //creating icons div and adding 3 buttons in it - task status btn,task editing btn and task deletion btn
    const iconsDiv = document.createElement('div');
    iconsDiv.className = 'icons';
    iconsDiv.insertAdjacentHTML('afterbegin', `
    <div id="rectangle" class="taskStatusBtn"><div class="circle"></div></div>
    <img src="./images/pencilPink.png" class="taskEditingBtn" alt="">
    <img src="./images/dlt.png" class="taskDeletionBtn" alt="">
    `);

    //appending input and icons div in wrapperDiv
    wrapperDiv.append(newInp,iconsDiv);
    //appending wrapper div in task list area (added task displaying area)
    taskListArea.append(wrapperDiv);

    const inp = wrapperDiv.firstElementChild;
    const taskStatusBtn = iconsDiv.firstElementChild; //task status button
    const taskEditingBtn = taskStatusBtn.nextElementSibling; //task title editing button
    const taskDeletionBtn = taskEditingBtn.nextElementSibling; //task delete button-
    let tgl = true;

    // task status button - adding click event
    taskStatusBtn.addEventListener('click', taskStatusBtnHandler)

    // task title editing button - adding click event
    taskEditingBtn.addEventListener('click', taskEditingBtnHandler)

    // task delete button- click event handler
    taskDeletionBtn.addEventListener('click', function (e) {
        this.parentElement.parentElement.remove();
    });


    // task status button - click event handler
    function taskStatusBtnHandler() {
        inp.setAttribute('disabled', '')
        tgl = !tgl;
        // console.log(tgl)
        if (tgl) {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            this.firstElementChild.style.transform = 'translateX(0px)';
            this.parentElement.previousElementSibling.style.textDecoration = 'none'
            this.parentElement.previousElementSibling.style.color = 'black'
            taskEditingBtn.addEventListener('click', editBtnHandler)
        } else {
            this.style.backgroundColor = 'blue';
            this.firstElementChild.style.transform = 'translateX(22px)';
            this.parentElement.previousElementSibling.style.textDecoration = 'line-through'
            this.parentElement.previousElementSibling.style.color = 'grey'
            taskEditingBtn.removeEventListener('click', editBtnHandler)
        }
    }

    // task title editing button - click event handler
    function taskEditingBtnHandler() {
        tgl = !tgl;
        // console.log(tgl)
        if (tgl) {
            this.src = './images/pencilPink.png'
            inp.classList.remove('borderbox');
            inp.blur();
            inp.setAttribute('disabled', '')
            taskStatusBtn.addEventListener('click', okBtnHandler)
        } else {
            this.src = './images/pencil.png'
            inp.classList.add('borderbox');
            
            inp.removeAttribute('disabled');
            inp.focus();
            taskStatusBtn.removeEventListener('click', okBtnHandler)
        }
    }

    // emptying task input box
    taskInputBox.value = '';
    // Resetting state of add task button
    btnDisableToggler();
}
