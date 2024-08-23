document.addEventListener('DOMContentLoaded', function () {
    const menuMain = document.getElementById('MenuMain');
    const menuItems = document.querySelectorAll('#Menu li');
  
    const comprasList = document.getElementById('Compras');
    const resumen = document.getElementById('Resumen');
  
    function mostrarCategoria(categoria) {
      menuItems.forEach(item => {
        if (item.classList.contains(categoria)) {
          item.style.display = 'grid';
        } else {
          item.style.display = 'grid';
        }
      });
    }
    function actualizarTitulo(titulo) {
        document.getElementById('titleMenu').textContent = titulo;
    }
  
    document.getElementById('Entradas').addEventListener('click', () => {
      mostrarCategoria('Entrada');
      actualizarTitulo('Entradas');

    });
  
    document.getElementById('PlatoFuerte').addEventListener('click', () => {
      mostrarCategoria('PlatoFuerte');
      actualizarTitulo('PlatoFuerte');

    });
  
    document.getElementById('Postre').addEventListener('click', () => {
      mostrarCategoria('Postre');
      actualizarTitulo('Postre');

    });
  
    document.getElementById('Bebidas').addEventListener('click', () => {
      mostrarCategoria('Bebida');
      actualizarTitulo('Bebida');
    });
  
    document.getElementById('Todo').addEventListener('click', () => {
        actualizarTitulo('Menú Completo');
      menuItems.forEach(item => {
        item.style.display = 'grid';
      });
    });
  
    function agregarAlCarrito(nombre, precio) {
      const item = document.createElement('li');
      item.textContent = `${nombre} - ${precio}`;
      comprasList.appendChild(item);
  
      actualizarResumen();
    }
  
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

    const botonVaciar = document.getElementById('Vaciar');
    botonVaciar.addEventListener('click', () => {
        comprasList.innerHTML = '';
        
        resumen.innerHTML = `
          <p>Items: 0</p>
          <p>Total: $0 COP</p>
        `;
    });

    const botonPago = document.getElementById('Pago');
    botonPago.addEventListener('click', () => {
        const totalItems = comprasList.children.length;
        if (totalItems > 0) {
            let totalPrice = 0;
            comprasList.querySelectorAll('li').forEach(item => {
                const price = parseInt(item.textContent.split('-')[1].trim().replace('$', '').replace(',', ''));
                totalPrice += price;
            });
            alert(`Procesando pago de $${totalPrice.toLocaleString()} COP por ${totalItems} artículos.`);
            comprasList.innerHTML = '';
            resumen.innerHTML = `
              <p>Items: 0</p>
              <p>Total: $0 COP</p>
            `;
        } else {
            alert('El carrito está vacío.');
        }
    });

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
})
  