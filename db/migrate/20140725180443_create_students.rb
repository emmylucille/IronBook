class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :firstname
      t.string :lastname
      t.text :bio
      t.string :github_username
      t.string :twitter_url
      t.string :linkedin_url
      t.string :avatar_uid
      t.string :cohort_class
      t.references :cohort, index: true
      t.references :user, index: true

      t.timestamps
    end
  end
end
