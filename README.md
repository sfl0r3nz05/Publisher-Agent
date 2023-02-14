# Publisher Agent

The publisher agent is responsible for organizing the positioning data (raw data) received from a [SDG](https://github.com/sfl0r3nz05/CSV-Data-Sender) for a given identifier (e.g., tag) and sending it to the edge via AMQP.

## Project status

- The project is under development: 🛠 by [sfl0r3nz05](sfigueroa@ceit.es)

## Architecture


## Requirements

In order to establish a connection with the rest of the components, they will have to be in the same docker network as the publisher. The requirements are to have docker installed and a network called `syntheticnet` created on it, to install docker you can follow [this](https://docs.docker.com/engine/install/) guide, and to create a docker network run the following command:

```bash
docker network create syntheticnet
```

## How to use

1. Set the environment variables of the `docker-compose.yml` file depending on the messaging technology:

    ```bash
    AMQP_QUEUE_HOST=rmq0
    ```

    ```bash
    MQTT_QUEUE_HOST=mosquitto
    ```

2. Comment on the DataSender library depending on the messaging technology:

    ```bash
    nano ~/publisher_agent/src/DataReceiver.js
    ```

    - If use MQTT to comment:

    ```bash
    import { connect, sendMessage } from './DataSenderAMQP.js'
    ```

    - If use AMQP to comment:

    ```bash
    import { connect, sendMessage } from './DataSenderMQTT.js'
    ```

3. To launch the program using docker simply place your terminal in the project folder and run the following command:

    ```bash
    docker-compose up
    ```

## Test the publisher agent for amqp

For test purpose adding the next service to `docker-compose.yml` file.

```bash
rmq0:
  hostname: rmq0
  image:  'rabbitmq:3.6.7-management'
  ports:
    - 5672:5672
    - 15672:15672
  cap_add:
    - ALL
```

## Test the publisher agent for mqtt

For test purpose adding the next service to `docker-compose.yml` file.

```bash
mosquitto:
  image: eclipse-mosquitto:1.6.14
  hostname: mosquitto
  expose:
    - "1883"
    - "9001"
  ports:
    - "1883:1883"
    - "9001:9001"
  volumes:
    - ./test/mosquitto.conf:/mosquitto/config/mosquitto.conf
```

## To Do

- Add a selector using environmental variables to select between different protocols
- Add trivy vulnerability scanner to github workflow
- Build a container as part of the github workflow
- Push the container to Docker Hub registry
