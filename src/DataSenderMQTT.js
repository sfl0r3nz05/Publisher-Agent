import mqtt from 'mqtt';
const MQTT_QUEUE_HOST = process.env.MQTT_QUEUE_HOST;
const MQTT_TOPIC = process.env.TOPIC;

export async function connect() {
    try {
    const connectUrl = `mqtt://${MQTT_QUEUE_HOST}`
    const client = mqtt.connect(connectUrl)
    return client
    } catch (error) {
        return null
    }
}

export function sendMessage(channel, topic, msg) {
    var key = MQTT_TOPIC    //var key = 'tracking.tags.'+topic;
      
  channel.publish(key, Buffer.from(JSON.stringify(msg)));
    console.log(" [x] Sent %s:'%s'", key, msg);
}