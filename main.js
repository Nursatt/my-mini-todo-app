function createAppTitle(title){
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    // <h2>Список задач</h2>
    return appTitle;
}

function createToDoItem(){
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название задачи';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.innerHTML = 'Добавить';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    // <form class="input-group mb-3">
    //     <input class="form-control" placeholder="Введите название задачи"/>
    //     <div class="input-group-append">
    //         <div class="input-group-append">
    //             <button class="btn btn-primary"></button>
    //         </div>
    //     </div>
    // </form>

    return {
        form,
        input,
        button
    };
}

function createToDoList(){
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}

function createToDoListItem(name, status){
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    if(status) {
        item.classList.add('list-group-item-success');
    }
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Done';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Delete';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // <li class="list-group-item d-flex justify-content-between align-items-center"
    //     name
    //     <div class="btn-group btn-group-sm">
    //         <button type="button" class="btn btn-success">Done</button>
    //         <button type="button" class="btn btn-danger">Delete</button>
    //     </div>
    // </li>

    return {
        item,
        doneButton,
        deleteButton
    };
}

let tasks = [];
if(localStorage.getItem('todo')){
    tasks = JSON.parse(localStorage.getItem('todo'));
}

function draw(){
    let container = document.getElementById('todo-app');
    let title = createAppTitle('Список задач');
    let toDoItem = createToDoItem();
    let toDoList = createToDoList();
    container.append(title);
    container.append(toDoItem.form);
    container.append(toDoList);

    if (tasks.length > 0) {
        for (let taskData of tasks) {
            let task = createToDoListItem(taskData.value, taskData.status);

            task.doneButton.addEventListener('click', function(){
                taskData.status = !taskData.status;
                task.item.classList.toggle('list-group-item-success', taskData.status);
                localStorage.setItem('todo', JSON.stringify(tasks));
            });

            task.deleteButton.addEventListener('click', function(){
                if (confirm('Вы уверены?')) {
                    tasks.splice(tasks.indexOf(taskData), 1);
                    task.item.remove();
                    localStorage.setItem('todo', JSON.stringify(tasks));
                }
            });

            toDoList.append(task.item);
        }
    }

    toDoItem.form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!toDoItem.input.value) {
            return;
        }

        tasks.push({ value: toDoItem.input.value, status: false });
        let taskId = tasks.length - 1;
        let task = createToDoListItem(toDoItem.input.value, false);

        task.doneButton.addEventListener('click', function(){
            tasks[taskId].status = !tasks[taskId].status;
            task.item.classList.toggle('list-group-item-success', tasks[taskId].status);
            localStorage.setItem('todo', JSON.stringify(tasks));
        });

        task.deleteButton.addEventListener('click', function(){
            if (confirm('Вы уверены?')) {
                task.item.remove();
                tasks.splice(taskId, 1);
                localStorage.setItem('todo', JSON.stringify(tasks));
            }
        });

        toDoList.append(task.item);
        localStorage.setItem('todo', JSON.stringify(tasks));
        toDoItem.input.value = '';
    });
}

// Вызов функции draw при загрузке страницы
draw();
