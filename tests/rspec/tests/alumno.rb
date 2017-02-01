# encoding: utf-8

require_relative 'app'

def crear
    file = File.new("data/alumnos.txt", "r")

    arreglo = Array.new
    codigos = Array.new

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
       codigos.push(codigo)
    end

    temp = nil
    k = 0
    RSpec.describe App do
        describe "1. CRUD - Crear Alumno : " do
            arreglo.each do |url|
                test = App.new(url)
                it "mostrar lista HTML" do
                    test =App.new('alumnos')
                    test.get
                    expect(test.response.code).to eq(200)
                end
                it "listar alumnos" do
                    test =App.new('alumno/listar')
                    test.get
                    temp = test.body_to_json.length
                    expect(test.response.code).to eq(200)
                end
                it "mostrar formulario nuevo" do
                    test =App.new('alumno/agregar')
                    test.get
                    expect(test.response.code).to eq(200)
                end
                it "poblar combo carreras" do
                    test =App.new('carrera/listar')
                    test.get
                    expect(test.response.code).to eq(200)
                end
                it "validar codigo repetido" do

                    url_str = 'alumno/existe_codigo?data=%s' % [codigos[k]]
                    #puts codigos[k]
                    k = k +1 
                    test =App.new(url_str)
                    test.post
                    expect(test.response.body).not_to include('{"tipo_mensaje":"success","mensaje":true')
                    expect(test.response.body).to include('{"tipo_mensaje":"success","mensaje":false')
                end
                it 'guardar alumno "' do
                    test = App.new(url)
                    test.post
                    expect(test.response.body).not_to include('Excepción capturada')
                    expect(test.response.body).to include('{"tipo_mensaje":"success","mensaje":["Se ha añadido un nuevo alumno(a)')
                end
            end
        end
    end

    RSpec.describe App do
       it 'el listado debe tener 2' do
           test = App.new('alumno/listar')
           test.get
           expect(test.body_to_json.length).to eq(200)
        end
    end
end

def editar
    file = File.new("data/alumnos_editar.txt", "r")

    arreglo = Array.new
    codigos = Array.new
    ids = Array.new

    while (line = file.gets)
        line_array = line.split('::')

       id = line_array[0]
       codigo = line_array[1]
       nombres = line_array[2]
       apellido_paterno = line_array[3]
       apellido_materno = line_array[4]
       carrera_id = line_array[5].strip

       url_str = 'alumno/guardar?alumno={"id":"%s","apellido_paterno":"%s","apellido_materno":"%s","nombres":"%s","codigo":"%s","carrera_id":"%s"}' % [ id, apellido_paterno, apellido_materno, nombres, codigo, carrera_id]

       arreglo.push(url_str)
       codigos.push(codigo)
       ids.push(id)
    end

    temp = nil
    k = 0

    temp = 200
    RSpec.describe App do
        describe "1. CRUD - Editar Alumno : " do
            arreglo.each do |url|
                it "mostrar lista HTML" do
                    test =App.new('alumnos')
                    test.get
                    expect(test.response.code).to eq(200)
                end
                it "listar alumnos" do
                    test =App.new('alumno/listar')
                    test.get
                    temp = test.body_to_json.length
                    expect(test.response.code).to eq(200)
                end
                it "mostrar formulario editado" do
                    test =App.new('alumno/editar/' + ids[k])
                    test.get
                    expect(test.response.code).to eq(200)
                end
                it "poblar combo carreras" do
                    test =App.new('carrera/listar')
                    test.get
                    expect(test.response.code).to eq(200)
                end
                it "validar codigo repetido" do
                    test =App.new('alumno/existe_codigo?data=' + codigos[k])
                    k = k + 1
                    test.post
                    expect(test.response.body).not_to include('{"tipo_mensaje":"success","mensaje":true')
                    expect(test.response.body).to include('{"tipo_mensaje":"success","mensaje":false')
                end
                it 'guardar alumno "' do #tipo_mensaje":"success", "mensaje" : ["Se ha registrado los cambios en los componentes", #id_nuevo]}
                    test = App.new(url)
                    test.post
                    expect(test.response.body).not_to include('Excepción capturada')
                    expect(test.response.body).to include('{"tipo_mensaje":"success","mensaje":["Se ha editado un alumno(a)')
                end
                it 'el listado debe tener la misma cantidad' do
                    test = App.new('alumno/listar')
                    test.get
                    expect(test.body_to_json.length).to eq(temp)
                end
            end
        end
    end
end

def ver
    file = File.new("data/alumnos.txt", "r")
    ids = Array.new

    while (line = file.gets)
        line_array = line.split('::')
        id = line_array[0].strip
       
       ids.push(id)
    end

    temp = nil
    RSpec.describe App do
        describe "1. CRUD - Ver Alumno : " do
            ids.each do |id|
                it "mostrar lista HTML" do
                    test =App.new('alumnos')
                    test.get
                    expect(test.response.code).to eq(200)
                end
                it "listar alumnos" do
                    test =App.new('alumno/listar')
                    test.get
                    temp = test.body_to_json.length
                    expect(test.response.code).to eq(200)
                end
                it "mostrar formulario ver" do
                    #puts id
                    test =App.new('alumno/ver/' + id.to_s)
                    test.get
                    expect(test.response.code).to eq(200)
                end
                it "poblar combo carreras" do
                    test =App.new('carrera/listar')
                    test.get
                    expect(test.response.code).to eq(200)
                end
            end
        end
    end
end

def eliminar
    file = File.new("data/alumnos.txt", "r")

    codigos_eliminar = ''

    while (line = file.gets)
        line_array = line.split('::')

       id = line_array[0].strip

       codigos_eliminar =  codigos_eliminar + '"' + id.to_s + '",'
    end

    codigos_eliminar = codigos_eliminar[0...codigos_eliminar.length - 1]
    #puts codigos_eliminar
    temp = nil
    RSpec.describe App do
        describe "1. CRUD - Ver Alumno : " do
            it "mostrar lista HTML" do
                test =App.new('alumnos')
                test.get
                expect(test.response.code).to eq(200)
            end
            it "eliminar alumnos" do
                test = App.new('alumno/eliminar?data={"nuevos":[],"editados":[],"eliminados":[' + codigos_eliminar + ']}')
                test.post
                expect(test.response.body).not_to include('Excepción capturada')
                expect(test.response.body).to include('{"tipo_mensaje":"success","mensaje":["Se ha registrado los cambios en los alumnos')
            end
        end
    end
end

crear
#editar
#ver
#eliminar