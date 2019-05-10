class UpdateMatterRequestDTO {

    componenteDeFormacion;
    nombre; 
    creditos; 
    horasTeoricas;
    horasLaboratorio; 
    horasPracticas; 
    trabajoIndependienteEstudiante; 
    semestre;

    constructor(componenteDeFormacion, nombre, creditos, horasTeoricas, horasLaboratorio, horasPracticas, trabajoIndependienteEstudiante, semestre) {

        this.componenteDeFormacion = componenteDeFormacion;
        this.nombre = nombre;
        this.creditos = creditos;
        this.horasTeoricas = horasTeoricas;
        this.horasLaboratorio = horasLaboratorio;
        this.horasPracticas = horasPracticas;
        this.trabajoIndependienteEstudiante = trabajoIndependienteEstudiante;
        this.semestre = semestre;

    };

}

export default UpdateMatterRequestDTO;