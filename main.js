// Seleccionar el formulario y el contenedor del mensaje de respuesta
const contactForm = document.getElementById('contactForm');
const responseMessage = document.getElementById('responseMessage');

// Añadir el evento de envío al formulario
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evitar el comportamiento predeterminado

  const formData = new FormData(contactForm); // Capturar los datos del formulario

  // Convertir los datos del formulario a un objeto JSON
  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  try {
    // Enviar los datos al servicio (Formspree, en este caso)
    const response = await fetch('https://formspree.io/f/mdknggnq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData), // Enviar los datos como JSON
    });

    const result = await response.json(); // Parsear la respuesta del servidor

    if (response.ok) {
      // Mostrar mensaje de éxito
      responseMessage.innerText = '¡Mensaje enviado con éxito!';
      responseMessage.style.color = 'green';
      contactForm.reset(); // Limpiar el formulario
    } else {
      // Mostrar mensaje de error (detallado si está disponible)
      throw new Error(result.error || 'Ocurrió un error al enviar el formulario.');
    }
  } catch (error) {
    // Manejar errores y mostrar mensaje al usuario
    responseMessage.innerText = `Error: ${error.message}`;
    responseMessage.style.color = 'red';
  }
});

// Validar campos del formulario antes de enviarlo
contactForm.addEventListener('input', (event) => {
  const field = event.target;
  if (field.validity.valid) {
    field.style.borderColor = ''; // Restablecer el color del borde
  } else {
    field.style.borderColor = 'red'; // Mostrar un borde rojo en caso de error
  }
});
