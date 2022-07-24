export default class Persona{
    IdPersona;
    Nombres;
    Apellidos;
    Proyectos;
    constructor(nombre,apellidos, idPersona){
        this.Nombres = nombre;
        this.Apellidos = apellidos;
        this.IdPersona = idPersona;
    }

    AgregarProyecto(proyecto){
        var GestorLS = new GestorLocalStorage();
        GestorLS.AgregarProyecto(proyecto);
        return "Proyecto agregado correctamente";
    }
    ConsultarMisProyectos()
    {
        var GestorLS = new GestorLocalStorage();
        var proyectosConsulta = GestorLS.ConsultarPeroyectosByPersona(this.IdPersona);
        return proyectosConsulta;
    }
}
