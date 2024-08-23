// Espera a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function () {
    
    // Referencias a los botones del menú
    const botonEntradas = document.getElementById('Entradas');
    const botonPlatoFuerte = document.getElementById('PlatoFuerte');
    const botonPostre = document.getElementById('Postre');
    const botonBebidas = document.getElementById('Bebidas');
    const botonInicio = document.getElementById('BotonInicio');

    // Referencia al elemento donde se mostrará el menú
    const menuElement = document.getElementById('Menu');

    // Datos ficticios para los menús
    const menuData = {
        'Entradas': ['Ensalada', 'Sopa', 'Bruschetta'],
        'Platos Fuertes': ['Pasta', 'Pizza', 'Hamburguesa'],
        'Postres': ['Helado', 'Pastel', 'Fruta'],
        'Bebidas': ['Agua', 'Refresco', 'Vino']
    };

    // Función para actualizar el menú
    function actualizarMenu(tipo) {
        menuElement.innerHTML = '';  // Limpia el contenido previo
        menuData[tipo].forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            menuElement.appendChild(li);
        });
    }

    // Vinculación de los botones con la función
    botonEntradas.addEventListener('click', () => actualizarMenu('Entradas'));
    botonPlatoFuerte.addEventListener('click', () => actualizarMenu('Platos Fuertes'));
    botonPostre.addEventListener('click', () => actualizarMenu('Postres'));
    botonBebidas.addEventListener('click', () => actualizarMenu('Bebidas'));
    botonInicio.addEventListener('click', () => {
        menuElement.innerHTML = '<p>Escoge que deseas</p>';
    });

    // Carrito de compras (vaciar carrito)
    const botonVaciar = document.getElementById('Vaciar');
    const comprasElement = document.getElementById('Compras');

    botonVaciar.addEventListener('click', () => {
        comprasElement.innerHTML = '';  // Limpia el carrito
        alert('Carrito vaciado');
    });

    // Ejemplo de agregar elementos al carrito (puedes modificar esta parte)
    menuElement.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const li = document.createElement('li');
            li.textContent = event.target.textContent;
            comprasElement.appendChild(li);
        }
    });

    // Funcionalidad del botón de pago (puedes personalizarlo)
    const botonPago = document.getElementById('Pago');
    botonPago.addEventListener('click', () => {
        alert('Procesando pago...');
        // Aquí podrías agregar la lógica de procesamiento de pago
    });
});
