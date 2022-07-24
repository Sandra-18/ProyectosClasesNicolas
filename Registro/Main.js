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
    ConsultarPeroyectosByPersona(IdPersona)
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

var SelectPersona = $("#SltPersonas");
var NombresPersonaCrear = $("#Nombres");
var ApellidosPersonaCrear = $("#Apellidos");
var IdPersonaRegistro = $("#IdPersona");
var FrmRegistroPersona = $("#FmrRegistroPersona");
FrmRegistroPersona.addClass("Mostrar");

var FmrRegistro = $("#FmrRegistro");
var nombreProyecto = $("#NombreProyecto");
var Ruta = $("#Ruta");


var PersonasConsultadas = GestorLS.ConsultarPersonas();
var OpcionPersonaSeleccionada = "0";

function AgregarPersonaAlCombo(persona)
{
    SelectPersona.prepend("<option value='"+persona.IdPersona+"'>Id: "+persona.IdPersona+" Nombre: "+persona.Nombres+" "+persona.Apellidos+"</option>");
}

SelectPersona.prepend("<option value='0'>Persona nueva</option>");
PersonasConsultadas.forEach(personaItem => {
    AgregarPersonaAlCombo(personaItem);
});

SelectPersona.change(() => {
    OpcionPersonaSeleccionada = $('#SltPersonas').val();
    if(OpcionPersonaSeleccionada != 0){
        FrmRegistroPersona.addClass("Ocultar");
        FrmRegistroPersona.removeClass("Mostrar");
    }else{
        FrmRegistroPersona.addClass("Mostrar");
        FrmRegistroPersona.removeClass("Ocultar");
    }
});

FrmRegistroPersona.submit((evento) => {
    var PersonaCrear = new Persona(NombresPersonaCrear.val(), ApellidosPersonaCrear.val(), IdPersonaRegistro.val());
    console.log(PersonaCrear);
    GestorLS.AgregarPersona(PersonaCrear);
    AgregarPersonaAlCombo(PersonaCrear);
    OpcionPersonaSeleccionada = PersonaCrear.IdPersona;
    $("#SltPersonas > option[value='"+OpcionPersonaSeleccionada+"']").attr("selected",true);
    FrmRegistroPersona.addClass("Ocultar");
    FrmRegistroPersona.removeClass("Mostrar");
    evento.preventDefault();
});


FmrRegistro.submit((evento) => {
    var ProyectoCrear = new Proyecto(nombreProyecto.val(), Ruta.val(), OpcionPersonaSeleccionada);
    GestorLS.AgregarProyecto(ProyectoCrear);
    evento.preventDefault();
});



