export default class GestorLocalStorage
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