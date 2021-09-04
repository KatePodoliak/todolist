const addBtn = document.getElementById('add-task');
const descriptionTask = document.getElementById('description-task');
const tasksWrapper = document.querySelector('.tasks-wrapper');


let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
let itemList = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (item, index) => {
    return `
           <div class="item-task ${item.completed? 'checked': ''}">
                <input onclick="completeTask(${index})" type="checkbox" class="btn-completed" ${item.completed? 'checked': ''}\>
                <div class="description">${item.description}</div>
                <button onclick="deleteTask(${index})">
                    <i class="btn-delete"></i>
                </button>
           </div>`
}

const filterList = () => {
    const active = tasks.length && tasks.filter(item => item.completed == false);
    const complete = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...active, ...complete];
}

const fillList = () => {
    tasksWrapper.innerHTML = "";
    if(tasks.length > 0){
        filterList();
        tasks.forEach((item, index)=> {
            tasksWrapper.innerHTML += createTemplate(item, index);
        })
        itemList = document.querySelectorAll('.item-task');
    }
}

fillList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        itemList[index].classList.add('checked');
    }
    else{
        itemList[index].classList.remove('checked');
    }
    updateLocal();
    fillList();
}

const deleteTask = index => {
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillList();
    }, 500)
}

addBtn.addEventListener('click', () => {
    if(descriptionTask.value.length == 0){
        alert("Заполните поле!");
    }
    else{
        tasks.push(new Task(descriptionTask.value));
        updateLocal();
        fillList();
        descriptionTask.value = '';
    }
})
