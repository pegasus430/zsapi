module ApplicationHelper
	def yesno(boolean)
		raw boolean ? 'Y' : 'N'
	end

	def active_circle(boolean)
		active = boolean ? 'active' : 'disabled'
		content_tag :span, '', class: "circle #{active}"
	end

	def form_errors_for(object)
		render 'shared/form_errors', object: object
	end

	def field_info(message)
		content_tag :div, class: "field-info" do
			content_tag :div, class: "fi-content" do
				content_tag :p, message
			end
		end
	end



	# HTML HELPERS

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
