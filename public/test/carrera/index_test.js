QUnit.module( "Ver lista de carreras", {
	beforeEach: function() {
		this.tabla = tablaCarrera;
		this.id_tabla = "#tablaCarrera";
	}
});

QUnit.test( "La tabla debe tener 1 operación por fila", function( assert ) {
  	assert.equal(this.tabla.array_json_btn_td.length, 1, "Las operaciones son 1 : eliminar");
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

  	var file = BASE_URL_TEST + "carrera/data/carreras.txt";
  	
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

QUnit.test( "El botón debe 'Agregar Registro' debe tener la operación que haga aumentar una fila al final de la tabla", function( assert ) {
	var tfoot = $(this.id_tabla).children().eq(2);
	var operacion = tfoot.children().eq(0).children().eq(0).children().eq(0).attr("operacion");

	assert.equal(operacion, "AgregarFila", "Las operaciones son 1 : eliminar");
});

QUnit.test( "El botón debe 'Agregar Registro' debe aumentar una fila al final de la tabla x8", function( assert ) {
	var tbody = $(this.id_tabla).children().eq(1);
	var filas_inicial = tbody.children().length;
	var tfoot = $(this.id_tabla).children().eq(2);
	var boton_agregar_registro = tfoot.children().eq(0).children().eq(0).children().eq(0);
	
	for(var i = 0; i < 8; i++){
		boton_agregar_registro.trigger("click");
	}

	var filas_final = tbody.children().length;

	assert.equal(filas_inicial, filas_final - 8, "Deben de haberse agregado 8 filas");
});

QUnit.test( "URL de guardar debe coincidir", function( assert ) {
  	assert.equal(this.tabla.url_guardar, BASE_URL + "carrera/guardar", "URL debe ser BASE_URL+ carrera/guardar");
});

QUnit.test( "Llenar los campos generados anterioremente y guardarlos", function( assert ) {
	var tbody = $(this.id_tabla).children().eq(1);
	var filas_inicial = tbody.children().length;
	var tfoot = $(this.id_tabla).children().eq(2);
	var boton_guardar_cambios = tfoot.children().eq(0).children().eq(0).children().eq(1);
	
	var file = BASE_URL_TEST + "carrera/data/carreras_crear.txt";
  	
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
	    
	    var tbody = $(this.id_tabla).children().eq(1);
	    var tr = tbody.children().eq(k - 1).children().eq(1);
	    var input_text = tr.children().eq(0);
	    console.log(input_text);
	    input_text.val(datos[1]);
	}

	//boton_guardar_cambios.trigger("click");

	assert.equal(0, 0, "Deben de haberse agregado 8 filas");
});