document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('#Menu li');
  const comprasList = document.getElementById('Compras');
  const resumen = document.getElementById('Resumen');
  const botoninicio = document.getElementById('BotonInicio');
  const BotonAlMenu = document.getElementById('BotonAlMenu');
  const BotonIntegrantes = document.getElementById("BotonIntegrantes");

  function mostrarCategoria(categoria) {
    menuItems.forEach(item => {
      if (item.classList.contains(categoria)) {
        item.style.display = 'grid';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function actualizarTitulo(titulo) {
      document.getElementById('titleMenu').textContent = titulo;
  }

  if (BotonIntegrantes) {
    BotonIntegrantes.addEventListener('click', () => {
        window.location.href = 'integrantes.html';
    });
  };

  if (BotonAlMenu) {
    BotonAlMenu.addEventListener('click', () => {
        window.location.href = 'menu.html';
    });
  };

  if (botoninicio) {
      botoninicio.addEventListener('click', () => {
          window.location.href = 'index.html';
      });
  };

  document.getElementById('Entradas').addEventListener('click', () => {
    mostrarCategoria('Entrada');
    actualizarTitulo('Entradas');
  });

  document.getElementById('PlatoFuerte').addEventListener('click', () => {
    mostrarCategoria('PlatoFuerte');
    actualizarTitulo('Platos Fuertes');

  });

  document.getElementById('Postre').addEventListener('click', () => {
    mostrarCategoria('Postre');
    actualizarTitulo('Postres');

  });

  document.getElementById('Bebidas').addEventListener('click', () => {
    mostrarCategoria('Bebida');
    actualizarTitulo('Bebidas');
  });

  document.getElementById('Todo').addEventListener('click', () => {
      actualizarTitulo('Menú Completo');
    menuItems.forEach(item => {
      item.style.display = 'grid';
    });
  });

  function agregarAlCarrito(nombre, precio) {
    const item = document.createElement('li');
    
    const info = document.createElement('span');
    info.textContent = `${nombre} - ${precio}`;
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.classList.add('remove-item');
    
    removeButton.addEventListener('click', () => {
      comprasList.removeChild(item);
      actualizarResumen();
    });
    
    item.appendChild(info);
    item.appendChild(removeButton);
    
    comprasList.insertBefore(item, comprasList.firstChild);

    actualizarResumen();
  }

  function actualizarResumen() {
    const totalItems = comprasList.children.length;
    let totalPrice = 0;
    comprasList.querySelectorAll('li').forEach(item => {
      const priceText = item.querySelector('span').textContent.split('-')[1].trim();
      const price = parseInt(priceText.replace('$', '').replace(',', ''));
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

  const botonPago = document.getElementById('PayRedir');
  botonPago.addEventListener('click', () => {
      const totalItems = comprasList.children.length;
      if (totalItems > 0) {
          let totalPrice = 0;
          comprasList.querySelectorAll('li').forEach(item => {
              const priceText = item.querySelector('span').textContent.split('-')[1].trim();
              const price = parseInt(priceText.replace('$', '').replace(',', ''));
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
});

