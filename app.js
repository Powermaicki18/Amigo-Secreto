// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
//Inicia declarando una variable de tipo array, que almacenará los nombres de los amigos ingresados. Ejemplo:  let amigos = []
//Implementar una función para agregar más amigos al array 
//Implementar función para actualizar la lista de amigos
//Implementar función para sortear la lista de amigos 

// Array para almacenar los nombres de los amigos
let amigos = [];

// Función para agregar un amigo al array
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    
    // Validar que el nombre no esté vacío
    if (nombreAmigo === '') {
        alert('Por favor, escribe un nombre');
        return;
    }
    
    // Validar que el nombre no esté duplicado
    if (amigos.includes(nombreAmigo)) {
        alert('Este amigo ya está en la lista');
        inputAmigo.value = '';
        return;
    }
    
    // Agregar el nombre al array
    amigos.push(nombreAmigo);
    
    // Actualizar la lista visual
    actualizarListaAmigos();
    
    // Limpiar el input
    inputAmigo.value = '';
    inputAmigo.focus();
}

// Función para actualizar la lista visual de amigos
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    
    // Limpiar la lista actual
    listaAmigos.innerHTML = '';
    
    // Agregar cada amigo a la lista con un botón para eliminar
    amigos.forEach((amigo, index) => {
        const itemLista = document.createElement('li');
        itemLista.textContent = amigo;
        
        // Agregar botón para eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = '✕';
        botonEliminar.style.marginLeft = '10px';
        botonEliminar.style.backgroundColor = 'transparent';
        botonEliminar.style.border = 'none';
        botonEliminar.style.color = 'red';
        botonEliminar.style.cursor = 'pointer';
        botonEliminar.setAttribute('aria-label', `Eliminar a ${amigo}`);
        
        botonEliminar.onclick = function() {
            eliminarAmigo(index);
        };
        
        itemLista.appendChild(botonEliminar);
        listaAmigos.appendChild(itemLista);
    });
    
    // Limpiar resultados anteriores
    document.getElementById('resultado').innerHTML = '';
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarListaAmigos();
}

// Función para sortear amigos secretos
function sortearAmigo() {
    const resultado = document.getElementById('resultado');
    
    // Validar que haya suficientes amigos para el sorteo
    if (amigos.length < 2) {
        alert('Necesitas al menos 2 amigos para realizar el sorteo');
        return;
    }
    
    // Limpiar resultados anteriores
    resultado.innerHTML = '';
    
    // Crear una copia del array de amigos
    const amigosSorteo = [...amigos];
    
    // Array para almacenar los pares de amigos secretos
    const parejas = [];
    
    // Algoritmo de Fisher-Yates para mezclar el array
    for (let i = amigosSorteo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosSorteo[i], amigosSorteo[j]] = [amigosSorteo[j], amigosSorteo[i]];
    }
    
    // Crear parejas de amigo secreto, asegurando que nadie sea su propio amigo secreto
    // y que la asignación forme un círculo completo
    for (let i = 0; i < amigos.length; i++) {
        let amigoActual = amigos[i];
        let amigoSecreto;
        
        if (i === amigos.length - 1) {
            amigoSecreto = amigosSorteo[0]; // El último le da al primero
        } else {
            amigoSecreto = amigosSorteo[i + 1];
        }
        
        parejas.push({
            amigo: amigoActual,
            amigoSecreto: amigoSecreto
        });
    }
    
    // Mostrar las parejas en la lista de resultados
    parejas.forEach(pareja => {
        const itemResultado = document.createElement('li');
        itemResultado.textContent = `${pareja.amigo} → ${pareja.amigoSecreto}`;
        resultado.appendChild(itemResultado);
    });
}

// Agregar evento para permitir agregar amigos presionando Enter
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});

// Inicializar la lista al cargar la página
document.addEventListener('DOMContentLoaded', actualizarListaAmigos);