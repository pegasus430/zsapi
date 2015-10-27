module DatePickable
	extend ActiveSupport::Concern
	
	class_methods do

		# Since the datepicker sends dates in the format "m/d/Y",
		# this method will make it easy for us to format it across models
		def datepicker(attributes=[])
			if attributes.is_a? Array
				attributes.each do |a|
					define_method("#{a}=") do |string_date|
						parsed_date = case string_date
						when String then Date.strptime(string_date, "%m/%d/%Y")
						when Date then string_date
						end

			    	super parsed_date unless string_date.blank?
			    end
			  end
			end
		end
		
	end
end