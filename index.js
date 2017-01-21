const content = require("aws-lambda-mock-context");
var expect = require("chai").expect;
var index = require("../src/index");

const context = context();

describe("Testing my Request Intent", function(){
    var speechResponse = null; 
    var speechError = null; 
    
    before(function(done){
        index.Handler({}, context);
        context.Promise
            .then(response => {speechResponse = response, console.log(speechResponse); done();})
            .catch (error => {speechError = error; done();})
    });
});
