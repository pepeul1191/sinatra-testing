QUnit.module( "Ver lista de alumnos", {
	beforeEach: function() {
		this.tabla = tablaAlumno;
		this.id_tabla = "#tablaAlumno";
	}
});

QUnit.test( "URL de eliminar debe coincidir", function( assert ) {
  	assert.equal(this.tabla.url_guardar, BASE_URL + "alumno/eliminar", "URL debe ser BASE_URL+ alumno/eliminar");
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

QUnit.test( "Los eliminados al precionar el botón eliminar debe coincidir con en arreglo de eliminados de la tabla", function( assert ) {
  	var tbody = $(this.id_tabla).children().eq(1);
  	//var filas = $(this.id_tabla).children(0).children().eq(1).children().last().children().eq(3);
  	var numero_filas = tbody.children().length;
  	for(var k = numero_filas; tbody.children().length > 0; k = k - 1){
  		var btn_eliminar = tbody.children().eq(k - 1).children().last().children().last();
  		btn_eliminar.click();
  	}

  	//console.log(this.tabla.observador.arreglo_eliminados);

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

    var ids_eliminados_txt = [];
	var filas = allText.split("\n");


	for(var k = filas.length ; k > 0 ; k = k - 1){
	    var linea = filas[k-1].slice(0, -2);
	    var datos = linea.split("::");
	    ids_eliminados_txt.push(datos[0]);
	}

	//console.log(ids_eliminados_txt);
	
  	assert.deepEqual(ids_eliminados_txt, this.tabla.observador.arreglo_eliminados, "El arreglo this.tabla.observador.arreglo_eliminados es igual al generado al leer el archivo txt");
});

//console.log(tablaAlumno);