Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    namespace :v1, path: "" do
      resources :cohorts, except: [:new, :edit]
      resources :students, except: [:new, :edit]
      get "git_repos/:username" => "git_repos#show"
    end
  end

  devise_for :users

  root 'home#index'
end
