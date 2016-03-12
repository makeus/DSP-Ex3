Rails.application.routes.draw do
  root 'calculator#index'
  post 'calculator', to:'calculator#post'
  get 'plot', to:'plot#index'
  get 'plot/data', to:'plot#points'
end
