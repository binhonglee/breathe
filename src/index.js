'use strict';

var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
  'LaunchRequest': function() {
    const say = 'Welcome! ' + 'Please tell me one thing you feel good about yourself today by saying, create a new moment of, and then stating your moment';
    const repromptText = 'Please tell me one thing you feel good about yourself today by saying, create a new moment of, and then stating your moment';
    this.emit(':ask', say, repromptText);
  },

  'CreateEventIntent': function() {
    var newEventItem = this.event.request.intent.slots.Event;
    let speechOutput = '';
    let repromptText = '';

    if (newEventItem) {
      const newEvent = newEventItem.value;

      if (!this.attributes['events']) {
        this.attributes['events'] = [];
      }

      this.attributes['events'].push(newEvent);
      console.log(newEvent);

      speechOutput = 'I have completed recording ' + newEvent + ' as a new event.';
      repromptText = 'You can ask me to tell you all the recorded events by saying, remind me';
    } else {
      speechOutput = "I am not sure what you are talking about. Please try again.";
      repromptText = "I am not sure what you are talking about. You can tell me to record an event by saying, create a new moment of feeling good running 2km today";
    }

    this.emit(':ask', speechOutput, repromptText);
  },

  'RequestIntent': function() {
    let speechOutput = '';

    if (this.attributes['events']) {
      var toReturnPos = Math.floor(Math.random() * this.attributes['events'].length);
      let toReturn = this.attributes['events'][toReturnPos];
      speechOutput = 'One of your recorded moments is that you were ' + toReturn;
    } else {
      speechOutput = 'There is no moments recorded yet. You can say, create a new moment of feeling good running 2km today';
    }

    this.emit(':ask', speechOutput);
  },

  'StopIntent': function () {
      var say = '';

      say = 'Goodbye';

      this.emit(':tell', say );
  }
}
