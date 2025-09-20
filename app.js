// Elementos del DOM
        const inputAmigo = document.getElementById("amigo");
        const ulListaAmigos = document.getElementById("listaAmigos");
        const ulResultado = document.getElementById("resultado");
        
        // Botones
        const btnAgregar = document.getElementById("btnAgregar");
        const btnSortear = document.getElementById("btnSortear");
        const btnReset = document.getElementById("btnReset");
        
        // Eventos
        btnAgregar.addEventListener("click", agregarAmigo);
        btnSortear.addEventListener("click", sortearAmigo);
        btnReset.addEventListener("click", resetearLista);
        inputAmigo.addEventListener("keypress", function(e) {
            if (e.key === "Enter") agregarAmigo();
        });
        inputAmigo.addEventListener("input", actualizarUI);
        
        // Función para agregar amigo
        function agregarAmigo() {
            const amigo = inputAmigo.value.trim();
            
            // Validaciones
            if (!validarNombre(amigo)) return;
            
            // Verificar si ya existe
            if (nombreExiste(amigo)) {
                alert("Este nombre ya está en la lista.");
                return;
            }
            
            // Agregar a la lista
            const nuevoAmigo = document.createElement("li");
            nuevoAmigo.textContent = amigo;
            ulListaAmigos.appendChild(nuevoAmigo);
            
            // Limpiar input y actualizar UI
            inputAmigo.value = "";
            actualizarUI();
        }
        
        // Función de validación de nombre
        function validarNombre(nombre) {
            const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
            
            if (nombre === "") {
                alert("Ingresa un nombre válido.");
                return false;
            }
            
            if (!regex.test(nombre)) {
                alert("Ingresa un nombre válido (solo letras y espacios, mínimo 2 caracteres).");
                return false;
            }
            
            return true;
        }
        
        // Función para verificar si el nombre ya existe
        function nombreExiste(nombre) {
            const listaActual = Array.from(ulListaAmigos.querySelectorAll("li"))
                .map(li => li.textContent.toLowerCase());
            return listaActual.includes(nombre.toLowerCase());
        }
        
        // Función para sortear amigo
        function sortearAmigo() {
            const items = Array.from(ulListaAmigos.querySelectorAll("li"))
                .map(li => li.textContent);
            
            if (items.length < 2) {
                ulResultado.innerHTML = "<li>Ingrese al menos 2 participantes.</li>";
                return;
            }
            
            const randomIndex = Math.floor(Math.random() * items.length);
            const amigoSecreto = items[randomIndex];
            ulResultado.innerHTML = `<li>El amigo secreto es: ${amigoSecreto}</li>`;
        }
        
        // Función para reiniciar la lista
        function resetearLista() {
            ulListaAmigos.innerHTML = "";
            ulResultado.innerHTML = "";
            actualizarUI();
        }
        
        // Función para actualizar la UI
        function actualizarUI() {
            const lista = Array.from(ulListaAmigos.querySelectorAll("li"));
            btnSortear.disabled = lista.length < 2;
            btnAgregar.disabled = inputAmigo.value.trim() === "";
        }
        
        // Inicializar UI
        actualizarUI();