package main

import (
	"net/http"

	"github.com/PaulQuinonez/go-gorm-res-api/db"
	"github.com/PaulQuinonez/go-gorm-res-api/models"
	"github.com/PaulQuinonez/go-gorm-res-api/routes" //MODULO
	"github.com/gorilla/mux"
)

func main() {

	db.DBConnection() //CONEXION A DB

	db.DB.AutoMigrate(models.Task{})
	db.DB.AutoMigrate(models.User{})

	r := mux.NewRouter()

	r.HandleFunc("/", routes.HomeHandler)

	//TODO USER ROUTES
	r.HandleFunc("/users", routes.GetUsersHandler).Methods("GET")
	r.HandleFunc("/users/{id}", routes.GetUserHandler).Methods("GET")
	r.HandleFunc("/users", routes.PostUsersHandler).Methods("POST")
	r.HandleFunc("/users/{id}", routes.DeleteUsersHandler).Methods("DELETE")

	//TODO TASKS ROUTES
	r.HandleFunc("/tasks", routes.GetTasksHandler).Methods("GET")
	r.HandleFunc("/tasks/{id}", routes.GetTaskHandler).Methods("GET")
	r.HandleFunc("/tasks", routes.PostTasksHandler).Methods("POST")
	r.HandleFunc("/tasks/{id}", routes.DeleteTasksHandler).Methods("DELETE")

	http.ListenAndServe(":3000", r)
}
