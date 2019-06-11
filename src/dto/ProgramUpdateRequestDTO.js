class ProgramUpdateRequestDTO {

    codigoSnies;
    nombre;

    constructor(codigoSnies, programName) {
        this.codigoSnies = codigoSnies;
        this.nombre = programName;
    }
}

export default ProgramUpdateRequestDTO;