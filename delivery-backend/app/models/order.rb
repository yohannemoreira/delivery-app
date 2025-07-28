# == Schema Information
#
# Table name: orders
#
#  id                            :integer          not null, primary key
#  user_id                       :string
#  pickup_address_street         :string
#  pickup_address_number         :string
#  pickup_address_complement     :string
#  pickup_address_neighborhood   :string
#  pickup_address_city           :string
#  pickup_address_state          :string
#  pickup_address_zip            :string
#  pickup_address_country        :string
#  delivery_address_street       :string
#  delivery_address_number       :string
#  delivery_address_complement   :string
#  delivery_address_neighborhood :string
#  delivery_address_city         :string
#  delivery_address_state        :string
#  delivery_address_zip          :string
#  delivery_address_country      :string
#  description                   :string
#  estimated_value               :decimal(, )
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#

class Order < ApplicationRecord
end
