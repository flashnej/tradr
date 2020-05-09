class Trade < ApplicationRecord
  validates :user_id, presence: true
  validates :symbol, presence: true
  validates :buy_price, presence: true
  validates :quantity, presence: true
  validates :sell_price, presence: true

  belongs_to :user
end
