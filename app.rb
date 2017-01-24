require 'sinatra'
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
               temp = '<link href="' + Statics.url + n + '.css" rel="stylesheet"/>'
               rpta = rpta + temp
           end
       end
       rpta
    end

    def load_js
        rpta = ''
        if defined? @js
           @js.each do |n|
               temp = '<script src="' + Statics.url + n + '.js" type="text/javascript"></script>'
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
    erb :index, { :layout => :'layouts/blank' }
end
