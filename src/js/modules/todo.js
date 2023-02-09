import { showNoValidAnimation } from '../modules/general/animation.js';
import { setStorage, getStorageProp } from '../modules/general/localStorage.js';

const todo = (storageState) => {
  const listTasks = document.querySelector('.todo-list ul'),
        btnNewTask = document.querySelector('.create-task__new-todo-btn'),
        newTask = document.querySelector('.create-task__new-todo'),
        blockTasks = document.querySelector('.tasks');


  calculateAndShowTasks();
  fillTasksWithLocalStorage(listTasks);

  window.addEventListener('keypress', e => {
    if (e.code === 'Enter' && e.target.classList.contains('create-task__new-todo')) btnNewTask.dispatchEvent(new Event('click'));
  });

  btnNewTask.addEventListener('click', () => {
    if (!newTask.value) {
      showNoValidAnimation(newTask);
      return;
    }

    addTask(newTask.value); 
  });

  blockTasks.addEventListener('click', e => {
    if (!e.target) return;

    const elem = e.target;

    if (elem.matches('.tasks__clear')) {
      clearTasks();

    } else if (elem.matches('.tasks__check-btn') || elem.closest('.tasks__check-btn')) {
      elem.closest('.tasks__item')?.classList.toggle('tasks_check');

    }else if (elem.matches('.tasks__clear-btn') || elem.closest('.tasks__clear-btn')) {
      elem.closest('.tasks__item')?.remove();
      calculateAndShowTasks();
    }

    setStorage(getTasks());

  });


  function calculateAndShowTasks() {
    const countTitle = document.querySelector('.tasks__count');
    countTitle.textContent = listTasks ? listTasks.querySelectorAll('li').length : '0';
  }

  function clearTasks() {
    listTasks.querySelectorAll('li').forEach(elem => elem.remove());
    calculateAndShowTasks();
  }

  function addTask(title, check = false) {
    const task = document.createElement('li');
    check ? task.classList.add('tasks__item', 'tasks_check') : task.classList.add('tasks__item');

    task.innerHTML = `
          <button class="tasks__check-btn">
            <div class="tasks__circle">
            </div>
          </button>

          <input type="text" class="tasks__task" placeholder="Создайте новое задание...">
        
          <button class="tasks__clear-btn">
            <div class="tasks__circle tasks__circle_clear">
            </div>
          </button>
    `;

    const taskTitle = task.querySelector('.tasks__task');


    taskTitle.value = title;
    taskTitle.addEventListener('input', () => setStorage(getTasks()));

    listTasks.append(task);

    newTask.value = '';
    calculateAndShowTasks();
    setStorage(getTasks());
  }

  function getTasks() {
    const arrTasks = Array.from(document.querySelectorAll('.todo-list ul li')).map(task => {
      return {
              check: task.classList.contains('tasks_check'),
              titleTask: task.querySelector('.tasks__task')?.value,
            };
    });

    return {
      tasks: arrTasks,
    };
  }

  function fillTasksWithLocalStorage() {
    getStorageProp('tasks')?.forEach( ({check, titleTask}) => addTask(titleTask, check));
  }

};

export default todo;