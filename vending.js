let estadoActual = "e0";
let totalDinero = 0;

const estados = {
  e0: { dinero: 0, siguiente: { 1: "e1", 2: "e2", 5: "e5" } },
  e1: { dinero: 1, siguiente: { 1: "e2", 2: "e3", 5: "e6" } },
  e2: { dinero: 2, siguiente: { 1: "e3", 2: "e4", 5: "e7" } },
  e3: { dinero: 3, siguiente: { 1: "e4", 2: "e5", 5: "e7" } },
  e4: { dinero: 4, siguiente: { 1: "e5", 2: "e6", 5: "e7" } },
  e5: { dinero: 5, siguiente: { 1: "e6", 2: "e7", 5: "e7" } },
  e6: { dinero: 6, siguiente: { 1: "e7", 2: "e7", 5: "e7" } },
  e7: { dinero: 7, siguiente: { 1: "e7", 2: "e7", 5: "e7" } },
};

function insertarMoneda(valor) {
  const nuevoEstado = estados[estadoActual].siguiente[valor];
  if (nuevoEstado) {
    estadoActual = nuevoEstado;
    totalDinero += valor;
    actualizarPantalla();
  }

  if (totalDinero >= 7) {
    document.getElementById("btn-clara").disabled = false;
    document.getElementById("btn-obscura").disabled = false;
    document.getElementById("btn-1").disabled = true;
    document.getElementById("btn-2").disabled = true;
    document.getElementById("btn-5").disabled = true;
  }
}

function seleccionarCerveza(tipo) {
  if (estadoActual === "e7") {
    const cambio = totalDinero - 7; // Guardamos el cambio ANTES de reiniciar el dinero
    const mensajeCerveza = `Has seleccionado Cerveza ${tipo}.`;
    const mensajeCambio =
      cambio > 0 ? `Cambio devuelto: $${cambio}.` : "No hay cambio.";

    // Mostramos el tipo de cerveza y el cambio devuelto en los elementos HTML
    document.getElementById("mensaje-cerveza").innerText = mensajeCerveza;
    document.getElementById("mensaje-cambio").innerText = mensajeCambio;

    // Actualizamos los elementos en el DOM
    actualizarPantalla();

    // Reiniciamos la máquina después de un pequeño retraso para dar tiempo a ver el mensaje
    setTimeout(() => {
      resetearMaquina();
    }, 3000);
  }
}

function actualizarPantalla() {
  document.getElementById("total").innerText = `Dinero total: $${totalDinero}`;
}

function resetearMaquina() {
  estadoActual = "e0";
  totalDinero = 0; // Aquí es donde se reinicia el total después de haber mostrado el cambio
  document.getElementById("btn-clara").disabled = true;
  document.getElementById("btn-obscura").disabled = true;
  document.getElementById("btn-1").disabled = false;
  document.getElementById("btn-2").disabled = false;
  document.getElementById("btn-5").disabled = false;

  // Limpiar los mensajes de selección y cambio
  document.getElementById("mensaje-cerveza").innerText = "";
  document.getElementById("mensaje-cambio").innerText = "";
}

