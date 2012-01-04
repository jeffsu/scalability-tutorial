class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :auth
  helper_method :logged_in?
  helper_method :username
  

  def logged_in?
    defined?(@user)
  end

  def username
    logged_in? ? @user.name : ""
  end

  private
  
  def auth
    if session[:user_id]
      @user = User.find(session[:user_id]) if session[:user_id]
    end
  end
end
