import * as Alexa from "alexa-sdk";

let handlers: Alexa.Handlers = {
    "RequestIntent": function(){
        let self: Alexa.Handler = this;
        let speechOutput = "rundown or specific area";
        self.emit(":tellWithCard", speechOutput, "intro", speechOutput);
    }
    
}

export class Handler {
    constructor(event: Alexa.RequestBody, context:Alexa.context, callback:Function) {
        let alexa = Alexa.Handler(event, context);
        alexa.appId = "breathe";
        alexa.registerHandlers(handlers);
        alexa.execute();
    }
}


