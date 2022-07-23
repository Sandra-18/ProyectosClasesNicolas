class Proyecto{
    Nombre;
    Ruta;
    IdPersona;

    constructor(nombre, Ruta, idPersona){
        this.Nombre = nombre;
        this.Ruta = Ruta;
        this.IdPersona = idPersona;
    }
}

class GestorLocalStorage
{
    ClavePersonas = "Personas";
    ClaveProyectos = "Proyectos";
    proyectos;
    Personas;
    ConsultarPersonas()
    {
        var personasJson = localStorage.getItem(this.ClavePersonas);
        if (personasJson != null) {
            this.Personas = JSON.parse(personasJson);
        }else{
            this.Personas = [];
        }
        return this.Personas;
    } 
    ConsultarPersona(IdPersona)
    {
        this.ConsultarPersonas();
        this.Personas.forEach(personaItem => {
            if(personaItem.IdPersona == IdPersona){
                return personaItem;
            }
        });
        return null;
    }

    ConsultarProyectos()
    {
        var proyectosJson = localStorage.getItem(this.ClaveProyectos);
        if (proyectosJson != null) {
            this.Proyectos = JSON.parse(proyectosJson);
        }else{
            this.Proyectos = [];
        }
        return this.Proyectos;
    }
    ConsultarProyectosByPersona(IdPersona)
    {
        this.ConsultarProyectos();
        var proyectos = [];
        this.Proyectos.forEach(pryectoItem => {
            if(pryectoItem.IdPersona == IdPersona){
                proyectos.push(pryectoItem);
            }
        });
        return proyectos;
    }
    
    AgregarPersona(persona)
    {
        var personaConsulta = this.ConsultarPersona(persona.IdPersona);

        if(personaConsulta == null)
        {
            this.Personas.push(persona);
            var personasJson = JSON.stringify(this.Personas);
            localStorage.setItem(this.ClavePersonas, personasJson);
            return persona;
        }
        return null;
    }
    AgregarProyecto(proyecto)
    {
        this.ConsultarProyectos();
        this.Proyectos.push(proyecto);
        var proyectosJson = JSON.stringify(this.Proyectos);
        localStorage.setItem(this.ClaveProyectos, proyectosJson); 
    }
}

class Persona{
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


var GestorLS = new GestorLocalStorage();
var ProyectosConsultados = GestorLS.ConsultarProyectos();
var PersonasConsultadas = GestorLS.ConsultarPersonas();

var tbodyProyectos = $("#tbodyProyectos");
var tbodyPersonas = $("#tbodyPersonas");

ProyectosConsultados.forEach((proyectoItem,index) => {
    tbodyProyectos.append(
        '<tr><th scope="row">'+(index+1)+"</th><td>"+proyectoItem.Nombre+"</td><td>"+proyectoItem.Ruta+"</td><td>"+proyectoItem.IdPersona+'</td><td><a href="../'+proyectoItem.Ruta+'">Ver</a></td></tr>'
    );
});

PersonasConsultadas.forEach((personaItem,index) => {
    var Proyectos = GestorLS.ConsultarProyectosByPersona(personaItem.IdPersona);
    tbodyPersonas.append(
        '<tr><th scope="row">'+(index+1)+"</th><td>"+personaItem.Nombres+"</td><td>"+personaItem.Apellidos+"</td><td>"+personaItem.IdPersona+"</td><td>"+Proyectos.length+"</td></tr>"
    );
});

