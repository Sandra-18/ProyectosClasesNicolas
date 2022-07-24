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
}

// Relacion con el primer formulario  que registra de la primera forma
var fmrRegistroPv = $("#FmrRegistroPv");
var fmrInputClave = $("#Clave");
var fmrInputValor = $("#Valor");

// Relacion con el segundo formulario que registra de la segunda forma
var fmrRegistroSv = $("#FmrRegistroSv");
var fmrSvInputClave = $("#ClaveSv");
var fmrSvInputValor = $("#ValorSv");


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



