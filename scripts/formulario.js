document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formRegistro");
  const mensaje = document.getElementById("mensaje");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita el envío tradicional

    // Capturamos los datos
    const datos = {
      nombre: formulario.nombre.value.trim(),
      email: formulario.email.value.trim(),
      nivel: parseInt(formulario.nivel.value),
      interes: formulario.interes.value
    };

    // Validación simple
    if (!datos.nombre || !datos.email) {
      mensaje.textContent = "⚠️ Por favor, completa los campos obligatorios.";
      mensaje.style.color = "red";
      return;
    }

    // Simulación de envío (solo frontend por ahora)
    console.log("Datos enviados:", datos);
    mensaje.textContent = "✅ ¡Gracias por registrarte! Pronto te contactaremos.";
    mensaje.style.color = "#16325c";

    // Reset del formulario tras confirmación
    formulario.reset();
  });
});
