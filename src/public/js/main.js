const app = {
    // Function handle notification
    toast({ title = '', message = '', type = 'info', duration = 3000 }) {
        const main = document.getElementById('toast');
        if (main) {
            const toast = document.createElement('div');

            // Auto remove
            const autoRemove = setTimeout(() => {
                main.removeChild(toast);
            }, duration);

            // Remove when clicked
            toast.onclick = (e) => {
                if (e.target.closest('.toast__close')) {
                    main.removeChild(toast);
                    clearTimeout(autoRemove);
                }
            };

            const icons = {
                success: 'fa-solid fa-circle-check',
                info: 'fa-solid fa-circle-info',
                waning: 'fa-solid fa-triangle-exclamation',
                error: 'fa-solid fa-circle-xmark',
            };

            const delay = (duration / 1000).toFixed(2);

            toast.classList.add('toast', `toast--${type}`);
            toast.style.animation = `slideInLeft ease 0.3s, fadeOut ease 1s ${delay}s forwards`;
            const icon = icons[type];

            toast.innerHTML = `
                <div class="toast__icon">
                    <i class="${icon}"></i>
                </div>
                <div class="toast__body">
                    <h3 class="toast__title">${title}</h3>
                    <p class="toast__msg">
                        ${message}
                    </p>
                </div>
                <div class="toast__close">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            `;
            main.appendChild(toast);
        }
    },

    // Function handle tab UI
    handleTabUi() {
        const tabs = document.querySelectorAll('.tab-item');
        const panes = document.querySelectorAll('.tab-pane');

        const tabActive = document.querySelector('.tab-item.active');
        const line = document.querySelector('.tabs .line');

        line.style.left = tabActive.offsetLeft + 'px';
        line.style.width = tabActive.offsetWidth + 'px';

        tabs.forEach((tab, index) => {
            const pane = panes[index];
            tab.onclick = function () {
                document
                    .querySelector('.tab-item.active')
                    .classList.remove('active');
                document
                    .querySelector('.tab-pane.active')
                    .classList.remove('active');

                line.style.left = this.offsetLeft + 'px';
                line.style.width = this.offsetWidth + 'px';

                this.classList.add('active');
                pane.classList.add('active');
            };
        });
    },

    // Function handle load data to view
    async handleLoadData() {
        const _this = this;
        const rootAll = document.querySelector('#all');
        const rootWorking = document.querySelector('#working');
        const rootCompleted = document.querySelector('#completed');
        const inputElement = document.querySelector('#task');
        const elementSubmit = document.querySelector('#form');

        const url = {
            index: 'http://localhost:3321/task',
            add: 'http://localhost:3321/task/add',
            update: 'http://localhost:3321/task/update/',
            delete: 'http://localhost:3321/task/delete/',
        };

        // Call controller get data
        const response = await fetch(url.index);
        const data = await response.json();
        const tasks = data.data;

        function renderDomElement(task, index) {
            let element = `
            <li 
                data-id="${index}" 
                data-status="${task.completed}" 
                class='task ${task.completed === 0 ? '' : 'completed'}'>
                ${task.title}
                <span><i data-id="${index}" class="fa-solid fa-trash-can"></i></span>
            </li>`;
            return element;
        }

        // Function render data
        function render(element, data, type = 'all') {
            let html = [];
            data.forEach((task, index) => {
                let content = '';
                if (type === 'working') {
                    // Status completed  is 0
                    if (task.completed === 0) {
                        content = renderDomElement(task, index);
                    }
                } else if (type === 'completed') {
                    // Status completed  is 1
                    if (task.completed === 1) {
                        content = renderDomElement(task, index);
                    }
                } else {
                    // Status completed  is all
                    content = content = renderDomElement(task, index);
                }
                html.push(content);
            });
            element.innerHTML = html.join('');
        }

        // Handle render all data type
        function renderAll() {
            // Task all
            render(rootAll, tasks);
            // Task working
            render(rootWorking, tasks, 'working');
            // Task completed
            render(rootCompleted, tasks, 'completed');
        }

        // Function handle add task
        async function handleSubmit(event) {
            event.preventDefault();
            const value = inputElement.value;
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ title: value }),
            };

            let response = await fetch(url.add, options);
            const data = await response.json();
            const task = data.data;
            inputElement.value = '';
            const taskElement = renderDomElement(task);
            // Task all
            rootAll.insertAdjacentHTML('beforeend', taskElement);
            // Task working
            rootWorking.insertAdjacentHTML('beforeend', taskElement);
            // Notification
            const optionNotification = {
                title: 'Success',
                message: `Task "${task.title}" created successfully!!`,
                type: 'success',
                duration: 5000,
            };

            _this.toast(optionNotification);
        }

        // Render all data
        renderAll();

        // Add task
        elementSubmit.addEventListener('submit', handleSubmit);

        const root = rootAll.parentElement.parentElement;
        root.onclick = async (event) => {
            if (event.target.closest('li')) {
                if (event.target.closest('span')) {
                    let index = event.target.dataset.id;
                    let title = tasks[index].title;
                    let id = tasks[index].id;
                    tasks.splice(index, 1);

                    console.log(id);
                    await fetch(url.delete + `${id}`);

                    const optionNotification = {
                        title: 'Delete successfully!!',
                        message: `Task "${title}" delete successfully`,
                        type: 'error',
                        duration: 5000,
                    };

                    _this.toast(optionNotification);
                    // Render all data
                    renderAll();
                    return;
                }
                console.log();

                // Handle status completed
                event.target.classList.toggle('completed');
                const index = event.target.dataset.id;
                const status = event.target.dataset.status;
                let completed = status === '0' ? 1 : 0;
                tasks[index].completed = completed;
                const id = tasks[index].id;
                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ completed: completed }),
                };

                await fetch(url.update + `${id}`, options);
                if (completed === 1) {
                    // Notification
                    const optionNotification = {
                        title: 'Congratulations on your job!',
                        message: `Task "${tasks[index].title}" is completed`,
                        type: 'success',
                        duration: 5000,
                    };

                    _this.toast(optionNotification);
                } else {
                    const optionNotification = {
                        title: 'Successful recovery!',
                        message: `Task "${tasks[index].title}" successfully restored`,
                        type: 'info',
                        duration: 5000,
                    };

                    _this.toast(optionNotification);
                }
                renderAll();
            }
        };
    },

    // Run func
    start() {
        this.handleTabUi();
        this.handleLoadData();
    },
};

window.addEventListener('load', () => {
    app.start();
});
