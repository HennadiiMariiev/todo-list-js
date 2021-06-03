const inputEl = document.querySelector('.todo-box__input');
const listEl = document.querySelector('.todo-box__list');

inputEl.addEventListener('keypress', onInputKeyPress);
listEl.addEventListener('click', onListClick);

function onInputKeyPress (event) {
    if(event.keyCode === 13 && inputEl.value.trim(' ') !== '') {
        addTodo(makeTodoMarkup(inputEl.value));
        inputEl.value = '';
    }       
}

function makeTodoMarkup(todo) {
    return `
        <li class="todo-box__item">
            <div class="todo-box__inputs">
                <input type="checkbox" class="todo-box__checkbox">
                <p class="todo-box__text">${todo}</p>
            </div>
            <div class="todo-box__controls">
                <button class="todo-box__button" data-action="remove">X</button>
                <button class="todo-box__button" data-action="edit">E</button>
                <button class="todo-box__button" data-action="up">&#8679;</button>
                <button class="todo-box__button" data-action="down">&#8681;</button>
                <button class="todo-box__flag" data-color="rgba(255, 21, 60, 0.7)"></button>
                <button class="todo-box__flag" data-color="rgba(255, 255, 0, 0.7)"></button>
                <button class="todo-box__flag" data-color="rgba(0, 255, 0, 0.7)"></button>
                <button class="todo-box__flag" data-color="white"></button>
            </div>
        </li>
    `
}

function addTodo(todoMarkup) {
    listEl.insertAdjacentHTML('beforeend', todoMarkup);
    listEl.querySelectorAll('.todo-box__flag').forEach(el => el.style.backgroundColor = el.dataset.color);
}

function onListClick (event) {
    const itemEl = event.target.closest('li');

    if(event.target.nodeName === 'INPUT') {
        itemEl.querySelector('.todo-box__text').classList.toggle('crossed');
    }
    
    if(event.target.dataset.action === 'remove') {
        listEl.removeChild(itemEl);
    }

    if(event.target.dataset.action === 'edit') {
        inputEl.value = itemEl.querySelector('.todo-box__text').textContent;
    }

    if(event.target.dataset.action === 'up') {
        const currentElIndex = [...listEl.children].indexOf(itemEl);
        
        if (currentElIndex === 0)
            return;
        
        listEl.insertBefore(listEl.children[currentElIndex], listEl.children[currentElIndex - 1]);
    }

    if(event.target.dataset.action === 'down') {
        const currentElIndex = [...listEl.children].indexOf(itemEl);
        
        if (currentElIndex === listEl.children.length - 1)
            return;

        listEl.insertBefore(listEl.children[currentElIndex + 1], listEl.children[currentElIndex]);
    }

    if(event.target.dataset.color) {
        itemEl.style.backgroundColor = event.target.dataset.color;
    }
}