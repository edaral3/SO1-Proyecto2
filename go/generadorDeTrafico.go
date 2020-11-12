package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

type AutoGenerated struct {
	Caso []CasoJ `json:"Caso"`
}

type CasoJ struct {
	Name         string `json:"name"`
	Location     string `json:"location"`
	Age          int    `json:"age"`
	Infectedtype string `json:"infectedtype"`
	State        string `json:"state"`
}

var clienteHttp = &http.Client{}

func peticion(caso CasoJ) {
	println("Go rutna en ejecucion")
	usuarioComoJson, err := json.Marshal(caso)
	if err != nil {
		// Maneja el error de acuerdo a tu situación
		log.Fatalf("Error creando petición: %v", err)
	}
	url := "http://localhost:4000/prueba"
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
	var cantidadCasos int
	var cantidadGorutinas int

	var URL string
	var ruta string

	println("1- Ingrese el URL del balanceador de carga a donde se desea enviar informacion.")
	fmt.Scanf("%s", &URL)

	println("2- Ingrese la cantidad de gorutinas a ejecutar.")
	fmt.Scanf("%d", &cantidadGorutinas)
	fmt.Scanf("%d", &cantidadGorutinas)

	println("3- Ingrese la cantidad de solicitudes que tiene el archivo.")
	fmt.Scanf("%d", &cantidadCasos)
	fmt.Scanf("%d", &cantidadCasos)

	println("4- Ingrese la ruta del archivo que se desea cargar.")
	fmt.Scanf("%s", &ruta)
	fmt.Scanf("%s", &ruta)

	jsonFile, err := os.Open(ruta)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened users.json")
	defer jsonFile.Close()
	byteValue, _ := ioutil.ReadAll(jsonFile)
	var data AutoGenerated
	json.Unmarshal(byteValue, &data)

	for i := 0; i < cantidadCasos; i++ {
		go peticion(data.Caso[i])
		time.Sleep(500 * time.Millisecond)
	}
}
