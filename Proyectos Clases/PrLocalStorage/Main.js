class GestorLocalStorage
{
    clave;
    valor;

    constructor(clave)
    {
        this.clave = clave;
    }

    registrarPv(valor)
    {
        if (valor == null)
        {
            return "Valor no debe ser nulo";
        }

        this.valor = valor;

        localStorage.setItem(this.clave,this.valor);

        return "Valor registrado correctamente";
    }

    registrarSv(valor)
    {
        if (valor == null)
        {
            return "Valor no debe ser nulo";
        }

        this.valor = this.consultarValor();
        this.valor += valor;

        localStorage.setItem(this.clave,this.valor);

        return "Valor registrado correctamente";
    }


    //diferencia entre RegistrarPv y RegistrarSV.
    //RegistrarPV Registrar datos nuevos borrando el anterior.
    //RegistrarSV Antes de guardar consulta lo que ya esta en el local storage, para guardarlo con el dato nuevo.
    consultarValor()
    {
        var valorLocalSotage = "";
        valorLocalSotage = localStorage.getItem(this.clave);
        if(valorLocalSotage == null)
        {
            valorLocalSotage = "";
        }
        return valorLocalSotage;
    }

    eliminarValor()
    {
        localStorage.removeItem(this.clave);
        //localStorage.setItem(this.clave,"");
    }
}

// Relacion con el primer formulario  que registra de la primera forma
var fmrRegistroPv = $("#FmrRegistroPv");
var fmrInputClave = $("#Clave");
var fmrInputValor = $("#Valor");

// Relacion con el segundo formulario que registra de la segunda forma
var fmrRegistroSv = $("#FmrRegistroSv");
var fmrSvInputClave = $("#ClaveSv");
var fmrSvInputValor = $("#ValorSv");

// Relacion con los imput de consulta
var inputClaveConsulta = $("#ClaveConsulta");
var pDatosConsulta = $("#DatosConsulta");
var BtnConsulta = $("#BtnConsulta");
// Relacion con los imput de eliminar
var inputClaveEliminar = $("#ClaveEliminar");
var BtnEliminar = $("#BtnEliminar");



//Evento submit del primer formulario
fmrRegistroPv.submit((evento) =>{
    let gestorLS =new GestorLocalStorage(fmrInputClave.val());

    var respuestaRegistraPv =  gestorLS.registrarPv(fmrInputValor.val());

    alert(respuestaRegistraPv);

    evento.preventDefault();
});

//Evento submit del segundo formulario
fmrRegistroSv.submit((evento) =>{
    let gestorLS =new GestorLocalStorage(fmrSvInputClave.val());

    var respuestaRegistraPv =  gestorLS.registrarSv(fmrSvInputValor.val());

    alert(respuestaRegistraPv);

    evento.preventDefault();
});


//Evento boton consulta
BtnConsulta.click((evento) =>{
    let gestorLS = new GestorLocalStorage(inputClaveConsulta.val());
    var datos = gestorLS.consultarValor();
    pDatosConsulta.append(datos);
});

//Evento boton eliminar
BtnEliminar.click((evento) =>{
    let gestorLS = new GestorLocalStorage(inputClaveEliminar.val());
    gestorLS.eliminarValor();
    alert("Datos Eliminados");
});



