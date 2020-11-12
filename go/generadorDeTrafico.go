package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type Caso struct {
	name         string `json:name`
	location     string
	age          int
	infectedtype string
	state        string
}

func peticion(caso Caso) {
	clienteHttp := &http.Client{}
	url := "https://httpbin.org/post"
	usuarioComoJson, err := json.Marshal(caso)
	peticion, err := http.NewRequest("POST", url, bytes.NewBuffer(usuarioComoJson))
	if err != nil {
		// Maneja el error de acuerdo a tu situación
		log.Fatalf("Error creando petición: %v", err)
	}
	peticion.Header.Add("Content-Type", "application/json")
	respuesta, err := clienteHttp.Do(peticion)
	if err != nil {
		// Maneja el error de acuerdo a tu situación
		log.Fatalf("Error haciendo petición: %v", err)
	}

	// No olvides cerrar el cuerpo al terminar
	defer respuesta.Body.Close()
	//
}

func main() {

	/*var cantidadGorutinas int
	var cantidadCasos int

	var URL string*/
	var ruta string
	/*
		println("1- Ingrese el URL del balanceador de carga a donde se desea enviar informacion.");
		fmt.Scanf("%s", &URL)

		println("2- Ingrese la cantidad de gorutinas a ejecutar.");
		fmt.Scanf("%d", &cantidadGorutinas)

		println("3- Ingrese la cantidad de solicitudes que tiene el archivo.");
		fmt.Scanf("%d", &cantidadCasos)

	*/
	//go saludar(nombres)
	println("4- Ingrese la ruta del archivo que se desea cargar.")
	// http

	ruta = "casos.json"

	file, _ := ioutil.ReadFile(ruta)

	var data []Caso
	json.Unmarshal([]byte(file), &data)

	for i := 0; i < len(data); i++ {
		fmt.Println("User Type: " + data[i].name)
	}
}
