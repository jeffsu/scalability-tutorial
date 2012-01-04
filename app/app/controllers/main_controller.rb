class MainController < ApplicationController
  REDIS = Redis.new

  def signin
    if request.post?
      user = User.where(:email => params[:email]).first

      if user
        session[:user_id] = user.id
        redirect_to '/'
      end
    end
  end

  def index
    if logged_in?
      @todo = Todo.new
      render :index2
    end
  end

  def signout
    session[:user_id] = nil
    redirect_to '/'
  end

  def health
    render :text => 'healthy'
  end
end
