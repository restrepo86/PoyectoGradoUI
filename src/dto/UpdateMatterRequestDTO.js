class UpdateMatterRequestDTO {

    componenteDeFormacion;
    nombre; 
    creditos; 
    horasTeoricas;
    horasLaboratorio; 
    horasPracticas; 
    trabajoIndependienteEstudiante; 
    nivel;
    requisitoNivel;
    tie;

    constructor(componenteDeFormacion, nombre, creditos, horasTeoricas, horasLaboratorio, horasPracticas, trabajoIndependienteEstudiante, nivel, requisitoNivel, tie) {

        this.componenteDeFormacion = componenteDeFormacion;
        this.nombre = nombre;
        this.creditos = creditos;
        this.horasTeoricas = horasTeoricas;
        this.horasLaboratorio = horasLaboratorio;
        this.horasPracticas = horasPracticas;
        this.trabajoIndependienteEstudiante = trabajoIndependienteEstudiante;
        this.nivel = nivel;
        this.requisitoNivel = requisitoNivel;
        this.tie = tie;

    };

}

export default UpdateMatterRequestDTO;