module DatePickable
	extend ActiveSupport::Concern
	
	class_methods do

		# Since the datepicker sends dates in the format "m/d/Y",
		# this method will make it easy for us to format it across models
		def datepicker(attributes=[])
			if attributes.is_a? Array
				attributes.each do |a|
					define_method("#{a}=") do |string_date|
			    	self[a] = Date.strptime(string_date, "%m/%d/%Y") unless string_date.blank?
			    end
			  end
			end
		end
		
	end
end