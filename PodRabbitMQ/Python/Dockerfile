FROM python:3

WORKDIR /usr/src/app

COPY . .

RUN pip install pymongo

RUN pip install redis

RUN pip install pika

CMD [ "python", "server.py" ]
