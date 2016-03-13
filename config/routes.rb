Rails.application.routes.draw do
  root 'calculator#index'
  post 'calculator', to:'calculator#post'
  get 'plot', to:'plot#index'
  get 'plot/data', to:'plot#points'

  Rails.application.routes.draw do
    mount Konacha::Engine, at: "/test" if defined?(Konacha)
  end
end
