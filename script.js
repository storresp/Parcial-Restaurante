document.addEventListener('DOMContentLoaded', function () {
    
    const botonEntradas = document.getElementById('Entradas');
    const botonPlatoFuerte = document.getElementById('PlatoFuerte');
    const botonPostre = document.getElementById('Postre');
    const botonBebidas = document.getElementById('Bebidas');
    const botonInicio = document.getElementById('BotonInicio');

    const menuElement = document.getElementById('Menu');

    function actualizarMenu(tipo) {
    }

    botonEntradas.addEventListener('click', () => actualizarMenu('Entradas'));
    botonPlatoFuerte.addEventListener('click', () => actualizarMenu('Platos Fuertes'));
    botonPostre.addEventListener('click', () => actualizarMenu('Postres'));
    botonBebidas.addEventListener('click', () => actualizarMenu('Bebidas'));
    botonInicio.addEventListener('click', () => {
        menuElement.innerHTML = '<p>esto es el inicio</p>';
    });

    const botonVaciar = document.getElementById('Vaciar');
    botonVaciar.addEventListener('click', () => {
        alert('Carrito vaciado');
    });

    const botonPago = document.getElementById('Pago');
    botonPago.addEventListener('click', () => {
        alert('Procesando pago...');
    });
});
