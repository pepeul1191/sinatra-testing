$(document).on("click", "#btnGuardar",function() {
	  var paterno_valido = validarTextLleno($("#txtApellidoPaterno"), "Ingrese su apellido paterno");
	  var materno_valido = validarTextLleno($("#txtApellidoMaterno"), "Ingrese su apellido materno");
	  var nombres_valido = validarTextLleno($("#txtNombres"), "Ingrese su(s) nombre(s)");
    var codigo_no_repetido = validarRepetido($("#txtCodigo"), "El código ingresado ya se encuentra registrado", BASE_URL + "alumno/existe_codigo", "Ha ocurrido un error en validar el código");
    var carrera_seleccionada = validarSelect($("#slcCarrera"), "Debe selccionar una carrera");

  	if (paterno_valido && materno_valido && nombres_valido && codigo_no_repetido && carrera_seleccionada){
    		var alumno = new Object();
				alumno.id = $("#lblId").html();
    		alumno.apellido_paterno = $("#txtApellidoPaterno").val();
    		alumno.apellido_materno = $("#txtApellidoMaterno").val();
    		alumno.nombres = $("#txtNombres").val();
    		alumno.codigo = $("#txtCodigo").val();
    		alumno.carrera_id = $("#slcCarrera").val();

    		$.ajax({
      			type: "POST",
      			url: BASE_URL + "alumno/guardar",
      			data: "alumno=" + JSON.stringify(alumno),
      			async: false,
      			success:function(data){
        				var rpta = JSON.parse(data);
        				console.log(rpta);
        				if (rpta["tipo_mensaje"] == "error"){
        					  $("#lblMensaje").html("Ha ocurrido un error al alumno");
        					  $("#lblMensaje").addClass("color-rojo");
        				}else{
									if (rpta['tipo_mensaje'] == 'success'){
										 $("#lblMensaje").html(rpta['mensaje'][0]);
										 $("#lblMensaje").removeClass("color-rojo");
										 $("#lblMensaje").addClass("color-success");
										 if (typeof rpta['mensaje'][1] !== "undefined"){
													$("#lblId").html(rpta['mensaje'][1]);
										 }
									}else{
										 $("#lblMensaje").html(rpta['mensaje'][0]);
										 $("#lblMensaje").removeClass("color-success");
										 $("#lblMensaje").addClass("color-rojo");
									}
        				}
      			}
    		});

    		$("#lblMensaje").removeClass("color-rojo");
    		$("#lblMensaje").addClass("color-verde");
  	}else{
  		  $("#lblMensaje").html("No se pudo guardar al alumno, llene los campos obligatorios");
  		  $("#lblMensaje").addClass("color-rojo");
  		  $("html, body").animate({ scrollTop: 0 }, "slow");
  	 }
});

function validarCorreo(input) {
	var email = input.val();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var rpta = false;

    if (re.test(email)){
		input.removeClass("input-text-error");
		rpta = true;
	}else{
		input.addClass("input-text-error");
		input.val("");
		input.attr("placeholder", "Ingrese un dirección de correo válida");
	}

    return rpta;
}

function validarRepetido(input, mensaje, ruta_url, mensaje_error) {
	var rpta = true;

	$.ajax({
  		type: "POST",
  		url: ruta_url,
  		data: "data=" + JSON.stringify(input.val()),
  		async: false,
  		success:function(data){
    			var data = JSON.parse(data);
					console.log(data);
    			if (data["tipo_mensaje"] == "error"){
      				$("#lblMensaje").html(mensaje_error);
      				$("#lblMensaje").addClass("color-rojo");
    			}else{
							console.log(data["mensaje"]);
      				if (data["mensaje"]){
        					input.addClass("input-text-error");
        					input.val("");
        					input.attr("placeholder", mensaje);
        					rpta = false;
      				}else{
      					  input.removeClass("input-text-error");
      				}
    			}
  		}
	});

    return rpta;
}

function validarTextLleno(input, mensaje){
	var texto = input.val();
	var rpta = false;

	if (texto== ""){
		input.addClass("input-text-error");
		input.val("");
		input.attr("placeholder", mensaje);
	}else{
		input.removeClass("input-text-error");
		rpta = true;
	}

	return rpta;
}

function validarSelect(select, mensaje){
	var valor = select.val();
	var rpta = false;

	if (valor == "E"){
		select.addClass("input-text-error");
		select.attr("placeholder", mensaje);
	}else{
		select.removeClass("input-text-error");
		rpta = true;
	}

	return rpta;
}
