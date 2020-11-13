# Step 1 select default OS image
FROM alpine

# # Step 2 tell what you want to do

RUN apk add --no-cache python3-dev
RUN apk add py3-pip

# # Step 3 Configure a software
# # Defining working directory
WORKDIR /app

# # Copy everything which is present in my docker directory to working (/app)
COPY . .

RUN pip3 install pymongo
RUN pip3 install redis
RUN pip3 install pika


# Step 4 set default commands
# These are permanent commands i.e even if user will provide come commands those will be considered as argunemts of this command
ENTRYPOINT [ "python3" ]

# These commands will be replaced if user provides any command by himself
CMD ["server.py"]
