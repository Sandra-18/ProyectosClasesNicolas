import Persona from '../Clases/Persona.js';
import Proyecto from '../Clases/Proyecto.js';  
import GestorLocalStorage from '../Clases/GestorLocalStorage.js';

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



