class Meal < ApplicationRecord
    has_many :components, dependent: :destroy
end
