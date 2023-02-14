import mqtt from 'paho-mqtt';
const MQTT_QUEUE_HOST = process.env.MQTT_QUEUE_HOST;
const MQTT_QUEUE_PORT = process.env.MQTT_QUEUE_PORT;

export async function connect() {
    try {
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
    const connectUrl = `mqtt://${MQTT_QUEUE_HOST}:${MQTT_QUEUE_PORT}`
    const client = await mqtt.connect(connectUrl, {clientId,clean: true,connectTimeout: 4000,reconnectPeriod: 1000,})
    return client
    } catch (error) {
        return null
    }
}

export function sendMessage(channel, topic, msg) {
    var key = 'tracking.tags.'+topic;
      
  channel.publish(key, Buffer.from(JSON.stringify(msg)));
    console.log(" [x] Sent %s:'%s'", key, msg);
}