module DatePickable
	extend ActiveSupport::Concern
	
	class_methods do

		# Since the datepicker sends dates in the format "m/d/Y",
		# this method will make it easy for us to format it across models
		def datepicker(attributes=[])
			if attributes.is_a? Array
				attributes.each do |a|

					# attribute=ASSIGN => Convert from MM/DD/YYYY to YYYY-MM-DD
					define_method("#{a}=") do |string_date|
						unless string_date.blank?
							parsed_date = case string_date
							when String then Date.strptime(string_date, "%m/%d/%Y")
							when Date then string_date
							end

				    	super parsed_date
				    else
				    	super string_date
				    end
			    end

			    # attribute => MM/DD/YYYY
					define_method("#{a}") do
						self[a.to_sym].strftime("%m/%d/%Y") rescue ""
					end
			    
			  end
			end
		end
		
	end
end