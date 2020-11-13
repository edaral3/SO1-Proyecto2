FROM golang:latest 

RUN mkdir /app

ADD . /app

WORKDIR /app

RUN go get github.com/streadway/amqp

RUN go get -u github.com/gorilla/mux

RUN go build -o main .

EXPOSE 7000

CMD ["/app/main"]