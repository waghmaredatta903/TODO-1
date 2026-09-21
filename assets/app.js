var cl = console.log;

// let todoArr =[{
//     todoName : "HTML",
//     id : "120"
// }, {
//     todoName : "CSS",
//     id : "121"
// }, {
//     todoName : "Javascript",
//     id : "122"
// }];

// localStorage.setItem('todoArr', JSON.stringify(todoArr))

let todoArr = JSON.parse(localStorage.getItem('todoArr'))

let todoForm = document.getElementById("todoForm");
let inputTodo = document.getElementById("inputTodo");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");
let todoList = document.getElementById("todoList");


function snackBar(msg, icon) {
    Swal.fire({
        title: msg,
        icon: icon,
        timer: 3000
    })
}
function AddOldTodo(arr) {
    let result = ``;
    arr.forEach((ele) => {
        result += `
                <li class="list-group-item d-flex justify-content-between" id="${ele.id}">
                                <strong>${ele.todoName}</strong>
                                <div>
                                    <i onclick="editTodo(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"></i>
                                    <i onclick="OnDeleteTodo(this)" class="fa-solid fa-trash ml-4  fa-2x text-danger" role="button"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>`
    });

    todoList.innerHTML = result;
}

AddOldTodo(todoArr);

//create-todo//

function oncreatetodo(ele) {
    ele.preventDefault();
    let createobj = {
        todoName: inputTodo.value,
        id: Date.now().toString()
    }

    todoArr.push(createobj)
    todoForm.reset()
    localStorage.setItem('todoArr', JSON.stringify(todoArr))
    let li = document.createElement('li')
    li.className = 'list-group-item d-flex justify-content-between align-items-center'
    li.id = createobj.id
    li.innerHTML = ` <strong>${createobj.todoName}</strong>
                                <div>
                                    <i onclick="editTodo(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"></i>
                                    <i onclick="OnDeleteTodo(this)" class="fa-solid fa-trash ml-4  fa-2x text-danger" role="button"></i>
                                </div>`
    todoList.append(li)

    Swal.fire({
        title: `CREATE Successfully !!!`,
        text: `Your Todo has been created successfully`,
        icon: `success`,
        timer: 1500,
    })

}


function OnDeleteTodo(ele) {
    let delete_id = ele.closest('li').id;

    let getConfirmation = confirm('Are You Sure , you want to delete Todo')
    if (getConfirmation) {
        let getIndex = todoArr.findIndex(p => p.id === delete_id)

        todoArr.splice(getIndex, 1) //delete from array
        // cl(todoArr)
        localStorage.setItem('todoArr', JSON.stringify(todoArr))
        ele.closest("li").remove() //delete from UI
        snackBar(`"Todo is Deleted Successfully"`, "success")
    }
}

function editTodo(ele) {
    let editId = ele.closest('li').id;
    localStorage.setItem('editId', editId)
    let editObj = todoArr.find(p => p.id === editId)
    cl(editObj)
    inputTodo.value = editObj.todoName

    addBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')


}

function onUpdatetodo() {
    let UPDATE_ID = localStorage.getItem('editId')
    cl(UPDATE_ID)
    let updateObj = {
        todoName: inputTodo.value,
        id: UPDATE_ID
    }
    cl(updateObj);

    let getIndex = todoArr.findIndex(p => p.id === UPDATE_ID)
    let li = document.getElementById(UPDATE_ID)
    todoArr[getIndex] = updateObj
    localStorage.setItem('todoArr', JSON.stringify(todoArr))

    li.querySelector("strong").innerText = updateObj.todoName;
    todoForm.reset()

    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")

    Swal.fire({
        title: `UPDATE Todo Successfully`,
        text: `Your Todo Update has been Successfully`,
        icon: `success`,
        timer: 1500
    })

}

todoForm.addEventListener('submit', oncreatetodo)
updateBtn.addEventListener('click', onUpdatetodo)
