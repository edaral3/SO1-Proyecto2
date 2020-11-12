FROM python:3

WORKDIR /usr/src/app

COPY . .

RUN pip install flask

RUN pip install pymongo

RUN pip install redis

EXPOSE 6000

CMD [ "python", "server.py" ]