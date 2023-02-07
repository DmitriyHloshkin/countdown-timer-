import { showNoValidAnimation } from '../modules/general/animation.js';

const todo = () => {
  const listTasks = document.querySelector('.todo-list ul'),
        btnNewTask = document.querySelector('.create-task__new-todo-btn'),
        newTask = document.querySelector('.create-task__new-todo'),
        blockTasks = document.querySelector('.tasks');


  calculateAndShowTasks();

  btnNewTask.addEventListener('click', () => {
    if (!newTask.value) {
      showNoValidAnimation(newTask);
      return;
    }

    const task = document.createElement('li');
    task.classList.add('tasks__item');

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

    taskTitle.value = newTask.value;
    listTasks.append(task);

    newTask.value = '';
    calculateAndShowTasks();
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


  });




  function calculateAndShowTasks() {
    const countTitle = document.querySelector('.tasks__count');
    countTitle.textContent = listTasks ? listTasks.querySelectorAll('li').length : '0';
  }

  function clearTasks() {
    listTasks.querySelectorAll('li').forEach(elem => elem.remove());
    calculateAndShowTasks();
  }

};

export default todo;