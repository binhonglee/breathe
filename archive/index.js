'use strict';

function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: '1.0',
    sessionAttributes,
    response: speechletResponse,
  };
}

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: 'PlainText',
      text: output,
    },
    card: {
      type:'Simple',
      title: `SessionSpeechlet - ${title}`,
      content: `SessionSpeechlet - ${output}`,
    },
    reprompt: {
      outputSpeech: {
        type:'PlainText',
        text: repromptText,
      },
    },
    shouldEndSession,
  };
}

function addNewEvent(intent, session, callback) {
  const cardTitle = intent.name;
  const newEventItem = intent.slots.Event;
  let repromptText = '';
  events = session;
  const shouldEndSession = false;
  let speechOutput = '';

  if (newEventItem) {
    const newEvent = newEventItem.value;
    events.push(newEvent);
    speechOutput = `I have completed recording ${newEvent} as a new event.`;
    repromptText = "You can ask me to tell you all the recorded events by saying, remind me";
  } else {
    speechOutput = "I'm not sure what you are talking about. Please try again.";
    repromptText = "I'm not sure what you are talking about. You can tell me to record an event by saying, create a new moment of feeling good running 2km today"
  }

  callback(events,
    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getEvent(intent, session, callback) {
  events = session;
  var toReturnPos = Math.random(events.length);
  let toReturn;
  const repromptText = null;
  const sessionAttributes = {};
  let shouldEndSession = false;
  let speechOutput = '';

  if (events) {
    toReturn = events[toReturnPos];
  }

  if (toReturn) {
    speechOutput = `One of your recorded moments is that you were ${toReturn}.`;
    shouldEndSession = true;
  } else {
    speechOutput = "There is no moments recorded yet. You can say, create a new moment of feeling good running 2km today"
  }

  callback(sessionAttributes,
    buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function getWelcomeResponse(callback) {
  const sessionAttributes = {};
  const cardTitle = 'Welcome';
  const speechOutput = 'Welcome! ' + 'Please tell me one thing you feel good about yourself today by saying, create a new moment of feeling good running 2km today';

  const repromptText = 'Please tell me one thing you feel good about yourself today by saying, create a new moment of feeling good running 2km today';
  const shouldEndSession = false;

  callback(sessionAttributes,
    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function onSessionStarted(sessionStartedRequest, session) {
  console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

function onSessionEnded(sessionEndedRequest, session) {
  console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}

function onLaunch(LaunchRequest, session, callback) {
  console.log(`onLaunch requestId=${LaunchRequest.requestId}, sessionId=${session.sessionId}`);

  getWelcomeResponse(callback);
}

function onIntent(intentRequest, session, callback) {
  console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

  const intent = intentRequest.intent;
  const intentName = intentRequest.intent.name;

  if (intentName === 'RequestIntent') {
    getEvent(intent, session, callback);
  } else if (intentName === 'CreateEventIntent') {
    addNewEvent(intent, session, callback);
  } else if (intentName === 'CreateTherapistIntent') {

  } else if (intentName === 'CreateFriendIntent') {

  } else {
    throw new Error('Invalid intent');
  }
}

exports.handler = (event, context, callback) => {
  try {
    console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

    /**
     * Uncomment this if statement and populate with your skill's application ID to
     * prevent someone else from configuring a skill that sends requests to this function.
     */
    /*
    if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
      callback('Invalid Application ID');
    }
    */

    if (event.session.new) {
      onSessionStarted({ requestId: event.request.requestId }, event.session);
    }

    if (event.request.type === 'LaunchRequest') {
      onLaunch(event.request,
        event.session,
          (sessionAttributes, speechletResponse) => {
            callback(null, buildResponse(sessionAttributes, speechletResponse));
          });
    } else if (event.request.type === 'IntentRequest') {
      onIntent(event.request,
        event.session,
          (sessionAttributes, speechletResponse) => {
            callback(null, buildResponse(sessionAttributes, speechletResponse));
          });
    } else if (event.request.type === 'SessionEndedRequest') {
      onSessionEnded(event.request, event.session);
      callback();
    }
  } catch (err) {
    callback(err);
  }
};
