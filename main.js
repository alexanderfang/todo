var triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event) {
    event.preventDefault()
    tabTrigger.show()
  })
})

document.addEventListener("click", function(){
    document.getElementsByClassName('custom-menu')[0].style.display = "none";
});

let data = []
let done = []

function formSubmit(event){
    event.preventDefault()
    let input = document.getElementById('todo-input')
    let list = document.getElementById('todo-list')

    data.push(input.value)
    input.value = ""
    list.innerHTML = ""

    refreshList();
}

function todoListSubmit(event, idx){
    event.preventDefault
    data.push(done[idx])
    done.splice(idx, 1)

    refreshList();
}

function doneListSubmit(event, idx){
    event.preventDefault
    done.push(data[idx])
    data.splice(idx, 1)

    refreshList();
}

function refreshList(){
    let list = document.getElementById('done-list')
    list.innerHTML = ""

    for (let i = 0; i < done.length; i++) {
        list.innerHTML += `<li class="done-list-item">
                                <label class="d-flex align-items-center justify-content-between rounded py-2 mb-3 mt-2 px-3 py-2 rounded border btn-white"  id="done-${i}">
                                    <div class="font-weight-600 text-sm">${done[i]}</div>
                                    <div>
                                    <input type="checkbox" name="questionlist[]" class="checkbox" value="${done[i]}"onchange="todoListSubmit(event, ${i})" checked>
                                    </div>
                                </label>
                            </li>`
    }
    
    let slist = document.getElementById('todo-list')
    slist.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        slist.innerHTML += `<li class="todo-list-item">
                                <label class="d-flex align-items-center justify-content-between rounded py-2 mb-3 mt-2 px-3 py-2 rounded border btn-white" id="todo-${i}">
                                    <div class="font-weight-600 text-sm">${data[i]}</div>
                                    <div>
                                        <input type="checkbox" name="questionlist[]" class="checkbox" value="${data[i]}" onchange="doneListSubmit(event,${i})">
                                    </div>
                                </label>
                            </li>`
    }
    var tl = document.getElementsByClassName('todo-list-item')
    var dl = document.getElementsByClassName('done-list-item')

    if(tl){
        [].forEach.call(tl, function (object) {
            object.addEventListener('contextmenu', function(e){
                showMenu(e, object, "todo")
                e.preventDefault()
            });
        });
    }

    if(dl){
        [].forEach.call(dl, function (object) {
            object.addEventListener('contextmenu', function(e){
                showMenu(e, object, "done")
                e.preventDefault()
            });
        });
    }
}

function showMenu(e, object, res){
    mouseX = e.x;
    mouseY = e.y;
    id = object.childNodes[1].id.split('-').pop()
    console.log(id);
    
    menu = document.getElementsByClassName('custom-menu')[0]
    menu.style.position = "absolute"
    menu.style.left = mouseX+"px"
    menu.style.top = mouseY+"px"
    var node = document.createElement(`LI`)
    node.innerHTML = "Delete"
    node.setAttribute("data-action","Delete")
    node.addEventListener('click', function(){
        if(res=="todo"){
            data.splice(id, 1)
        }else{
            done.splice(id, 1)
        }
        refreshList()
    });
    menu.innerHTML = "";
    menu.appendChild(node)

    menu.style.display = "block"
}