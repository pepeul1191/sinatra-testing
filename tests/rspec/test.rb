require './app'

temp = nil

RSpec.describe Test do
    describe "1. CRUD - Crear test" do

        =begin
        it "+ conexión BASE_URL/test OK" do
            test = Test.new('listar')
            temp = test.body_to_json.length
            expect(test.response.code).to eq(200)
        end
        it "+ lista BASE_URL/test/listar" do
            test = Test.new('listar')
            expect(test.body_to_json.length).to be > 0
        end
        it '+ envía por AJAX data={"id":"E","nombre":"Pepe","edad":26} a BASE_URL/test/guardar y devulve "' do #tipo_mensaje":"success", "mensaje" : ["Se ha registrado los cambios en los componentes", #id_nuevo]}
            test = Test.new('guardar/?data={"id":"E","nombre":"Pepe","edad":26}')
            expect(test.response.body).not_to include('Excepción capturada')
            expect(test.response.body).to include('{"tipo_mensaje":"success","mensaje":["Se ha agregado un nuevo test"')
        end
        it '+ el listado debe tener uno más' do
            test = Test.new('listar')
            expect(test.body_to_json.length).to eq(temp + 1)
        end
        =end
    end
end
