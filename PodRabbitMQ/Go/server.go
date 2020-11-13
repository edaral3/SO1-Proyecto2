package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/streadway/amqp"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func indexRoute(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Api funcionando")
}

func insertData(w http.ResponseWriter, r *http.Request) {
	// Obtención objeto json convertido a string
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Insert valid data")
	}
	bodyString := string(reqBody)

	// Creación conexión a cola de RabbitMQ
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	failOnError(err, "Fallo al conectar con el servidor de RabbitMQ")
	defer conn.Close()

	// Apertura del canal
	ch, err := conn.Channel()
	failOnError(err, "Fallo al abrir el canal")
	defer conn.Close()

	// Declaración de la cola
	q, err := ch.QueueDeclare(
		"sopes1",
		false,
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "Fallo al crear cola")

	// Escritura en cola del objeto json en string
	err = ch.Publish(
		"",
		q.Name,
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(bodyString),
		},
	)
	failOnError(err, "Fallo al enviar el mensaje")
	log.Printf("Enviado: %s", bodyString)
}

func main() {
	log.Printf("Server inicializado")
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", indexRoute)
	router.HandleFunc("/insertarCaso", insertData).Methods("POST")
	log.Fatal(http.ListenAndServe(":3000", router))
}
