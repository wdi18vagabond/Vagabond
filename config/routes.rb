Rails.application.routes.draw do
 
 resources :users, except: :destroy
 resources :sessions, except: [:new, :destroy]

 root to: "users#index"
 get "/sign_in", to: "sessions#new"
 delete "/users", to: "users#destroy", as: "delete_user"
 delete "/sessions", to: "sessions#destroy"

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
#         root GET    /                            users#index
#      sign_in GET    /sign_in(.:format)           sessions#new
#  delete_user DELETE /users(.:format)             users#destroy
#              DELETE /sessions(.:format)          sessions#destroy