class Follow < ApplicationRecord
  validates :user_id, presence: true
  validates :symbol, presence: true, uniqueness: true
  
  belongs_to :user
end
