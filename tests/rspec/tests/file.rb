file = File.new("data/alumnos.txt", "r")

arreglo = Array.new

while (line = file.gets)
	line_array = line.split('::')

   id = line_array[0]
   codigo = line_array[1]
   nombres = line_array[2]
   apellido_paterno = line_array[3]
   apellido_materno = line_array[4]
   carrera_id = line_array[5].strip

   url_str = 'alumno/guardar?alumno={"id":"E","apellido_paterno":"%s","apellido_materno":"%s","nombres":"%s","codigo":"%s","carrera_id":"%s"}' % [apellido_paterno, apellido_materno, nombres, codigo, carrera_id]

   arreglo.push(url_str)
end

#puts arreglo

file = File.new("data/alumnos.txt", "r")

codigos_eliminar = ''

while (line = file.gets)
    line_array = line.split('::')

	id = line_array[0].strip

   codigos_eliminar =  codigos_eliminar + '"' + id.to_s + '",'
end

codigos_eliminar = codigos_eliminar[0...codigos_eliminar.length - 1]

puts codigos_eliminar