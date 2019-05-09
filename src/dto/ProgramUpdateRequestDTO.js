class ProgramUpdateRequestDTO {

    codigoSnies;
    programName;

    constructor(codigoSnies, programName) {
        this.codigoSnies = codigoSnies;
        this.programName = programName;
    }
}

export default ProgramUpdateRequestDTO;