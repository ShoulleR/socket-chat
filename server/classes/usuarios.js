class Usuarios {

    constructor() {
        this.personas = [];

    }

    agregarPersona(id, nombre, sala) {

        let persona = {
            id,
            nombre,
            sala
        }

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {

        let persona = this.personas.filter(c => c.id === id)[0]; //se le pone posicion [0] para que sea solo 1 registro siempre

        return persona

    }

    getPersonas() {

        return this.personas;
    }

    getPersonasPorSala(sala) {

        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }


    borrarPersona(id) {

        let personaBorrada = this.getPersona(id); // aqui buscamos el nombre de la persona

        this.personas = this.personas.filter(c => c.id !== id); // aqui modificamos y le decimos al array que va a ser al array pero filtrado

        return personaBorrada; // se devuelve la persona borrada 
    }

}







module.exports = {
    Usuarios
}