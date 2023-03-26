function validacionForm(){
    var nombre= document.getElementById ("nombre").value;
    var edad = document.getElementById ("edad").value;
    var direccion = document.getElementById ("direccion").value;
    var correo = document.getElementById ("correo").value;

    if (nombre == ""){
        alert ("El Campo Nombre es Requerido");
        return false;
    }

    if (edad == ""){
        alert ("El Campo Ciudad es Requerido");
        return false;
    }else if (edad < 1) {
        alert ("No se aceptan numeros negativos ni 0");
    }

    if (direccion == ""){
        alert ("El Campo Telefono es Requerido");
        return false;
    }

    if (correo == "") {
        alert ('El campo correo es requerido');
        return false;
    } else if (!correo.includes("@")){
        alert('El correo no es valido');
        return false;
    }

    return true;
}

function mostrarDato(){
    var listaContacto;
    if (localStorage.getItem("listaContacto") == null){
        listaContacto = [];
    } else{
        listaContacto = JSON.parse(localStorage.getItem("listaContacto"));
    }

    var html = "";

    listaContacto.forEach(function(element, index ) {
        html += "<tr>";
        html += "<td>"+ element.nombre +"</td>";
        html += "<td>"+ element.edad +"</td>";
        html += "<td>"+ element.direccion +"</td>";
        html += "<td>"+ element.correo +"</td>";
        html += '<td><button onclick="borrarDato('+ index +')" class="btn btn-danger">Eliminar</button> <button onclick="editarDato('+ index +')"class="btn btn-warning m-2">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector("#tablaDatos tbody").innerHTML = html;
}

document.onload = mostrarDato();

function nuevoDato(){
    if (validacionForm() == true){
        var nombre = document.getElementById("nombre").value;
        var edad = document.getElementById("edad").value;
        var direccion = document.getElementById("direccion").value;
        var correo = document.getElementById("correo").value;
        
        var listaContacto;
        if (localStorage.getItem("listaContacto") == null) {
           listaContacto = [];
        } else {
            listaContacto = JSON.parse(localStorage.getItem("listaContacto"));
        }
        
        listaContacto.push({
            nombre: nombre,
            edad: edad,
            direccion: direccion,
            correo: correo,
        });

        localStorage.setItem("listaContacto", JSON.stringify(listaContacto));
        mostrarDato();
        document.getElementById("nombre").value="";
        document.getElementById("edad").value="";
        document.getElementById("direccion").value="";
        document.getElementById("correo").value="";
    }
}

function borrarDato(index){
    var listaContacto;
        if (localStorage.getItem("listaContacto")== null){
        listaContacto = [];
        }else{
        listaContacto = JSON.parse(localStorage.getItem("listaContacto"))
        }
   
        listaContacto.splice (index, 1)
        localStorage.setItem("listaContacto", JSON.stringify(listaContacto));
        mostrarDato();
}

function editarDato(index){
    document.getElementById("btnNuevo").style.display = "none";
    document.getElementById("btnActualizar").style.display= "block";

    var listaContacto;
    if (localStorage.getItem("listaContacto")== null){
        listaContacto = [];
    }else {
        listaContacto= JSON.parse(localStorage.getItem("listaContacto"));
    }
    document.getElementById("nombre").value = listaContacto[index].nombre;
    document.getElementById("edad").value = listaContacto[index].edad;
    document.getElementById("direccion").value = listaContacto[index].direccion;
    document.getElementById("correo").value = listaContacto[index].correo;
    
    document.querySelector("#btnActualizar").onclick = function(){
        if (validacionForm() == true){
            listaContacto[index].nombre = document.getElementById("nombre").value;
            listaContacto[index].edad = document.getElementById("edad").value;
            listaContacto[index].direccion = document.getElementById("direccion").value;
            listaContacto[index].correo = document.getElementById("correo").value;
        
            localStorage.setItem ("listaContacto", JSON.stringify(listaContacto));
            mostrarDato();

            document.getElementById("nombre").value="";
            document.getElementById("edad").value="";
            document.getElementById("direccion").value="";
            document.getElementById("correo").value="";

            document.getElementById("btnNuevo").style.display = "block";
            document.getElementById("btnActualizar").style.display= "none";
        }

    };
}






