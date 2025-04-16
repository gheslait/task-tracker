const entradaTarea = document.getElementById("entrada-tarea");
const botonAgregar = document.getElementById("boton-add-tarea");
const ListaTarea = document.getElementById("lista-tarea");

let tareas = [];

entradaTarea.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        agregarTarea();
    }
});

botonAgregar.addEventListener("click", agregarTarea);

function agregarTarea() {
    const descripcion = entradaTarea.value.trim();
    if (descripcion) {
        tareas.push({ descripcion, completada: false });
        entradaTarea.value = "";
        addTareas();
    }
}

function addTareas() {
    ListaTarea.innerHTML = "";

    tareas.sort((a, b) => a.completada - b.completada);

    tareas.forEach((tarea, index) => {
        const li = document.createElement("li");
        li.className = `tarea-item ${tarea.completada ? "completada" : ""}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;
        checkbox.addEventListener("change", () => tareaCompleta(index));

        const DescripcionTarea = document.createElement("span");
        DescripcionTarea.textContent = tarea.descripcion;

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "boton-eliminar";
        botonEliminar.title = "Eliminar";
        botonEliminar.innerHTML = `<svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 489.74 489.74" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M361.051,199.929H102.01V489.74h259.041V199.929L361.051,199.929z M170.818,450.163h-13.492V239.505h13.492V450.163z M238.276,450.163h-13.492V239.505h13.492V450.163z M305.734,450.163h-13.492V239.505h13.492V450.163z"></path> <path d="M387.73,145.959l-52.74-30.672l28.129-48.365L248.047,0l-28.127,48.362l-56.113-32.634l-26.678,45.875l223.922,130.231 L387.73,145.959z M257.808,36.891l68.421,39.792l-14.564,25.038L243.241,61.93L257.808,36.891z"></path> </g> </g> </g></svg>`;
        botonEliminar.addEventListener("click", () => eliminarTarea(index));

        li.appendChild(checkbox);
        li.appendChild(DescripcionTarea);
        li.appendChild(botonEliminar);

        ListaTarea.appendChild(li);
    });
}

function tareaCompleta(index) {
    tareas[index].completada = !tareas[index].completada;
    addTareas();
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    addTareas();
}