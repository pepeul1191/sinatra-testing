require 'sinatra'
require 'sqlite3'
require 'json'
require_relative 'config/statics'
require_relative 'config/url'

configure do
    set :public_folder, 'public'
    set :views, 'views'
    set :server, :puma
end

helpers do
  def load_css
        rpta = ''
        if defined? @css
           @css.each do |n|
               temp = '<link href="' + Url.service('statics') + n + '.css" rel="stylesheet"/>'
               rpta = rpta + temp
           end
       end
       rpta
    end

    def load_js
        rpta = ''
        if defined? @js
           @js.each do |n|
               temp = '<script src="' + Url.service('statics') + n + '.js" type="text/javascript"></script>'
               rpta = rpta + temp
           end
       end
       rpta
    end
end

before do
    headers 'server' => 'ruby'
end

get '/' do
    erb :'home/index', { :layout => :'layouts/application' }
end

get '/carreras' do
    @css = ['bower_components/swp-plugins/assets/css/mootools.grid']
    @js = ['bower_components/swp-plugins/assets/js/mootools.dao', 'bower_components/swp-plugins/assets/js/mootools.form', 'bower_components/swp-plugins/assets/js/mootools.observer', 'bower_components/swp-plugins/assets/js/mootools.grid', 'bower_components/swp-plugins/assets/js/mootools.chain', 'assets/carrera/js/index']
    erb :'carrera/index', { :layout => :'layouts/application' }
end

get '/carrera/listar' do
    db = SQLite3::Database.open 'db/db_test.db'
    db.results_as_hash = true
    stm = db.prepare "SELECT id, nombre FROM carreras"
    rs = stm.execute
    rpta = Array.new
    rs.each do |row|
        temp = { :id => row['id'], :nombre => row['nombre'] }
        rpta.push(temp)
    end
    rpta.to_json
end

post '/carrera/guardar' do
     data = params[:data]
     array_json_tabla = JSON.parse(data)

     nuevos = array_json_tabla["nuevos"]
     editados = array_json_tabla["editados"]
     eliminados = array_json_tabla["eliminados"]

     begin
         if !nuevos.empty?
             array_nuevos = Array.new
             for i in 0..nuevos.length - 1
                 temp_id = nuevos[i]['id']
                 nombre = nuevos[i]['nombre'].gsub(" ", "%20") #esto es para reemplazar los espacios en blanco porque httparty arroja error
                 db = SQLite3::Database.open 'db/db_test.db'
                 db.results_as_hash = true
                 stm = db.prepare "INSERT INTO carreras (nombre) VALUES (?)"
                 stm.bind_param 1, nombre
                 stm.execute
                 id_generado = db.last_insert_row_id()
                 nuevo = {:temporal => temp_id, :nuevo_id => id_generado}
                 array_nuevos.push(nuevo)
             end
         end
         if !editados.empty?
             for i in 0..editados.length - 1
                 id = editados[i]['id']
                 nombre = editados[i]['nombre'].gsub(" ", "%20") #esto es para reemplazar los espacios en blanco porque httparty arroja error
                 db = SQLite3::Database.open 'db/db_test.db'
                 stm = db.prepare "UPDATE carreras SET nombre = ? WHERE id = ?"
                 stm.bind_param 1, nombre
                 stm.bind_param 2, id
                 stm.execute
             end
         end
         if !eliminados.empty?
             for i in 0..eliminados.length - 1
                 id = eliminados[i]
                 db = SQLite3::Database.open 'db/db_test.db'
                 stm = db.prepare "DELETE FROM carreras WHERE id = ?"
                 stm.bind_param 1, id
                 stm.execute
             end
         end
         rpta = { :tipo_mensaje => "success", :mensaje => ["Se ha registrado los cambios en las carreras", array_nuevos] }.to_json
     rescue StandardError => e #ZeroDivisionError
         rpta = { :tipo_mensaje => "error", :mensaje => ["Se ha producido un error en guardar la tabla de carreras", e] }.to_json
     end
end

