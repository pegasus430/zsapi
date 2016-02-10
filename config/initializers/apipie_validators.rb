class FileValidator < Apipie::Validator::BaseValidator

  def initialize(param_description, argument)
    super(param_description)
    @type = argument
  end

  def validate(value)
    return false if value.nil?
    value.is_a?(Rack::Test::UploadedFile) || value.is_a?(ActionDispatch::Http::UploadedFile)
  end

  def self.build(param_description, argument, options, block)
    if argument == File
      self.new(param_description, argument)
    end
  end

  def description
    "Must be #{@type}."
  end
end