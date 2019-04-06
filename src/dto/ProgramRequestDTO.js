class ProgramRequestDTO {

    id;
    nombre;
    codigoSnies;

    constructor(id, nombre, codigoSnies) {
        this.id = id;
        this.nombre = nombre;
        this.codigoSnies = codigoSnies;
    }
}

export default ProgramRequestDTO;
