var validaciones;

var Alumno = new Class({
    initialize: function(){
        var alumno = new Object();
        alumno.id = $("#lblId").html();
        alumno.apellido_paterno = $("#txtApellidoPaterno").val();
        alumno.apellido_materno = $("#txtApellidoMaterno").val();
        alumno.nombres = $("#txtNombres").val();
        alumno.codigo = $("#txtCodigo").val();
        alumno.carrera_id = $("#slcCarrera").val();

        this.alumno = alumno;
    },
    Guardar(validaciones){
     if(_.contains(validaciones, false)){
        $("#lblMensaje").html("No se pudo guardar al alumno, llene los campos obligatorios");
        $("#lblMensaje").addClass("color-rojo");
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }else{
          $.ajax({
                type: "POST",
                url: BASE_URL + "alumno/guardar",
                data: "alumno=" + JSON.stringify(this.alumno),
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
          }
      }
});

$(document).on("click", "#btnGuardar",function() {
    var paterno_valido = new Validacion("#txtApellidoPaterno", "Ingrese su apellido paterno"); paterno_valido.ValidarTextLleno();
    var materno_valido = new Validacion("#txtApellidoMaterno", "Ingrese su apellido materno"); materno_valido.ValidarTextLleno();
    var nombres_valido = new Validacion("#txtNombres", "Ingrese su(s) nombre(s)"); nombres_valido.ValidarTextLleno();
    var codigo_no_repetido = new Validacion("#txtCodigo", "El código ingresado ya se encuentra registrado"); codigo_no_repetido.ValidarRepetido(BASE_URL + "alumno/existe_codigo", "Ha ocurrido un error en validar el código");
    var carrera_seleccionada = new Validacion("#slcCarrera", "Debe selccionar una carrera"); carrera_seleccionada.ValidarSelect();

    validaciones = [paterno_valido.rpta, materno_valido.rpta, nombres_valido.rpta, codigo_no_repetido.rpta, carrera_seleccionada.rpta];
   
   var alumno = new Alumno(); alumno.Guardar(validaciones); 
});