class MyFailureApp < Devise::FailureApp
  def route(scope)
    :new_user_registration
  end
end
