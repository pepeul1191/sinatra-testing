class Url
  @base_url = 'http://localhost:4567/'
  @services = {
    'accesos' => 'http://localhost:5001/',
    'acl' => 'http://localhost:3003/',
    'statics' => @base_url,
    'test_js' => @base_url + 'test/'
  }

  def self.base_url
      @base_url
  end

  def self.service(key)
      @services[key]
  end

end
