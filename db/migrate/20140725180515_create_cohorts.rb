class CreateCohorts < ActiveRecord::Migration
  def change
    create_table :cohorts do |t|
      t.date :start
      t.date :end

      t.timestamps
    end
  end
end
