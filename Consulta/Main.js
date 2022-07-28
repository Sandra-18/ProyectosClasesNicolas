import Persona from '../Clases/Persona.js';
import Proyecto from '../Clases/Proyecto.js';  
import GestorLocalStorage from '../Clases/GestorLocalStorage.js';


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

