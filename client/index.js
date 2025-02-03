// Cambiar por la IP de tu servidor
const apiUrl = 'http://192.168.100.6:3000'; 

// Función para agregar un producto
async function agregarProducto() {
    let nombre = document.getElementById("nombreProducto").value;
    let precio = document.getElementById("precioProducto").value;
    let stock = document.getElementById("stockProducto").value;
    let categoria = document.getElementById("categoriaProducto").value;

    if (!nombre || !precio || !stock || !categoria) return;
    
    const response = await fetch(`${apiUrl}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio, stock, categoria }),
    });

    const nuevoProducto = await response.json();
    actualizarTabla();
}

// Función para actualizar la tabla de productos
async function actualizarTabla() {
    const response = await fetch(`${apiUrl}/productos`);
    const productos = await response.json();
    let tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = "";
    
    productos.forEach((producto, index) => {
        let fila = `
            <tr>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>${producto.categoria}</td>
                <td>
                    <input type="number" id="inputCantidad${producto.id}" class="form-control w-auto" placeholder="Cantidad">
                    <button class='btn btn-success' onclick='modificarStock(${producto.id}, "aumentar")'>Aumentar</button>
                    <button class='btn btn-warning' onclick='modificarStock(${producto.id}, "disminuir")'>Disminuir</button>
                    <button class='btn btn-danger' onclick='eliminarProducto(${producto.id})'>Eliminar</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

// Función para eliminar un producto
async function eliminarProducto(id) {
    await fetch(`${apiUrl}/productos/${id}`, {
        method: 'DELETE',
    });
    actualizarTabla();
}

// Función para modificar el stock de un producto
async function modificarStock(id, accion) {
    const cantidad = document.getElementById(`inputCantidad${id}`).value;
    if (!cantidad || cantidad <= 0) return;

    if (accion == "aumentar") {
        await fetch(`${apiUrl}/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cantidad, accion })
        });
    }

    if (accion == "disminuir"){
        await fetch(`${apiUrl}/ventas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, cantidad })
        });
    }

    actualizarTabla();
}

// Función para buscar un producto
async function buscarProducto() {
    const busqueda = document.getElementById("buscarProducto").value.toLowerCase();
    const response = await fetch(`${apiUrl}/productos`);
    const productos = await response.json();
    const productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(busqueda));
    
    let tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = "";
    
    productosFiltrados.forEach((producto) => {
        let fila = `
            <tr>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>${producto.categoria}</td>
                <td>
                    <input type="number" id="inputCantidad${producto.id}" class="form-control w-auto" placeholder="Cantidad">
                    <button class='btn btn-success' onclick='modificarStock(${producto.id}, "aumentar")'>Aumentar</button>
                    <button class='btn btn-warning' onclick='modificarStock(${producto.id}, "disminuir")'>Disminuir</button>
                    <button class='btn btn-danger' onclick='eliminarProducto(${producto.id})'>Eliminar</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
} 

// Función para actualizar la tabla de ventas
async function actualizarVentas() {
    const response = await fetch(`${apiUrl}/ventas`);
    const ventas = await response.json();
    const tablaVentas = document.getElementById('tablaVentas');
    tablaVentas.innerHTML = '';
    let totalIngresos = 0;
    
    ventas.forEach(venta => {
        const fecha = new Date(venta.createdAt);
        const fechaFormateada = fecha.toLocaleString('es-ES', {
            weekday: 'short', // Día de la semana
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${venta.nombreProducto}</td>
            <td>${venta.cantidad}</td>
            <td>$${venta.totalVenta}</td>
            <td>${fechaFormateada}</td>
        `;
        tablaVentas.appendChild(fila);
        totalIngresos += venta.totalVenta;
    });

    document.getElementById('totalIngresos').textContent = totalIngresos.toFixed(2);
}

// Evento que se ejecuta cuando el DOM ha sido cargado
document.addEventListener("DOMContentLoaded", (e) =>{
    actualizarTabla();
    actualizarVentas();
});
