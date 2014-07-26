Rails.application.routes.draw do

  get "git_repos/:username" => "git_repos#show", as: "git_repo", defaults: { format: :json }

  root 'home#index'
end
