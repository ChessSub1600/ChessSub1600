document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formRegistro");
  const mensaje = document.getElementById("mensaje");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita el envío tradicional

    // Capturamos datos básicos
    const nombre = formulario.nombre?.value.trim();
    const apellido = formulario.apellido?.value?.trim(); // si existe el campo
    const email = formulario.email?.value.trim();
    const telefono = formulario.telefono?.value?.trim();
    const password = formulario.password?.value;
    const confirmar = formulario["confirm-password"]?.value;
    const nivel = parseInt(formulario.nivel?.value) || 0;
    const interes = formulario.interes?.value;
    const acepta = formulario.acepto?.checked;

    // Validaciones obligatorias
    if (!nombre || !email || !password || !confirmar) {
      mensaje.textContent = "⚠️ Completa todos los campos obligatorios.";
      mensaje.style.color = "red";
      return;
    }

    // Validación de coincidencia de contraseñas
    if (password !== confirmar) {
      mensaje.textContent = "⚠️ Las contraseñas no coinciden.";
      mensaje.style.color = "red";
      return;
    }

    // Validación del consentimiento legal
    if (!acepta) {
      mensaje.textContent = "⚠️ Debes aceptar la política de privacidad para registrarte.";
      mensaje.style.color = "red";
      return;
    }

    // Simulación de registro exitoso
    const datos = {
      nombre,
      apellido,
      email,
      telefono,
      nivel,
      interes,
    };

    console.log("Datos registrados:", datos);
    mensaje.textContent = "✅ ¡Registro exitoso! Pronto recibirás novedades del curso.";
    mensaje.style.color = "#16325c";

    formulario.reset();
  });
});
