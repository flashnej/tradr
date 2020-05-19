class Value < ApplicationRecord
  validates :user_id, presence: true
  validates :value, presence: true

  belongs_to :user
end
