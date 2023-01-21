let i = 0,
    addTitle = document.getElementById("title"),
    addDescription = document.getElementById("description"),
    addButton = document.getElementById("btnSbmt"),
    cards = document.querySelector('.cards'),
    changeStatusButtons = document.querySelectorAll('.card__button');

let itemTasks = [];

init();

function init() {
    itemTasks.forEach(function(elem, i) {
        document.querySelector('section.cards').insertAdjacentHTML("beforeend",
            `<div data-idTask="${itemTasks.length}" data-status="${elem.status}" class="card">
                <p class="card__title">${elem.name}</p>
                <p class="card__description">${elem.desc}</p>
                <button type="button" class="card__button"></button>
            </div>`
        );
    });
}

function addItem(name, desc, status = 1) {
    if (typeof name !== "string" || typeof desc !== "string" || typeof status !== "number") {
        return;
    }
    if (!name || !desc) {
        alert('Заполните оба поля');
        return;
    }

    //добавляем новый объект
    itemTasks.push({
        // id
        name: name,
        desc: desc,
        status: status
    });

    let itemCount = itemTasks.length;

    //добавляем новый элемент
    document.querySelector('section.cards').insertAdjacentHTML("beforeend",
        `<div data-idtask="${itemCount}" data-status="${status}" class="card">
            <p class="card__title">${name}</p>
            <p class="card__description">${desc}</p>
            <button type="button" class="card__button"></button>
        </div>`
    );

    document.querySelector('section.cards .card[data-idtask="'+ itemCount +'"]').addEventListener("click", function(event) {
        changeStatus(
            this,
            +this.dataset.idtask,
            +this.dataset.status
        );
    });
}

function changeStatus(elem, id, status) {
    status = (status === 1) ? 2 : 3;

    elem.dataset.status = status;
    
    if(status === 2) {
        elem.classList.add("card_active");
    }

    //hard code
    //move to removeTask function
    if(status === 3) {
        elem.remove();
        itemTasks.splice(i, 1);
    }

    itemTasks.forEach(function(elem, i) {
        itemTasks[i].status = status
    });
}

addButton.addEventListener("click", function() {
    addItem(
        document.querySelector('body .form #title').value,
        document.querySelector('body .form #description').value
    )
});

changeStatusButtons.forEach(function(elem, i) {
    changeStatusButtons[i].addEventListener("click", function(event) {
        changeStatus(
            this,
            +this.parentElement.dataset.idtask,
            +this.parentElement.dataset.status
        );
    });
})
