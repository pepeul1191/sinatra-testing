var array_json_th = [
	{titulo:"id", index: "id", estilos:"width: 10px; display:none;"},
	{titulo:"Nombre",index:"nombre",estilos:"width: 200px;"},
	{titulo:"Botones",index:"NA",estilos:"width: 10px;"}
];

var array_json_td = [
	{tipo:"label_id",estilos:"color: blue; display:none", index:"id", edicion:""},
	{tipo:"text",estilos:"width:200px;", index:"nombre", edicion:""},
	{tipo:"botones", index:"botones", edicion:"true"}
];

var array_json_btn_td = [
	{clase:"fa fa-times",url:"#",alt:"Eliminar permiso",estilos:"padding-left: 32px;", operacion:"QuitarFila"}
];

var array_json_btn = [
	{tipo: "agrega_fila", operacion:"AgregarFila", icono: "fa fa-plus", label: "Agregar Registro", clase: "boton-tabla  mootools"},
	{tipo: "guardar_tabla", operacion:"GuardarTabla", icono: "fa fa-check", label: "Guardar Cambios", clase: "boton-tabla  mootools" }
];

var ajax_dao_tipo_activos = new AjaxPython();
ajax_dao_tipo_activos.Constructor("GET", BASE_URL + "carrera/listar", "", false);

var tablaCarrera = new Grid();

tablaCarrera.SetTableId("tablaCarrera");
tablaCarrera.SetTableObj("tablaCarrera");
tablaCarrera.SetTableHeader(array_json_th);
tablaCarrera.SetTableBody(array_json_td, array_json_btn_td, ajax_dao_tipo_activos);
tablaCarrera.SetTableFooter(array_json_btn, false);
tablaCarrera.SetLabelMensaje("#txtMensajeRpta");
tablaCarrera.SetURLGuardar(BASE_URL + "carrera/guardar");

tablaCarrera.MostrarTable();

$("#test-observador").on( "click", function() { verObservadores(); });
