document.addEventListener('DOMContentLoaded', function () {
  const comprasList = document.getElementById('Compras');
  const resumen = document.getElementById('Resumen');
  const botoninicio = document.getElementById('BotonInicio');
  const BotonAlMenu = document.getElementById('BotonAlMenu');
  const BotonIntegrantes = document.getElementById("BotonIntegrantes");
  const BotonPagar = document.getElementById("PayRedir");
  const Menu = document.getElementById('Menu');
  const Titulo = document.getElementById('titleMenu');

  const botonesCategoria = {
    'Entrada': document.getElementById('Entradas'),
    'Rolls': document.getElementById('PlatoFuerte'),
    'Postre': document.getElementById('Postre'),
    'Bebida': document.getElementById('Bebidas'),
    'Todo': document.getElementById('Todo')
  };

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

  if (BotonPagar) {
    BotonPagar.addEventListener('click', () => {
      window.location.href = 'pago.html';
    });
  };

  function mostrarCategoria(categoria) {
    const itemsArray = Menu.querySelectorAll('li');
    itemsArray.forEach(item => {
      const tipoPlato = item.querySelector('p#Tipo').textContent.split(': ')[1];
      if (categoria === 'Todo' || tipoPlato === categoria) {
        item.style.display = 'grid';

        if (categoria === 'Entrada') {
          Titulo.innerHTML = "Entradas"
        }else if (categoria === 'Rolls') {
          Titulo.innerHTML = "Rolls"
        }else if (categoria === 'Postre') {
          Titulo.innerHTML = "Postres"
        }else if (categoria === 'Bebida') {
          Titulo.innerHTML = "Bebidas"
        }else if (categoria === 'Todo') {
          Titulo.innerHTML = "Menú Completo"
        }

      } else {
        item.style.display = 'none';
      }
    });
  }

  async function fetchData() {
    try {
      const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=CKq-LQas5w4nUMnpY_-r0GUin-7rSoKPB7iBV_wXtrfbwojXs0-qOHR424skSoTiFA7eJEA2ER6ss48Xg6YhQibXYYv7Fu_4m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnA6wXRRzyrfTIKmLYEVRoswXqyofKrLrma4N-JjG6IUfb06gUu96E11OfZziasEjNI-G1zoKx9HpX2tur1IPZjIGRoGQdMN6zNz9Jw9Md8uu&lib=MqXoQJ202MbeZzBd6_irkBTKZ9dnBgvUF');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      renderMenu(data);

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }

  function renderMenu(menuData) {
    const menuList = document.getElementById('Menu');
    menuList.innerHTML = ''; 

    const itemsArray = menuData.data;

    itemsArray.forEach(item => {
      const platos = document.createElement('li');
      platos.classList.add('menu-item');

      platos.innerHTML = `
        <h3>${item.Nombre}</h3>
        <img src="${item.Imagen}" alt="${item.Nombre}">
        <p>${item.Descripcion}</p>
        <p>Precio: $${item.Precio}</p>
        <p id="Tipo">Tipo de plato: ${item.Tipo}</p>
        <button class="agregarCarrito">Agregar al carrito</button>
      `;
      menuList.appendChild(platos);
    });

    asignarEventosCarrito();
  }

  function asignarEventosCarrito() {
    const botonesAgregar = document.querySelectorAll('.agregarCarrito');
    botonesAgregar.forEach(boton => {
      boton.addEventListener('click', function() {
        const item = this.closest('li');
        const nombre = item.querySelector('h3').textContent;
        const precio = item.querySelector('p:nth-child(4)').textContent.split('$')[1];
        agregarAlCarrito(nombre, precio);
      });
    });
  }

  function agregarAlCarrito(nombre, precio) {
    const item = document.createElement('li');

    const info = document.createElement('span');
    info.textContent = `${nombre} - $${precio}`;

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
      const priceText = item.querySelector('span').textContent.split('- $')[1].trim();
      const price = parseInt(priceText.replace(',', ''));
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
        const priceText = item.querySelector('span').textContent.split('- $')[1].trim();
        const price = parseInt(priceText.replace(',', ''));
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

  fetchData();

  Object.keys(botonesCategoria).forEach(categoria => {
    const boton = botonesCategoria[categoria];
    boton.addEventListener('click', () => {
      mostrarCategoria(categoria);
    });
  });
});
