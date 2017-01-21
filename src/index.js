"use strict";
var Alexa = require("alexa-sdk");
var handlers = {
    "RequestIntent": function () {
        var self = this;
        var speechOutput = "rundown or specific area";
        self.emit(":tellWithCard", speechOutput, "intro", speechOutput);
    },
    
};
var Handler = (function () {
    function Handler(event, context, callback) {
        var alexa = Alexa.Handler(event, context);
        alexa.appId = "breathe";
        alexa.registerHandlers(handlers);
        alexa.execute();
    }
    return Handler;
}());
exports.Handler = Handler;
//# sourceMappingURL=index.js.map
