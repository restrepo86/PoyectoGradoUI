class AddUserRequestDTO {

    nombre;
    primerApellido;
    segundoApellido;
    fechaNacimiento;
    correo;
    password;
    usuario;
    direccion;
    celular;

    constructor(nombre, primerApellido, segundoApellido, fechaNacimiento, correo, password, usuario, direccion, celular) {
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.fechaNacimiento = fechaNacimiento;
        this.correo = correo;
        this.password = password;
        this.usuario = usuario;
        this.direccion = direccion;
        this.celular = celular;
    };

}

export default AddUserRequestDTO;