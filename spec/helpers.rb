module TestHelpers
  
  # Runs generic validates_presence_of tests for models
  def validate_presence( object, attributes=[] )
    attributes.each do |attr|
      it "must have a #{attr}" do
        object.send("#{attr}=", nil)
        expect(object).not_to be_valid
      end
    end
  end

end