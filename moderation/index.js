const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const eventHandler = async (type, data) => {
  if (type === 'CommentCreated') {
    // Validation - if it contains 'orange'
    data.status = data.content.includes('orange') ? 'rejected' : 'approved';

    // Send event
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data
    })
  }
}

app.post('/events', async (req, res) => {

  let {type, data} = req.body;

  await eventHandler(type, data);

  res.send({});
});

app.listen(4003, async () => {

  const response = await axios.get('http://event-bus-srv:4005/events').catch(err => console.log(err));

  for (let index = 0; index < response.data.events.length; index++) {
    const event = response.data.events[index];
    
    const {type, data} = event;
    console.log("Event Received", type);

    await eventHandler(type, data);
  }

  console.log('Listening on 4003');
});
