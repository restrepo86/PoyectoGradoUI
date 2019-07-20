class AsignaturaRequestDTO {

    codigo;
    componenteDeFormacion;
    nombre;
    creditos;
    horasTeoricas;
    horasLaboratorio;
    nivel;
    horasPracticas;
    trabajoIndependienteEstudiante;
    requisitoNivel;
    tie;

    constructor(codigo, componenteDeFormacion, nombre, creditos, horasTeoricas, horasLaboratorio, nivel, horasPracticas, trabajoIndependienteEstudiante, requisitoNivel, tie){

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
        this.tie = tie;

    }


}

export default AsignaturaRequestDTO;