module ApplicationHelper

	# Hopscotch helper for menutours
	# Checks the current_user meta to see if the tour has already shown for the page
	# If not, show it, but do not show it again.
	def hopscotch(name=nil)
		unless current_user.blank?
			name ||= [params[:controller], params[:action]].join '-'

			# TEMP
			# THE CODE BELOW IS COMMENTED OUT FOR TESTING.
			# IT SHOULD BE SHOWN IN PRODUCTION
			
			# unless current_user.meta["hopscotch_#{name}".to_sym].to_i == 1
				# current_user.meta["hopscotch_#{name}".to_sym] = 1
				# current_user.save

				content_for :hopscotch_js do
					javascript_include_tag "tours/#{name}"
				end
			# end
		end
	end

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

	# Progress step data
	def progress_steps
		steps = [
			{
				name: "Setup Business Profile",
				url: edit_business_url,
				info: "Fill out as much as you can on your business profile.",
				check_if: !(current_user.business.primary_color.blank?),
				required: true
			},
			{
				name: "Confirm Locations",
				url: locations_url,
				info: "You must confirm a beacon for at least 1 location.",
				check_if: current_user.locations.active.size > 0,
				required: true
			},
			{
				name: "Create Campaigns",
				url: campaigns_url,
				info: "You must create at least 1 campaign for any of your confirmed locations.",
				check_if: current_user.business.campaigns.active.size > 0,
				required: true
			},
			{
				name: "Create Greetings",
				url: greetings_url,
				info: "At least one of your locations should have a greeting assigned to it.",
				check_if: current_user.business.greetings.size > 0,
				required: true
			},
			{
				name: "Import Customers",
				url: customers_url,
				info: "This is optional, however, you may want to import customers from an existing rewards system.",
				check_if: current_user.business.customers.size > 0,
				required: false
			},
			{
				name: "Go Live!",
				url: edit_business_url,
				info: "Your store will not be visible on the ZippySpot app until it is published.",
				check_if: current_user.business.published?,
				required: true
			}
		]

		total_required_steps = 0
		total_completed_required_steps = 0
		steps.each do |st|
			if st[:required] === true
				total_required_steps += 1
				total_completed_required_steps += 1 if st[:check_if] === true
			end
		end
		percent = (100 / total_required_steps) * total_completed_required_steps

		{steps: steps, percent: percent}
	end

	# Return Y/N for boolean input
	def yesno(boolean)
		raw boolean ? 'Y' : 'N'
	end

	# Convert cents to dollar for stripe
	def cents_to_dollar(cents, number_to_currency_opts={})
		number_to_currency('%.2f' % (cents.to_i/100.0), number_to_currency_opts)
	end

	# Show a check or X (used in progress steps)
	def check_or_x(bool, items_completed=nil)
		unless items_completed.nil?
			items_completed += 1
		end
		icon = (bool) ? "fa-check" : "fa-times"
		content_tag(:i, "", class: "fa #{icon}")
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
		link_to("i", '#', class: "field-info", tabindex: "-1", data: {toggle: "tooltip", placement: "bottom"}, title: message)
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
			row: "row section-header",
			col: "col-xs-12",
			desc: ""
		})

		content_tag :div, class: opts[:row] do
		  content_tag :div, class: opts[:col] do
		  	concat(content_tag :h2, text)
		  	concat(content_tag :p, opts[:desc]) if opts[:desc]
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
			info = field_info(opts[:info]) if opts[:info]
			concat(content_tag(:div, label_tag(label), class: opts[:col1]))
			
			if block_given?
				concat(content_tag(:div, capture(&block) + info, class: opts[:col2]))
			else
				concat(content_tag(:div, raw(input_or_opts_with_block) + info, class: opts[:col2]))
			end
		end
	end

	# Styled Checkbox
	# Creates a styled checkbox
	def cbox(name, label=nil, opts={})
		opts.reverse_merge!({
			checkbox: {
				value: 		1,
				checked: 	false
			},
			label: {}
		})

		content_tag :div, class: "cbox" do
			check_box_tag(name, opts[:checkbox].delete(:value), opts[:checkbox].delete(:checked), opts[:checkbox]) + label_tag(name, raw(label), opts[:label])
		end
	end


	# Modal
	def modal(size, opts={})
		opts.reverse_merge!({
			id: "",
			classes: "",
			title: "default title"
		})

		size = (size == :large) ? "modal-lg" : "modal-sm"

		render 'shared/modal', id: opts[:id], classes: opts[:classes], size: size, title: opts[:title], body: opts[:body], footer: opts[:footer]
	end

end
