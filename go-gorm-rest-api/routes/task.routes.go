package routes

import (
	"encoding/json"
	"net/http"

	"github.com/PaulQuinonez/go-gorm-res-api/db"
	"github.com/PaulQuinonez/go-gorm-res-api/models"
	"github.com/gorilla/mux"
)

func GetTasksHandler(w http.ResponseWriter, r *http.Request) {

	var task []models.Task
	db.DB.Find(&task)

	json.NewEncoder(w).Encode(&task)
}
func GetTaskHandler(w http.ResponseWriter, r *http.Request) {

	var task models.Task
	params := mux.Vars(r)
	db.DB.First(&task, params["id"])

	if task.ID == 0 {
		w.WriteHeader(http.StatusNotFound) //404
		w.Write([]byte("No se encontró la tarea"))
		return
	}

	json.NewEncoder(w).Encode(&task)

}
func PostTasksHandler(w http.ResponseWriter, r *http.Request) {

	var task models.Task
	json.NewDecoder(r.Body).Decode(&task)

	createTask := db.DB.Create(&task)
	err := createTask.Error
	if err != nil {
		w.WriteHeader(http.StatusBadRequest) //400
		w.Write([]byte(err.Error()))
		return
	}

	json.NewEncoder(w).Encode(&task)
}
func DeleteTasksHandler(w http.ResponseWriter, r *http.Request) {
	var task models.Task
	params := mux.Vars(r)
	db.DB.First(&task, params["id"]) //LO BUSCA

	if task.ID == 0 {
		w.WriteHeader(http.StatusNotFound) //404
		w.Write([]byte("No se encontró la tarea"))
		return
	}

	// db.DB.Delete(&task) //TODO NO LO ELIMINA DE LA TABLA, PERO SI CONSULTAMOS NO APARECERA
	db.DB.Unscoped().Delete(&task) //TODO LO ELIMINA DE LA TABLA COMPLETAMENTE

	w.WriteHeader(http.StatusNoContent) //204
}
