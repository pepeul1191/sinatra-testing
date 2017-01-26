# encoding: utf-8

require_relative 'app'

def crear
    temp = nil
    RSpec.describe App do
        describe "1. CRUD - Crear Alumno : " do
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
                test =App.new('alumno/existe_codigo?data=20051193')
                test.post
                expect(test.response.body).not_to include('{"tipo_mensaje":"success","mensaje":true')
                expect(test.response.body).to include('{"tipo_mensaje":"success","mensaje":false')
            end
            it 'guardar alumno "' do #tipo_mensaje":"success", "mensaje" : ["Se ha registrado los cambios en los componentes", #id_nuevo]}
                test = App.new('alumno/guardar?alumno={"id":"E","apellido_paterno":"Valdivia","apellido_materno":"Caballero","nombres":"José Jesús","codigo":"20051193","carrera_id":"1"}')
                test.post
                expect(test.response.body).not_to include('Excepción capturada')
                expect(test.response.body).to include('{"tipo_mensaje":"success","mensaje":["Se ha añadido un nuevo alumno(a)')
            end
            it 'el listado debe tener uno más' do
                test = App.new('alumno/listar')
                test.get
                expect(test.body_to_json.length).to eq(temp + 1)
            end
        end
    end
end

crear