get '/alumnos' do
    @css = ['bower_components/swp-plugins/assets/css/mootools.grid']
    @js = ['bower_components/swp-plugins/assets/js/mootools.dao', 'bower_components/swp-plugins/assets/js/mootools.form', 'bower_components/swp-plugins/assets/js/mootools.observer', 'bower_components/swp-plugins/assets/js/mootools.grid', 'bower_components/swp-plugins/assets/js/mootools.chain', 'assets/alumno/js/index']
    erb :'alumno/index', { :layout => :'layouts/application' }
end

get '/alumno/listar' do
    db = SQLite3::Database.open 'db/db_test.db'
    db.results_as_hash = true
    stm = db.prepare "SELECT A.id, A.codigo, A.nombres, A.apellido_paterno, A.apellido_materno, C.nombre AS carrera FROM alumnos A INNER JOIN carreras C ON A.carrera_id = C.id"
    rs = stm.execute
    rpta = Array.new
    rs.each do |row|
        temp = { :id => row['id'], :codigo => row['codigo'], :nombres => row['nombres'], :apellido_paterno => row['apellido_paterno'], :apellido_materno => row['apellido_materno'], :carrera => row['carrera']}
        rpta.push(temp)
    end
    rpta.to_json
end

post '/alumno/eliminar'do
        data = params[:data]
        array_json_tabla = JSON.parse(data)

        nuevos = array_json_tabla["nuevos"]
        editados = array_json_tabla["editados"]
        eliminados = array_json_tabla["eliminados"]

        begin
            if !eliminados.empty?
                for i in 0..eliminados.length - 1
                    id = eliminados[i]
                    db = SQLite3::Database.open 'db/db_test.db'
                    stm = db.prepare "DELETE FROM alumnos WHERE id = ?"
                    stm.bind_param 1, id
                    stm.execute
                end
            end
            rpta = { :tipo_mensaje => "success", :mensaje => ["Se ha registrado los cambios en los alumnos"] }.to_json
        rescue StandardError => e #ZeroDivisionError
            rpta = { :tipo_mensaje => "error", :mensaje => ["Se ha producido un error en guardar la tabla de alumnos", e] }.to_json
        end

        rpta
  end

  get '/alumno/ver/:id' do
      id = params['id']
      db = SQLite3::Database.open 'db/db_test.db'
      db.results_as_hash = true
      stm = db.prepare "SELECT id, codigo, nombres, apellido_paterno, apellido_materno, carrera_id FROM alumnos WHERE id = ?"
      stm.bind_param 1, id
      rs = stm.execute
      alumno = nil
      rs.each do |row|
          alumno = { :id => row['id'], :codigo => row['codigo'], :nombres => row['nombres'], :apellido_paterno => row['apellido_paterno'], :apellido_materno => row['apellido_materno'], :carrera_id => row['carrera_id']}
      end

      db = SQLite3::Database.open 'db/db_test.db'
      db.results_as_hash = true
      stm = db.prepare "SELECT id, nombre FROM carreras"
      rs = stm.execute
      carreras = Array.new
      rs.each do |row|
          carrera = { :id => row['id'], :nombre => row['nombre']}
          carreras.push(carrera)
      end

      @titulo = 'Ver Alumno'
      @alumno = alumno
      @carreras = carreras
      @css = ['assets/alumno/css/alumno']
      @diasbled = true
      erb :'alumno/alumno', { :layout => :'layouts/application' }
  end

  get '/alumno/agregar' do
      db = SQLite3::Database.open 'db/db_test.db'
      db.results_as_hash = true
      stm = db.prepare "SELECT id, nombre FROM carreras"
      rs = stm.execute
      carreras = Array.new
      rs.each do |row|
          carrera = { :id => row['id'], :nombre => row['nombre']}
          carreras.push(carrera)
      end

      @titulo = 'Crear Alumno'
      @carreras = carreras
      @css = ['assets/alumno/css/alumno']
      @diasbled = false
      @js = ['assets/alumno/js/alumno']
      erb :'alumno/alumno', { :layout => :'layouts/application' }
  end

