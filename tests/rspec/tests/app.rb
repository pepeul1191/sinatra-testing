require 'httparty'

class App
     def initialize(url)
        base_url = 'http://127.0.0.1:4567/'
        @url = URI.encode(base_url + url)
        #@response = response = HTTParty.get()
     end

     def get
        @response = HTTParty.get(@url)
     end

     def post
        @response = HTTParty.post(@url)
    end

     def response
        @response
     end

     def body_to_json
        JSON.parse(@response.body)
      end
end
