// app.js
document.addEventListener('DOMContentLoaded', () => {
    const taskText = document.getElementById('task-text');
    const taskDate = document.getElementById('task-date');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // ローカルストレージからタスクを読み込む
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // タスクをDOMに追加する
    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.textContent = `${task.date}: ${task.text}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.addEventListener('click', () => {
            deleteTask(task);
            taskList.removeChild(li);
        });
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    };

    // タスクをローカルストレージに保存する
    const saveTask = (task) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // タスクをローカルストレージから削除する
    const deleteTask = (taskToDelete) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskToDelete.text || task.date !== taskToDelete.date);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // タスク追加ボタンのイベントリスナー
    addTaskButton.addEventListener('click', () => {
        const task = {
            text: taskText.value,
            date: taskDate.value
        };
        addTaskToDOM(task);
        saveTask(task);
        taskText.value = '';
        taskDate.value = '';
    });

    // ページ読み込み時にタスクを読み込む
    loadTasks();
});