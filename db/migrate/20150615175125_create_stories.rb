class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :title
      t.text :body
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
