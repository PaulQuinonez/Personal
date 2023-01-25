package routes

import (
	"encoding/json"
	"net/http"

	"github.com/PaulQuinonez/go-gorm-res-api/db"
	"github.com/PaulQuinonez/go-gorm-res-api/models"
	"github.com/gorilla/mux"
)

func GetUsersHandler(w http.ResponseWriter, r *http.Request) {

	var users []models.User
	db.DB.Find(&users)

	json.NewEncoder(w).Encode(&users)
}
func GetUserHandler(w http.ResponseWriter, r *http.Request) {

	var user models.User
	params := mux.Vars(r)
	db.DB.First(&user, params["id"])

	if user.ID == 0 {
		w.WriteHeader(http.StatusNotFound) //404
		w.Write([]byte("No se encontró el usuario"))
		return
	}

	db.DB.Model(&user).Association("Tasks").Find(&user.Tasks)

	json.NewEncoder(w).Encode(&user)

}
func PostUsersHandler(w http.ResponseWriter, r *http.Request) {

	var user models.User
	json.NewDecoder(r.Body).Decode(&user)

	createUser := db.DB.Create(&user)
	err := createUser.Error
	if err != nil {
		w.WriteHeader(http.StatusBadRequest) //400
		w.Write([]byte(err.Error()))
		return
	}

	json.NewEncoder(w).Encode((&user))
}
func DeleteUsersHandler(w http.ResponseWriter, r *http.Request) {
	var user models.User
	params := mux.Vars(r)
	db.DB.First(&user, params["id"]) //LO BUSCA

	if user.ID == 0 {
		w.WriteHeader(http.StatusNotFound) //404
		w.Write([]byte("No se encontró el usuario"))
		return
	}

	db.DB.Delete(&user) //TODO NO LO ELIMINA DE LA TABLA, PERO SI CONSULTAMOS NO APARECERA
	// db.DB.Unscoped().Delete(&user) //TODO LO ELIMINA DE LA TABLA COMPLETAMENTE

	w.WriteHeader(http.StatusNoContent) //204
}
