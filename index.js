
let newTask = document.getElementById('typingBox');
let addBtn = document.getElementById('addTaskBtn');
let mainList = document.querySelector('.mainList')

newTask.addEventListener('input', disableToggler)
newTask.addEventListener('focus', function () {
    newTask.style.backgroundColor = 'white';
    newTask.style.outline = 'none';
    newTask.style.color = 'black';
    newTask.style.border = '3px solid #d60746'
})
newTask.addEventListener('blur', function () {
    newTask.style.backgroundColor = 'white';
})

function disableToggler() {
    if (newTask.value.length == 0) {
        addBtn.setAttribute('disabled', '')
        addBtn.style.backgroundColor = '#d60746'
        addBtn.style.color = 'white'
        addBtn.style.border = '3px solid #e3e2df'
    } else {
        addBtn.removeAttribute('disabled');
        addBtn.style.backgroundColor = '#e3e2df'
        addBtn.style.color = '#d60746'
    }
}

disableToggler() //if task available in input task area then activates addTask button otherwise disables it
newTask.focus() //focuses the task input area

addBtn.addEventListener('click', addTask)

function addTask() {
    let newDiv = document.createElement('div')
    newDiv.className = 'wrapper';
    mainList.append(newDiv)
    let wrapper = document.getElementsByClassName('mainList')[0].lastElementChild
    let newInp = document.createElement('input')
    newInp.value = `${newTask.value}`;
    newInp.setAttribute('disabled', '')
    wrapper.append(newInp);
    wrapper.insertAdjacentHTML('beforeend', `<div class="icons">
    <div id="rectangle" class="okBtn"><div class="circle"></div></div>
    <img src="./images/pencilPink.png" class="editBtn" alt="">
    <img src="./images/dlt.png" class="dltBtn" alt="">
    </div>`)

    let inp = wrapper.firstElementChild;
    let okBtn = wrapper.lastElementChild.firstElementChild;
    let editBtn = okBtn.nextElementSibling;
    let dltBtn = editBtn.nextElementSibling;
    let tgl = true;

    // task status button event handler
    okBtn.addEventListener('click', okBtnHandler)

    // task edit button event handler
    editBtn.addEventListener('click', editBtnHandler)

    // task delete button event handler
    dltBtn.addEventListener('click', function (e) {
        e.target.parentElement.parentElement.remove()
    })

    function okBtnHandler() {
        inp.setAttribute('disabled', '')
        tgl = !tgl;
        // console.log(tgl)
        if (tgl) {
            okBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            okBtn.firstElementChild.style.transform = 'translateX(0px)';
            okBtn.parentElement.previousElementSibling.style.textDecoration = 'none'
            okBtn.parentElement.previousElementSibling.style.color = 'black'
            editBtn.addEventListener('click', editBtnHandler)
        } else {
            okBtn.style.backgroundColor = 'blue';
            okBtn.firstElementChild.style.transform = 'translateX(22px)';
            okBtn.parentElement.previousElementSibling.style.textDecoration = 'line-through'
            okBtn.parentElement.previousElementSibling.style.color = 'grey'
            editBtn.removeEventListener('click', editBtnHandler)
        }
    }

    function editBtnHandler() {
        tgl = !tgl;
        // console.log(tgl)
        if (tgl) {
            editBtn.src = './images/pencilPink.png'
            inp.classList.remove('borderbox');
            inp.blur();
            inp.setAttribute('disbaled', '')
            okBtn.addEventListener('click', okBtnHandler)
        } else {
            editBtn.src = './images/pencil.png'
            inp.classList.add('borderbox');
            inp.focus();
            inp.removeAttribute('disabled')
            okBtn.removeEventListener('click', okBtnHandler)
        }
    }

    newTask.value = '';
    addBtn.style.backgroundColor = 'transparent';
    addBtn.style.color = 'whitesmoke'
    addBtn.setAttribute('disabled', '')
}