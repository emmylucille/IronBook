require 'open-uri'

class API::V1::GitReposController < API::V1::BaseController
  def show
    @repositories = git_repositories(params[:username])
    render json: @repositories
  end

  private

  def git_repositories(git_username)
    open("https://api.github.com/users/#{git_username}/repos") do |user|
      user.each_line do |user_json|
        @parsed_hash = JSON.parse user_json
      end
    end
    parse_repositories(@parsed_hash)
  end

  def parse_repositories(repo_hash)
    repo_owner = repo_hash.first["owner"]
    github_username = repo_owner["login"]
    github_avatar = repo_owner["avatar_url"]
    repositories = { Username: "#{github_username}", Avatar: "#{github_avatar}" }
    count = 0
    repo_hash.each do |repo|
      repo_name = repo["name"]
      repo_url = repo["html_url"]
      repositories.merge!("Repository#{count}" => "#{repo_name}",
                          "href#{count}" => "#{repo_url}")
      count += 1
    end
    repositories
  end
end
