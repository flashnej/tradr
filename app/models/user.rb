class User < ApplicationRecord
  validates :user_name, presence: true, uniqueness: true
  validates :balance, presence: true

  has_many :follows
  has_many :trades
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
