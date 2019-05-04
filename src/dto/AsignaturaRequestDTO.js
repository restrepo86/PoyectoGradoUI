class AsignaturaRequestDTO {

    codigo;
    componenteDeFormacion;
    nombre;
    creditos;
    horasTeoricas;
    horasLaboratorio;
    semestre;
    requisitos = [];
    horasPracticas;
    trabajoIndependienteEstudiante;

    constructor(codigo, componenteFormacion, nombre, creditos, horasTeoricas, horasLaboratorio, semestre, horasPracticas, trabajoIndependienteEstudiante){

        this.codigo = codigo;
        this.componenteDeFormacion = componenteFormacion;
        this.nombre = nombre;
        this.creditos = creditos;
        this.horasTeoricas = horasTeoricas;
        this.horasLaboratorio = horasLaboratorio;
        this.semestre = semestre;
        this.horasPracticas = horasPracticas;
        this.trabajoIndependienteEstudiante = trabajoIndependienteEstudiante;
    }


}

export default AsignaturaRequestDTO;