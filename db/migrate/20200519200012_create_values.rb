class CreateValues < ActiveRecord::Migration[5.2]
  def change
    create_table :values do |t|
      t.belongs_to :user, null: false
      t.float :value, null: false

      t.timestamps
    end
  end
end
