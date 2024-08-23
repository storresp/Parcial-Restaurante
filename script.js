document.addEventListener('DOMContentLoaded', function () {
    // Selecciona el main y el ul de Menu
    const menuMain = document.getElementById('MenuMain');
    const menuItems = document.querySelectorAll('#Menu li');
  
    // Selecciona el ul del carrito y el resumen
    const comprasList = document.getElementById('Compras');
    const resumen = document.getElementById('Resumen');
  
    // Función para mostrar elementos de una categoría
    function mostrarCategoria(categoria) {
      menuItems.forEach(item => {
        if (item.classList.contains(categoria)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  
    // Asocia cada botón de categoría con su evento de click
    document.getElementById('Entradas').addEventListener('click', () => {
      mostrarCategoria('Entrada');
    });
  
    document.getElementById('PlatoFuerte').addEventListener('click', () => {
      mostrarCategoria('PlatoFuerte');
    });
  
    document.getElementById('Postre').addEventListener('click', () => {
      mostrarCategoria('Postre');
    });
  
    document.getElementById('Bebidas').addEventListener('click', () => {
      mostrarCategoria('Bebida');
    });
  
    document.getElementById('BotonInicio').addEventListener('click', () => {
      menuItems.forEach(item => {
        item.style.display = 'block';
      });
    });
  
    // Función para agregar un elemento al carrito
    function agregarAlCarrito(nombre, precio) {
      const item = document.createElement('li');
      item.textContent = `${nombre} - ${precio}`;
      comprasList.appendChild(item);
  
      // Actualizar el resumen
      actualizarResumen();
    }
  
    // Función para actualizar el resumen
    function actualizarResumen() {
      const totalItems = comprasList.children.length;
      let totalPrice = 0;
      comprasList.querySelectorAll('li').forEach(item => {
        const price = parseInt(item.textContent.split('-')[1].trim().replace('$', '').replace(',', ''));
        totalPrice += price;
      });
  
      resumen.innerHTML = `
        <p>Items: ${totalItems}</p>
        <p>Total: $${totalPrice.toLocaleString()} COP</p>
      `;
    }
  
    // Asocia cada botón "Agregar al carrito" con su respectivo evento de click
    menuItems.forEach(item => {
      const addButton = item.querySelector('button');
      if (addButton) {
        addButton.addEventListener('click', () => {
          const nombre = item.querySelector('h3').textContent;
          const precio = item.querySelector('.price').textContent;
          agregarAlCarrito(nombre, precio);
        });
      }
    });
  });
  