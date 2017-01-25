var array_json_th = [
	{titulo:"id", index: "id", estilos:"width: 10px; display:none;"},
	{titulo:"Código",index:"codigo",estilos:"width: 100px;"},
  {titulo:"Carrera",index:"carrera",estilos:"width: 200px;"},
  {titulo:"Apellido Paterno",index:"apellido_paterno",estilos:"width: 200px;"},
  {titulo:"Apellido Materno",index:"apellido_materno",estilos:"width: 200px;"},
  {titulo:"Nombres",index:"nombres",estilos:"width: 250px;"},
	{titulo:"Botones",index:"NA",estilos:"width: 110px; padding-left: 25px;"}
];

var array_json_td = [
	{tipo:"label_id",estilos:"color: blue; display:none", index:"id", edicion:""},
	{tipo:"label",estilos:"width:100px;", index:"codigo", edicion:""},
  {tipo:"label",estilos:"width:200px;", index:"carrera", edicion:""},
  {tipo:"label",estilos:"width:200px;", index:"apellido_paterno", edicion:""},
  {tipo:"label",estilos:"width:200px;", index:"apellido_materno", edicion:""},
  {tipo:"label",estilos:"width:250px;", index:"nombres", edicion:""},
	{tipo:"botones", index:"botones", edicion:"true"}
];

var array_json_btn_td = [
  {clase:"fa fa-search",url:"#",alt:"Ver alumno",estilos:"padding-left: 32px;", operacion:"VerAlumno"},
  {clase:"fa fa-pencil",url:"#",alt:"Editar alumno",estilos:"padding-left: 32px;", operacion:"EditarAlumno"},
	{clase:"fa fa-times",url:"#",alt:"Eliminar alumno",estilos:"padding-left: 32px;", operacion:"QuitarFila"}
];

var array_json_btn = [
	{tipo: "agrega_fila", operacion:"AgregarFila", icono: "fa fa-plus", label: "Agregar Registro", clase: "boton-tabla  mootools"},
	{tipo: "guardar_tabla", operacion:"GuardarTabla", icono: "fa fa-check", label: "Guardar Cambios", clase: "boton-tabla  mootools" }
];

var ajax_dao_tipo_activos = new AjaxPython();
ajax_dao_tipo_activos.Constructor("GET", BASE_URL + "alumno/listar", "", false);

var tablaAlumno = new Grid();

tablaAlumno.SetTableId("tablaAlumno");
tablaAlumno.SetTableObj("tablaAlumno");
tablaAlumno.SetTableHeader(array_json_th);
tablaAlumno.SetTableBody(array_json_td, array_json_btn_td, ajax_dao_tipo_activos);
tablaAlumno.SetTableFooter(array_json_btn, false);
tablaAlumno.SetLabelMensaje("#txtMensajeRpta");
tablaAlumno.SetURLGuardar(BASE_URL + "alumno/guardar");

tablaAlumno.MostrarTable();

var EditarAlumno = new Class({
    Interfaces: [ IChainOperacion ],
    SetearSiguienteInstancia: function(instancia){
        //implementación de IChainOperacion
        this.siguiente_instancia = instancia;
    },
    SiguienteEslabon: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        this.siguiente_instancia.EjecutarOperacion(operacion, thisDOM, objeto);
    },
    EjecutarOperacion: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        var id_subtitulo = thisDOM.parent().parent().children(0).children(0).html();

        if(operacion == "EditarAlumno"){
        		var id_alumno = $(thisDOM.parent().parent().children()[0]).children().html();
        		window.location.replace(BASE_URL + "alumno/editar/"+ id_alumno);
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

var VerAlumno = new Class({
    Interfaces: [ IChainOperacion ],
    SetearSiguienteInstancia: function(instancia){
        //implementación de IChainOperacion
        this.siguiente_instancia = instancia;
    },
    SiguienteEslabon: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        this.siguiente_instancia.EjecutarOperacion(operacion, thisDOM, objeto);
    },
    EjecutarOperacion: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        var id_subtitulo = thisDOM.parent().parent().children(0).children(0).html();

        if(operacion == "VerAlumno"){
        		var id_alumno = $(thisDOM.parent().parent().children()[0]).children().html();
        		window.location.replace(BASE_URL + "alumno/ver/"+ id_alumno);
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

$(document).on("click", ".mootools", function() {
    var objeto = eval(this.get("objeto"));
    var eslabon_1 = new EditarAlumno();
    var eslabon_2 = new VerAlumno();

    eslabon_1.SetearSiguienteInstancia(eslabon_2);

    var operacion = this.get("operacion"); console.log(operacion);

    eslabon_1.EjecutarOperacion(operacion, $(this), objeto);
});
