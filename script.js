const fecha = document.querySelector("#fecha");
const taskDate = document.querySelector("#taskdate");
const list = document.querySelector("#list");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id = 0;
const tareaList = [];

//FECHA ACTUALIZADA
const date = new Date();
fecha.innerHTML = date.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

//Función agregar tarea

function agregarTarea(tarea, id, realizado, eliminado, fechaLimite) {
  if (eliminado) {
    return;
  }
  const realized = realizado ? check : uncheck;
  const line = realizado ? lineThrough : "";
  const element = `
      <li id="elemento-${id}">
        <i class="far ${realized} " data="realizado" id="${id}" ></i>
        <p class="text ${line} "> ${tarea} <br> Fecha límite: ${fechaLimite} </p>
        <i class="fas fa-trash" data="eliminado" id="${id}"></i>
      </li>
  `;
  list.insertAdjacentHTML("beforeend", element);
  const taskElement = document.getElementById(`elemento-${id}`);
  // Verificar si la fecha límite ha pasado y cambiar el fondo del UL
  const taskDeadline = new Date(fechaLimite);
  const currentDate = new Date();
  taskElement.style.background =
    taskDeadline < currentDate
      ? "orange"
      : "linear-gradient(to bottom, var(--color3), var(--color6))";
}

//Funciones para tareas eliminadas y realizadas

function tareaRealizada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  tareaList[element.id].realizado = !tareaList[element.id].realizado;
}

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  tareaList[element.id].eliminado = true;
}

botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  const fechaLimite = taskDate.value;
  if (tarea && fechaLimite) {
    agregarTarea(tarea, id, false, false, fechaLimite);
    tareaList.push({
      nombre: tarea,
      fechaLimite: fechaLimite,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }

  input.value = "";
  taskDate.value = "";
  id++;
  console.log(tareaList);
});

document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const tarea = input.value;
    const fechaLimite = taskDate.value;
    if (tarea && fechaLimite) {
      agregarTarea(tarea, id, false, false, fechaLimite);
      tareaList.push({
        nombre: tarea,
        fechaLimite: fechaLimite,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }

    input.value = "";
    taskDate.value = "";
    id++;
  }
});

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;
  if (elementData === "realizado") {
    tareaRealizada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }
});
