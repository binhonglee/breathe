'use strict';

var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

// Handler for all input
var handlers = {
  // LaunchRequest handler
  'LaunchRequest': function() {
    // Providing users with example of how this is to be used
    const say = 'Welcome! ' + 'Please tell me one thing you feel good about yourself today by saying, create a new moment of, and then stating your moment';
    const repromptText = 'Please tell me one thing you feel good about yourself today by saying, create a new moment of, and then stating your moment';
    // Emit the message
    this.emit(':ask', say, repromptText);
  },

  // CreateEventIntent handler
  'CreateEventIntent': function() {
    // Get the user input
    var newEventItem = this.event.request.intent.slots.Event;
    // Initialize the speechOutput
    let speechOutput = '';

    // If the item exist
    if (newEventItem && newEventItem.value) {
      const newEvent = newEventItem.value;

      // If the array does not exist already, create one
      if (!this.attributes['events']) {
        this.attributes['events'] = [];
      }

      // Add the new message to the array
      this.attributes['events'].push(newEvent);
      console.log(newEvent);

      // Inform the user that the message is successfully recorded
      speechOutput = 'I have completed recording ' + newEvent + ' as a new event.' + 'You can ask me to tell you all the recorded events by saying, remind me';
    } else {
      // Inform the user of an error
      speechOutput = "I am not sure what you are talking about. Please try again.";
    }

    // Emit the message
    this.emit(':ask', speechOutput);
  },

  // RequestIntent handler
  'RequestIntent': function() {
    // Initialize the speechOutput
    let speechOutput = '';

    // If the array exist
    if (this.attributes['events']) {
      // Get a random number range according to the array size
      var toReturnPos = Math.floor(Math.random() * this.attributes['events'].length);
      // Get the message in the randomed index
      let toReturn = this.attributes['events'][toReturnPos];
      // Tell the user of a random message previously recorded
      speechOutput = 'One of your recorded moments is that you were ' + toReturn;
    } else {
      // Inform the user of missing message
      speechOutput = 'There is no moments recorded yet. You can say, create a new moment of feeling good running 2km today';
    }

    // Emit the message
    this.emit(':ask', speechOutput);
  },

  // StopIntent handler
  'StopIntent': function () {
    // Tell user "Goodbye"
    this.emit(':tell', 'Goodbye');
  }
}
