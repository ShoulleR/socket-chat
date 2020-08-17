const { io } = require('../server');
const { crearMensaje } = require('../utilidades/utilidades');

const { Usuarios } = require('../classes/usuarios.js');


const usuarios = new Usuarios();



io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala son necesarios'
            });
        }

        client.join(data.sala); // Metodo join de socket permite al usuario entrar a una sala en especifico.

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));


        callback(personas)
    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id); // usamos el metodo get Persona de usuarios, asi sabemos automaticamente quien envia el mensaje

        let mensaje = crearMensaje(persona, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje); // aqui no tenemos el data.sala pero si tenemos persona.sala al memomento de Agregarla con el metodo AgregarPersona

    });


    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);


        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`))

        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));

    });


    client.on('mensajePrivado', data => {

        console.log(data);

        if (!client.id) {
            return `el id del cliente es necesario`
        }

        let persona = usuarios.getPersona(client.id)

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
        // el .to() de broadcast permite decirle a quien queremos enviar el mensaje en este caso necesitariamos el ID
        //colocamos el data.para porque necesitamos que nos envien esa informacion tambien en el mensaje



    })

});