post '/alumno/existe_codigo' do
    codigo = params[:data]
    begin
        db = SQLite3::Database.open 'db/db_test.db'
        db.results_as_hash = true
        stm = db.prepare "SELECT (CASE WHEN (COUNT(*) > 0) THEN 'true' ELSE 'false' END) AS existe FROM alumnos WHERE codigo = " + codigo.to_s
        #stm.bind_param 1, codigo
        rs = stm.execute
        rs.each do |row; temp|
            existe =  row['existe']
            if existe == "true"
        		    temp = true
                return { :tipo_mensaje => "success", :mensaje => temp }.to_json
            else
                 temp = false
                 return { :tipo_mensaje => "success", :mensaje => temp }.to_json
        		end
        end
    rescue SQLite3::Exception => e
        return { :tipo_mensaje => "error", :mensaje => ["Se ha producido un error al verificar si el código se encuentra repetido", e] }.to_json
    ensure
        stm.close if stm
        db.close if db
    end
end

post '/alumno/guardar' do
    alumno = JSON.parse(params[:alumno])
    begin
        if alumno['id'] == 'E'
            db = SQLite3::Database.open 'db/db_test.db'
            stm = db.prepare "INSERT INTO alumnos (codigo, nombres, apellido_paterno, apellido_materno, carrera_id) VALUES (?,?,?,?,?)"
            stm.bind_param 1, alumno['codigo']
            stm.bind_param 2, alumno['nombres']
            stm.bind_param 3, alumno['apellido_paterno']
            stm.bind_param 4, alumno['apellido_materno']
            stm.bind_param 5, alumno['carrera_id']
            stm.execute
            id_generado = db.last_insert_row_id()
            return { :tipo_mensaje => "success", :mensaje => ["Se ha añadido un nuevo alumno(a)", id_generado] }.to_json
        else
            db = SQLite3::Database.open 'db/db_test.db'
            stm = db.prepare "UPDATE alumnos SET codigo = ?, nombres = ?, apellido_paterno = ?, apellido_materno = ?, carrera_id = ? WHERE id = ?"
            stm.bind_param 1, alumno['codigo']
            stm.bind_param 2, alumno['nombres']
            stm.bind_param 3, alumno['apellido_paterno']
            stm.bind_param 4, alumno['apellido_materno']
            stm.bind_param 5, alumno['carrera_id']
            stm.bind_param 6, alumno['id']
            stm.execute
            return { :tipo_mensaje => "success", :mensaje => ["Se ha editado un alumno(a)"] }.to_json
        end
    rescue SQLite3::Exception => e
        return { :tipo_mensaje => "error", :mensaje => ["Se ha producido un error al guardar al alumno(a)", e] }.to_json
    ensure
        stm.close if stm
        db.close if db
    end
end

get '/alumno/editar/:id' do
    id = params['id']
    db = SQLite3::Database.open 'db/db_test.db'
    db.results_as_hash = true
    stm = db.prepare "SELECT id, codigo, nombres, apellido_paterno, apellido_materno, carrera_id FROM alumnos WHERE id = ?"
    stm.bind_param 1, id
    rs = stm.execute
    alumno = nil
    rs.each do |row|
        alumno = { :id => row['id'], :codigo => row['codigo'], :nombres => row['nombres'], :apellido_paterno => row['apellido_paterno'], :apellido_materno => row['apellido_materno'], :carrera_id => row['carrera_id']}
    end

    db = SQLite3::Database.open 'db/db_test.db'
    db.results_as_hash = true
    stm = db.prepare "SELECT id, nombre FROM carreras"
    rs = stm.execute
    carreras = Array.new
    rs.each do |row|
        carrera = { :id => row['id'], :nombre => row['nombre']}
        carreras.push(carrera)
    end

    @titulo = 'Editar Alumno'
    @alumno = alumno
    @carreras = carreras
    @css = ['assets/alumno/css/alumno']
    @diasbled = false
    @js = ['assets/alumno/js/alumno']
    erb :'alumno/alumno', { :layout => :'layouts/application' }
end
