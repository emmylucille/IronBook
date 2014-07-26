json.(@cohort, :id, :start, :end)
json.students @students do |student|
  json.(student,:firstname, :lastname, :bio, :github_username, :twitter_url,
                :linkedin_url, :avatar_uid, :cohort_class, :cohort_id, :user_id)
end
