function mostrarProducto(){
    let request = sendRequest('producto', 'GET', '');
    let card = document.getElementById('card');
    card.innerHTML = "";
    request.onload = function () {
        let data = request.response;
        // console.log(data);
        data.forEach(element => {
            card.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="" class="card-img-top" alt="${element.descripcion}">
                <div class="card-body">
                    <h5 class="card-title">${element.nombre}</h3>
                    <p class="card-text">$${element.precio}</p>
                    <p class="card-text">${element.descripcion}</p>
                    <button type="button" class="btn btn-warning" onclick="window.location = '/formGorras.html?id=${element._id}'">Editar</button>

                    <button type="button" class="btn btn-danger" onclick='deleteProducto("${element._id}")'>Eliminar</button>
                </div>
            </div>
            `
        });
    }
}

function deleteProducto(id){
    let request = sendRequest('producto/'+ id, 'Delete', '');
    request.onload = function(){
        mostrarProducto();
    }
}

function guardarProducto(){
    let nom = document.getElementById('nombre-n').value;
    let pre = document.getElementById('precio-p').value;
    let desc = document.getElementById('descripcion-d').value;
    let data = {'nombre':nom, 'precio':pre, 'descripcion':desc};
    let request = sendRequest('producto/', 'POST', data);
    request.onload = function(){
        window.location = 'gorras.html'
    }
    request.onerror = function() {
        console.log("Error al guardar los datos")
    }

}

function cargarDatos(id){
    let request = sendRequest('producto/'+id, 'GET', '');
    let nom = document.getElementById('nombre-n');
    let pre = document.getElementById('precio-p');
    let desc = document.getElementById('descripcion-d');

    request.onload = function(){
        let data = request.response;
        nom.value = data.nombre;
        pre.value = data.precio;
        desc.value = data.descripcion;
    }
    request.onerror = function() {
        console.log("Error al cargar los datos")
    }
}

function modificarProducto(id){
    let nom = document.getElementById('nombre-n').value;
    let pre = document.getElementById('precio-p').value;
    let desc = document.getElementById('descripcion-d').value;
    let data = {'nombre':nom, 'precio':pre, 'descripcion':desc};
    let request = sendRequest('producto/'+id, 'PUT', data);
    request.onload = function(){
        window.location = 'gorras.html'
    }
    request.onerror = function() {
        console.log("Error al guardar los datos")
    }

}