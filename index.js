const tasks = [];
const form = document.getElementById("form");

const addTask = (task) => {
    try {
        if (!task.title || !task.dueDate || !task.priority) {
            throw new Error("Task must have title, dueDate, and priority.");
        }
        tasks.push(task);
        console.log("Task added successfully!");
        sortTasksByPriority();

    } catch (error) {
        console.error(error.message);
    }
}

const sortTasksByPriority = () => {
    tasks.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    console.log("Tasks sorted by priority:", tasks);
}

function getTasksDueWithin(minutes) {
    const now = Date.now();
    const dueTasks = tasks.filter(task => {
        const taskDueTime = new Date(task.dueDate).getTime();
        return taskDueTime <= now + minutes * 60000; 
    });
    console.log(`Tasks due within ${minutes} minutes:`, dueTasks);
    return dueTasks;
}

function scheduleReminders() {
    tasks.forEach(task => {
        const taskDueTime = new Date(task.dueDate).getTime();
        const timeToReminder = taskDueTime - Date.now();
        
        if (timeToReminder > 0) {
            setTimeout(() => {
                console.log(`Reminder: Task "${task.title}" is due now!`);
            }, timeToReminder);
        }
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newTask = {
        title: document.getElementById('title').value,
        dueDate: document.getElementById('dueDate').value,
        priority: document.getElementById('priority').value
    };

    addTask(newTask);
    form.reset();
});
