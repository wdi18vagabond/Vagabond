Rails.application.routes.draw do
 resources :users, except: :destroy
 resources :sessions, except: [:new, :destroy]
 resources :stories
 resources :cities

 root to: "users#index"
 get "/sign_in", to: "sessions#new"
 delete "/users", to: "users#destroy", as: "delete_user"
 delete "/sessions", to: "sessions#destroy", as: "sign_out"

end

#       Prefix Verb   URI Pattern                  Controller#Action
#        users GET    /users(.:format)             users#index
#              POST   /users(.:format)             users#create
#     new_user GET    /users/new(.:format)         users#new
#    edit_user GET    /users/:id/edit(.:format)    users#edit
#         user GET    /users/:id(.:format)         users#show
#              PATCH  /users/:id(.:format)         users#update
#              PUT    /users/:id(.:format)         users#update
#     sessions GET    /sessions(.:format)          sessions#index
#              POST   /sessions(.:format)          sessions#create
# edit_session GET    /sessions/:id/edit(.:format) sessions#edit
#      session GET    /sessions/:id(.:format)      sessions#show
#              PATCH  /sessions/:id(.:format)      sessions#update
#              PUT    /sessions/:id(.:format)      sessions#update
#      stories GET    /stories(.:format)           stories#index
#              POST   /stories(.:format)           stories#create
#    new_story GET    /stories/new(.:format)       stories#new
#   edit_story GET    /stories/:id/edit(.:format)  stories#edit
#        story GET    /stories/:id(.:format)       stories#show
#              PATCH  /stories/:id(.:format)       stories#update
#              PUT    /stories/:id(.:format)       stories#update
#              DELETE /stories/:id(.:format)       stories#destroy
#       cities GET    /cities(.:format)            cities#index
#              POST   /cities(.:format)            cities#create
#     new_city GET    /cities/new(.:format)        cities#new
#    edit_city GET    /cities/:id/edit(.:format)   cities#edit
#         city GET    /cities/:id(.:format)        cities#show
#              PATCH  /cities/:id(.:format)        cities#update
#              PUT    /cities/:id(.:format)        cities#update
#              DELETE /cities/:id(.:format)        cities#destroy
#         root GET    /                            users#index
#      sign_in GET    /sign_in(.:format)           sessions#new
#  delete_user DELETE /users(.:format)             users#destroy
#     sign_out DELETE /sessions(.:format)          sessions#destroy
