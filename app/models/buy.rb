class Buy < ApplicationRecord
  validates :user_id, presence: true
  validates :symbol, presence: true
  validates :buy_price, presence: true
  validates :quantity, presence: true

  belongs_to :user
end
