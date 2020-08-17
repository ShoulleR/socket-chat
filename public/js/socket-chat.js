var socket = io();


//BUSCAMOS EL NOMBRE DEL USUARIO DESDE EL URL

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre' || !params.has('sala'))) { //si no viene ningun param llamado nombre o sala
    window.location = 'index.html' // aqui lo redireccionamos a index.html
    throw new Error('El nombre y la sala  son necesario')
}

var usuario = { //en caso de que exista el param('nombre') esto es para obtener los valores del URL
    nombre: params.get('nombre'),
    sala: params.get('sala')

}


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) { // Si el servidor me acepta, es decir conecta con esto, necesito enviar un callback como respuesta del servidor
        console.log('Usuarios Conectados:', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
//socket.emit('crearMensaje', {
//    usuario: 'Fernando',
//    mensaje: 'Hola Mundo'
//}, function(resp) {
//    console.log('respuesta server: ', resp);
//});

// Escuchar información para enviar el serv
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


//Escuchar cambios de usuario
//cuando una persona entra o sale del chat

socket.on('listaPersonas', function(personas) {

    console.log(personas);

});


//Escuchar Mensaje Privado

socket.on('mensajePrivado', function(mensaje) {

    console.log(mensaje);

    console.log(`mensaje privado: ${mensaje}`);

});