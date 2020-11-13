FROM golang:1.14.3-alpine AS build

RUN apk add --no-cache git

WORKDIR /src

COPY . .

RUN go get github.com/streadway/amqp

RUN go get -u github.com/gorilla/mux

EXPOSE 3000

RUN go run main.go