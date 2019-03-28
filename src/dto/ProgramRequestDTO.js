class ProgramRequestDTO {

    id;
    nombre;
    codigoSnies;
    planesDeEstudio;

    constructor(id, nombre, codigoSnies, planesDeEstudio) {
        this.id = id;
        this.nombre = nombre;
        this.codigoSnies = codigoSnies;
        this.planesDeEstudio = planesDeEstudio;
        
    }
}

export default ProgramRequestDTO;
