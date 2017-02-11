QUnit.module( "Guardar Alumno", {
	beforeEach: function() {
	}
});

QUnit.test( "Todos los campos vacíos", function( assert ) {
  	$("#btnGuardar").trigger("click");

  	assert.equal($("#txtApellidoPaterno").hasClass("input-text-error"), true, "El input[text] apellido paterno está vacío");
  	assert.equal($("#txtApellidoMaterno").hasClass("input-text-error"), true, "El input[text] apellido materno está vacío");
  	assert.equal($("#txtNombres").hasClass("input-text-error"), true, "El input[text] nombres está vacío");
  	assert.equal($("#txtCodigo").hasClass("input-text-error"), true, "El input[text] nombres está vacío");
  	assert.equal($("#slcCarrera").hasClass("input-text-error"), true, "El select de carreas está vacío");
  	assert.equal($("#lblMensaje").hasClass("color-rojo") && $("#lblMensaje").hasClass("mensaje") && $("#lblMensaje").html() == "No se pudo guardar al alumno, llene los campos obligatorios", true, "Mensaje de que falta llenar algún campo obligatorio ok");
});

QUnit.test( "Probando la validación de código repetido", function( assert ) {
	for(var i = 0; i < 10; i++){
		var codigo_aletorio_repetido = Math.floor(Math.random()*(20050199 - 20050001 + 1) + 20050001);
		$("#txtCodigo").val(codigo_aletorio_repetido);  	
	  	$("#btnGuardar").trigger("click");
	  	assert.equal($("#txtCodigo").hasClass("input-text-error"), true, "El código aletorio es repetido");
	  	assert.equal($("#lblMensaje").hasClass("color-rojo") && $("#lblMensaje").hasClass("mensaje") && $("#lblMensaje").html() == "No se pudo guardar al alumno, llene los campos obligatorios", true, "Mensaje de que falta llenar algún campo obligatorio ok");
  	}

  	var codigo_aletorio_no_repetido = Math.floor(Math.random()*(20080299 - 20050200 + 1) + 20050200);
  	$("#txtCodigo").val(codigo_aletorio_no_repetido);  	
	$("#btnGuardar").trigger("click");
	assert.equal($("#txtCodigo").hasClass("input-text-error"), false, "El código aletorio no es repetido");
	assert.equal($("#lblMensaje").hasClass("color-rojo") && $("#lblMensaje").hasClass("mensaje") && $("#lblMensaje").html() == "No se pudo guardar al alumno, llene los campos obligatorios", true, "Mensaje de que falta llenar algún campo obligatorio ok");
});

QUnit.test( "Probando que se selccione una carrera", function( assert ) {
	var no_id_carrera_seleccionada = "E";
  	$("#slcCarrera").val(no_id_carrera_seleccionada);  	
	$("#btnGuardar").trigger("click");
	assert.equal($("#txtCodigo").hasClass("input-text-error"), false, "No se ha seleccionado ninguna carrera");
	assert.equal($("#lblMensaje").hasClass("color-rojo") && $("#lblMensaje").hasClass("mensaje") && $("#lblMensaje").html() == "No se pudo guardar al alumno, llene los campos obligatorios", true, "Mensaje de que falta llenar algún campo obligatorio ok");

	for(var i = 0; i < 10; i++){
		var id_carrera_seleccionada = Math.floor(Math.random()*(4 - 1 + 1) + 1);
		$("#slcCarrera").val(id_carrera_seleccionada); 
	  	$("#btnGuardar").trigger("click");
	  	assert.equal($("#txtCodigo").hasClass("input-text-error"), false, "Carrera seleccionada ok");
	  	assert.equal($("#lblMensaje").hasClass("color-rojo") && $("#lblMensaje").hasClass("mensaje") && $("#lblMensaje").html() == "No se pudo guardar al alumno, llene los campos obligatorios", true, "Mensaje de que falta llenar algún campo obligatorio ok");
  	}
});

QUnit.test( "Llenando el apellido paterno, materno y nombres y guardar el alumno", function( assert ) {
  	var file = BASE_URL_TEST + "alumno/data/alumnos.txt";
  	
  	var rawFile = new XMLHttpRequest();
    var allText;
    
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                allText = rawFile.responseText;
            }
        }
    }
    
    rawFile.send(null);

    var filas_datos = [];
	var filas = allText.split("\n");


	for(var k = filas.length ; k > 0 ; k = k - 1){
	    var linea = filas[k-1].slice(0, -2);
	    var datos = linea.split("::");
	    filas_datos.push(datos);
	    //22::20050022::Lawrence Benjamin::Castillo::Gilbert::6\n
	}

	var numero_fila = Math.floor(Math.random()*(199 - 1 + 1) + 1);

	$("#txtApellidoPaterno").val(filas_datos[numero_fila][3]);
	$("#txtApellidoMaterno").val(filas_datos[numero_fila][4]);
	$("#txtNombres").	val(filas_datos[numero_fila][2]);

	var id_alumno = $("#lblId").html();

	$("#btnGuardar").trigger("click");

	if(id_alumno == "E"){
		assert.equal($("#txtApellidoPaterno").hasClass("input-text-error"), false, "El input[text] apellido paterno está vacío");
  		assert.equal($("#txtApellidoMaterno").hasClass("input-text-error"), false, "El input[text] apellido materno está vacío");
  		assert.equal($("#txtNombres").hasClass("input-text-error"), false, "El input[text] nombres está vacío");
  		assert.equal($("#txtCodigo").hasClass("input-text-error"), false, "El input[text] nombres está vacío");
  		assert.equal($("#slcCarrera").hasClass("input-text-error"), false, "El select de carreas está vacío");
		assert.equal($("#lblMensaje").hasClass("color-success") && $("#lblMensaje").hasClass("color-verde") && $("#lblMensaje").hasClass("mensaje") && $("#lblMensaje").html() == "Se ha añadido un nuevo alumno(a)", true, "Se ha creado un nuevo alumno");
	}else{
		assert.equal($("#txtApellidoPaterno").hasClass("input-text-error"), false, "El input[text] apellido paterno está vacío");
  		assert.equal($("#txtApellidoMaterno").hasClass("input-text-error"), false, "El input[text] apellido materno está vacío");
  		assert.equal($("#txtNombres").hasClass("input-text-error"), false, "El input[text] nombres está vacío");
  		assert.equal($("#txtCodigo").hasClass("input-text-error"), false, "El input[text] nombres está vacío");
  		assert.equal($("#slcCarrera").hasClass("input-text-error"), false, "El select de carreas está vacío");
		assert.equal($("#lblMensaje").hasClass("color-success") && $("#lblMensaje").hasClass("color-verde") && $("#lblMensaje").hasClass("mensaje") && $("#lblMensaje").html() == "Se ha editado un alumno(a)", true, "Se ha creado un nuevo alumno");
	}
});