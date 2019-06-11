class UserNewResponse {

    nombre;
    primerApellido;
    segundoApellido;
    fechaNacimiento;
    correo;
    password;
    usuario;
    direccion;
    celular;
    fechaRegistro;
    fechaModificacion;

    constructor(nombre, primerApellido, segundoApellido, fechaNacimiento, correo, password, usuario, direccion, celular, fechaRegistro, fechaModificacion) {
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.fechaNacimiento = fechaNacimiento;
        this.correo = correo;
        this.password = password;
        this.usuario = usuario;
        this.direccion = direccion;
        this.celular = celular;
        this.fechaRegistro = fechaRegistro;
        this.fechaModificacion = fechaModificacion;
    };

}