QUnit.module( "Ver lista de alumnos", {
	beforeEach: function() {
		this.tabla = tablaAlumno;
		this.id_tabla = "#tablaAlumno";
	}
});

QUnit.test( "URL de eliminar debe coincidir", function( assert ) {
  	assert.equal(this.tabla.url_guardar, BASE_URL + "alumno/eliminar", "URL debe ser BASE_URL+ alumno/eliminar");
  	console.log(this.tabla);
  	console.log(this.tabla.array_json_btn_td.length);
});

QUnit.test( "La tabla debe tener 3 operaciones por fila", function( assert ) {
  	assert.equal(this.tabla.array_json_btn_td.length, 3, "Las operaciones son 3 : ver, editar y eliminar");
});

QUnit.test( "La tabla debe redireccionar a una nueva vista para agrear un alumno", function( assert ) {
  	assert.equal(this.tabla.url_nuevo, BASE_URL + "alumno/agregar", "URL debe ser BASE_URL+ alumno/agregar");
  	
	$.ajax({
	    type: "GET",
	    url: BASE_URL + "alumno/agregar",
	    data: '',
	    success: function(data,status,xhr){

	    },
	    error: function(xhr, status, error){
	       	
	    },
	    complete: function(xhr){
	    	var status = xhr.status;
	    	assert.equal(status, 200, "Vista redireccionada por BASE_URL+ alumno/eliminar existe");
	    }
	});
});

QUnit.test( "La tabla debe redireccionar a una nueva vista para ver un alumno", function( assert ) {
  	var btn_ver = $(this.id_tabla).children(0).children().eq(1).children().last().children().eq(0);
  	
  	btn_ver.on( "click", function() {
   	 	assert.ok( 1 == "1", "Click articio" );
   	 	$.ajax({
		    type: "GET",
		    url: BASE_URL + "alumno/ver/1",
		    data: '',
		    success: function(data,status,xhr){

		    },
		    error: function(xhr, status, error){
		       	
		    },
		    complete: function(xhr){
		    	var status = xhr.status;
		    	assert.equal(status, 200, "Vista redireccionada para ver un nuevo alumno que existe");
		    }
		});
   	 	return false;
  	});

  	btn_ver.click();
});

QUnit.test( "La tabla debe redireccionar a una nueva vista para editar un alumno", function( assert ) {
  	var btn_editar = $(this.id_tabla).children(0).children().eq(1).children().last().children().eq(1);
  	
  	
  	btn_editar.on( "click", function() {
   	 	assert.ok( 1 == "1", "Click articio" );
   	 	$.ajax({
		    type: "GET",
		    url: BASE_URL + "alumno/editar/1",
		    data: '',
		    success: function(data,status,xhr){

		    },
		    error: function(xhr, status, error){
		       	
		    },
		    complete: function(xhr){
		    	var status = xhr.status;
		    	assert.equal(status, 200, "Vista redireccionada para editar un nuevo alumno que existe");
		    }
		});
   	 	return false;
  	});

  	btn_editar.click();
});
