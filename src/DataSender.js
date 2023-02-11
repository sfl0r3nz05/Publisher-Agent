import amqp from 'amqplib';
const AMQP_QUEUE_HOST = process.env.AMQP_QUEUE_HOST;

export async function connect() {
    try {
    let conn = await amqp.connect(`amqp://${AMQP_QUEUE_HOST}`, "heartbeat=60")
    let ch = await conn.createChannel()
    return ch
    } catch (error) {
        return null
    }
}

export function sendMessage(channel, topic, msg) {
    var exchange = 'tag_tracking';
    var key = 'tracking.tags.'+topic;
    var queue = 'tracking_queue';

    channel.assertExchange(exchange, 'topic', {
        durable: false
    });
    channel.assertQueue(queue, {
        durable: true
      });
      channel.bindQueue(queue, exchange, 'tracking.tags.*');
      
  channel.publish(exchange, key, Buffer.from(JSON.stringify(msg)));
    console.log(" [x] Sent %s:'%s'", key, msg);
}