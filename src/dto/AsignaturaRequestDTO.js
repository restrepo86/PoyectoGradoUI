class AsignaturaRequestDTO {

    codigo;
    componenteDeFormacion;
    nombre;
    creditos;
    horasTeoricas;
    horasLaboratorio;
    nivel;
    requisitos = [];
    horasPracticas;
    trabajoIndependienteEstudiante;
    requisitoNivel;

    constructor(codigo, componenteDeFormacion, nombre, creditos, horasTeoricas, horasLaboratorio, nivel, horasPracticas, trabajoIndependienteEstudiante, requisitoNivel){

        this.codigo = codigo;
        this.componenteDeFormacion = componenteDeFormacion;
        this.nombre = nombre;
        this.creditos = creditos;
        this.horasTeoricas = horasTeoricas;
        this.horasLaboratorio = horasLaboratorio;
        this.nivel = nivel;
        this.horasPracticas = horasPracticas;
        this.trabajoIndependienteEstudiante = trabajoIndependienteEstudiante;
        this.requisitoNivel = requisitoNivel;

    }


}

export default AsignaturaRequestDTO;