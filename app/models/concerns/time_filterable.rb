module TimeFilterable
	extend ActiveSupport::Concern

	included do	
		scope :today, -> {
			where("created_at > ?", Time.now.beginning_of_day)
		}

		scope :yesterday, -> {
			where("created_at < ? and created_at > ?", 1.day.ago.end_of_day, 1.day.ago.beginning_of_day)
		}

		scope :on_date, -> (date_entry) {
			where("created_at < ? and created_at > ?", date_entry.end_of_day, date_entry.beginning_of_day)
		}

		scope :in_this_month, -> {
			where("created_at > ?", Time.now.beginning_of_month)
		}

		scope :in_last_month, -> {
			where("created_at < ? and created_at > ?", 1.month.ago.end_of_month, 1.month.ago.beginning_of_month)
		}

		scope :in_this_year, -> {
			where("created_at > ?", Time.now.beginning_of_year)
		}
	end


end