QUnit.module( "Ver Alumno", {
	beforeEach: function() {
	}
});

QUnit.test( "Campos del formulario desabilitados", function( assert ) {
	assert.equal($("#txtApellidoPaterno").attr("disabled"), "disabled", "El input[text] apellido paterno está desabilitado");
  	assert.equal($("#txtApellidoMaterno").attr("disabled"), "disabled", "El input[text] apellido materno está desabilitado");
  	assert.equal($("#txtNombres").attr("disabled"), "disabled", "El input[text] nombres está desabilitado");
  	assert.equal($("#txtCodigo").attr("disabled"), "disabled", "El input[text] nombres está desabilitado");
  	assert.equal($("#slcCarrera").attr("disabled"), "disabled", "El select de carreas está desabilitado");
});