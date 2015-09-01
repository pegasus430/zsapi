module ApplicationHelper

	# Left-menu nav items
	# :ID is used for div ID and image filenames (ico/ico-:ID.ext)
	def nav_menu_items
		[
			{id: "dashboard", url: "root_url", 					label: "Dashboard"},
			{id: "business", 	url: "edit_business_url", label: "Biz Profile"},
			{id: "greeting", 	url: "greetings_url", 		label: "Greetings"},
			{id: "campaign", 	url: "campaigns_url", 		label: "Campaigns"},
			{id: "customer", 	url: "customers_url", 		label: "Customers"},
			{id: "receipt", 	url: "receipts_url", 			label: "Receipts"},
			{id: "location", 	url: "locations_url", 		label: "Locations"}
		]
	end

	# Return Y/N for boolean input
	def yesno(boolean)
		raw boolean ? 'Y' : 'N'
	end

	# An alias for the method below (when displaying notices)
	def flash_notices
		form_errors_for
	end
	
	# Displays object errors
	def form_errors_for(object=nil)
		if object.nil?
			if flash[:alert]
				type = "bg-warning"
			elsif flash[:notice]
				type = "bg-notice"
			elsif flash[:success]
				type = "bg-success"
			end
		else
			type = "bg-warning" if object.errors.any?
		end

		render('shared/form_errors', object: object, type: type) if type
	end



	## HTML HELPERS ##

	# The circle icon (usually for active/inactive)
	def active_circle(boolean)
		active = boolean ? 'active' : 'disabled'
		content_tag :span, '', class: "circle #{active}"
	end

	# Displays the (i) icon in form rows
	def field_info(message)
		content_tag :div, class: "field-info" do
			content_tag :div, class: "fi-content" do
				content_tag :p, message
			end
		end
	end

	# Wrapper
	# Creates the wrapper (:light or :dark) for page sections
	def wrapper(type="light", opts={}, &block)
		opts.reverse_merge!({
			wrapper: 		"#{type}-wrap",
			container: 	"container"
		})

		content_tag :div, class: opts[:wrapper] do
			content_tag :div, class: opts[:container] do
				capture &block
			end
		end
	end

	# Section Header
	# The headers shown above each section in a form or page
	def section_header(text, opts={})
		opts.reverse_merge!({

		})

		content_tag :div, class: opts[:row] do
		  content_tag :div, class: opts[:col] do
		  	content_tag :h2, text
		  end
		end
	end

	# Form Row
	# Creates a standard, customizable form row
	def fr(label, input_or_opts_with_block=nil, opts={}, &block)
		opts = input_or_opts_with_block if (block_given? && input_or_opts_with_block.is_a?(Hash))

		opts.reverse_merge!({
			row:  "row",
			col1: "col-xs-5 col-sm-3",
			col2: "col-xs-7 col-sm-9",
			info: nil
		})

		content_tag :div, class: opts[:row] do
			concat(content_tag(:div, label_tag(label), class: opts[:col1]))
			
			if block_given?
				concat(content_tag(:div, capture(&block), class: opts[:col2]))
			else
				concat(content_tag(:div, raw(input_or_opts_with_block), class: opts[:col2]))
			end

			concat(field_info(opts[:info])) if opts[:info]
		end
	end

	# Styled Checkbox
	# Creates a styled checkbox
	def cbox(name, label, opts={})
		opts.reverse_merge!({
			checkbox: {
				value: 		1,
				checked: 	false
			},
			label: {}
		})

		content_tag :div, class: "cbox" do
			check_box_tag(name, opts[:checkbox][:value], opts[:checkbox][:checked], opts[:checkbox]) + label_tag(name, raw(label), opts[:label])
		end
	end

end
