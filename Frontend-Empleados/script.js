document.addEventListener('DOMContentLoaded', function () {  
    const loginBoton = document.getElementById('login');
    const userBoton = document.getElementById('user');

    function login() {
        fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('hdach@example.net:password') 
                }
            })

            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                sessionStorage.setItem('token', response.token);
                return response.json(); // Convertir la respuesta a JSON
            })

            .then(data => {
                sessionStorage.setItem('token', data.token);
                console.log('Respuesta del servidor:', data);
            })
            

            .catch(error => {
                console.error('Error en la solicitud:', error);
            })
    }

    function loadUsers() {
        const token = sessionStorage.getItem('token');
        fetch("http://127.0.0.1:8000/api/users", {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            }
        })

        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json(); 
        })

        .then(data => {console.log(data)})

        .catch(error => {console.error(error)});
    }

    if (loginBoton) {
        loginBoton.addEventListener('click', () => {
          login();
        });
    };

    if (userBoton) {
        userBoton.addEventListener('click', () => {
          loadUsers();
        });
    };
});