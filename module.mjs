export function Taskdeletion(event) {
    event.preventDefault();
    const deletetask = document.querySelector('.highlighted');
    if (deletetask != null) {
        deletetask.remove();
    }
    dropdownContent.classList.remove('show');
}

const search = document.createElement('input');
const li = document.querySelector('.M-input');
li.appendChild(search);
search.addEventListener('keydown', (event) => {
    console.log(event);
    const taskpointer = document.querySelectorAll('.taskpointer');
    if (event.key === 'Enter') {
        taskpointer.forEach(element => {
            if (element.classList.contains('highlighted')) {
                element.classList.remove('highlighted');
            } if (element.textContent == search.value) {
                element.classList.add('highlighted');
            }
        });
        search.value = '';
    }
});
export function background(event) {
    event.preventDefault();
    let task = this;
    const taskpointer = document.querySelectorAll('.taskpointer');
    taskpointer.forEach(element => {
        if (element.classList.contains('highlighted') && element != task) {
            element.classList.remove('highlighted');
        }
    });
    if (!task.classList.contains('highlighted')) {
        task.classList.add('highlighted');
    }
    else {
        task.classList.remove('highlighted');
    }
}
export function Dalert(event) {
    event.preventDefault();
    const userConfirmed = confirm("Do you want to delete this task?");

    if (userConfirmed) {
        const parent = this.parentElement;
        const grandparent = parent.parentElement;
        grandparent.parentElement.remove();
    }

}

let clientX = 0;
let clientY = 0;
export function starttouch(e) {
    e.preventDefault();
    const touch = e.target;
    clientY = touch.style.top;
    clientX = touch.style.left;
}
export function movetouch(e) {
    e.preventDefault();
    let draggedItem = e.target;
    draggedItem.classList.add('highlighted');

    if (e.target.className === 'taskpointer highlighted') {
        e.target.style.opacity = 0.5;
        draggedItem.style.position = 'absolute';
        draggedItem.style.top = `${e.changedTouches[0].clientY - 25}px`;
        draggedItem.style.left = `${e.changedTouches[0].clientX - 25}px`;
    }
}

export function endtouch(e) {
    const draggingItem = document.querySelector('.highlighted');
    e.target.classList.remove('highlighted');
    const touch = e.target;

    const x = touch.style.top;
    const y = touch.style.left;
    if (x && y) {
        let element = document.elementFromPoint(parseFloat(y), parseFloat(x));
        if (element && (parseFloat(y) !== clientY && parseFloat(x) !== clientX)) {
            if (element.className == 'taskpointer') {
                element = element.parentNode;
            }
            if (e.target.className === 'taskpointer' && element.className == 'dragdrop') {
                const items = Array.from(element.children);
                const droppingIndex = items.findIndex(item => item !== draggingItem && item.getBoundingClientRect().top > draggingItem.getBoundingClientRect().top);

                if (droppingIndex !== -1) {
                    element.insertBefore(draggingItem, items[droppingIndex]);
                } else {
                    element.append(draggingItem); // Append to the end if dropped below last item
                }
            } e.target.style.opacity = '';
            draggingItem.style.position = '';
        }
    } else {
        const taskpointer = document.querySelectorAll('.taskpointer');
        taskpointer.forEach(element => {
            if (element.classList.contains('highlighted')) {
                element.classList.remove('highlighted');
            }
        });
        touch.classList.add('highlighted');
    }
};

export function dropevent(e) {
    e.preventDefault();
    const draggedItem = document.querySelector('.highlighted');
    let dragdrop = this;
    if (e.target.className === 'taskpointer' && e.target !== draggedItem) {
        const allItems = Array.from(dragdrop.children);
        const draggedIndex = allItems.indexOf(draggedItem);
        const targetIndex = allItems.indexOf(e.target);

        if (draggedIndex < targetIndex) {
            dragdrop.insertBefore(draggedItem, e.target.nextSibling);
        } else {
            dragdrop.insertBefore(draggedItem, e.target);
        }
    }
    else if (e.target == dragdrop) {
        dragdrop.prepend(draggedItem);
    }
}
export function dragStarted(e) {
    let draggedItem = e.target;
    draggedItem.classList.add('highlighted');
    e.target.style.opacity = 0.5;
}