Rails.application.routes.draw do
  root 'calculator#index'
  post 'calculator', to:'calculator#post'
end
