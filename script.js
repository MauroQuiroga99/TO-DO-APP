const fecha = document.querySelector("#fecha");
const list = document.querySelector("#list");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");

//Función agregar tarea

function agregarTarea(tarea) {
  const element = `<ul id="list">
      <li>
        <i class="fa-regular fa-circle" data-="realizado" id="0"></i>
        <p class="text"> ${tarea} </p>
        <i class="fa-solid fa-trash" data-="eliminado" id="0"></i>
      </li>
    </ul> `;

  list.insertAdjacentHTML("beforeend", element);
}

botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea);
  }

  input.value = "";
});
