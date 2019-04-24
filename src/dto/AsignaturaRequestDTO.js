class AsignaturaRequestDTO {

    codigo;
    componenteDeFormacion;
    nombre;
    creditos;
    horasTeoricas;
    horasLaboratorio;
    semestre;
    requisitos = [];

    constructor(codigo, componenteFormacion, nombre, creditos, horasTeoricas, horasLaboratorio, semestre){

        this.codigo = codigo;
        this.componenteDeFormacion = componenteFormacion;
        this.nombre = nombre;
        this.creditos = creditos;
        this.horasTeoricas = horasTeoricas;
        this.horasLaboratorio = horasLaboratorio;
        this.semestre = semestre;

    }


}

export default AsignaturaRequestDTO;