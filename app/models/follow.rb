class Follow < ApplicationRecord
  validates :user_id, presence: true
  validates :symbol, presence: true

  belongs_to :user

  validates_uniqueness_of :symbol, scope: :user_id
end
