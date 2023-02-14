FROM node:15-alpine
COPY . /publisher-agent
RUN cd publisher-agent && npm install
CMD cd publisher-agent && node src/DataReceiver.js