json.cohorts @cohorts do |cohort|
  json.(cohort, :id, :start, :end)
end
