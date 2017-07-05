// dependencies

var restify = require('restify');

var builder = require('botbuilder');

var request = require('request'); // npm install

// Setup Restify Server

var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {

   console.log('%s listening to %s', server.name, server.url); 

});

// Create chat connector for communicating with the Bot Framework Service

var connector = new builder.ChatConnector({

    appId: process.env.MICROSOFT_APP_ID,

    appPassword: process.env.MICROSOFT_APP_PASSWORD

});

// create the bot

var bot = new builder.UniversalBot(connector);

// Listen for messages from users 

server.post('/botB', connector.listen());

//entry point for branches and receving an image

var bot = new builder.UniversalBot(connector, function(session){

    var msg = session.message;
    if(msg.attachments && msg.attachments.length >0){
        var attachment = msg.attachments[0];
        session.send({
            text: "here is your image",
            attachments: [{
                contentType: attachment.contentType,
                contentUrl : attachment.contentUrl,
                name : attachment.name

            }]
        });
    } else {
        
    // Echo back user's text
    var msg = "choose A B C or D";
    session.endDialog(msg);
    }
});

bot.dialog('A', [

    function (session) {
        builder.Prompts.text(session, "do you want to see a robot?")
    },

    function (session, results) {
        var msg = new builder.Message(session)
        .text("here is one: ")
        .attachments([{
            contentType: "image/jpeg",
            contentUrl: "data:image/jpeg;base64,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"
        }]);

        session.endDialog(msg)
    }

]).triggerAction({

    matches: /^a$/i

});

bot.dialog('B', [

    function (session) {
        builder.Prompts.text(session, "Enter a pokedex number")
    },

    function (session, results) {
        getData(results.response, function(msg){
            parsed = JSON.parse(msg)
            session.endDialog(String(parsed.forms[0]['name']))
        });

    }

]).triggerAction({

    matches: /^b$/i

});

function getData(data, cb){
    request('http://pokeapi.co/api/v2/pokemon/' + data, function(error, response, body){
        cb(body);
    })
}

bot.dialog('C', [

    function (session) {

        builder.Prompts.text(session, "Enter text")

    },

    function (session, results) {
        postData(results.response, function(msg){
            session.send(msg);
        });
    }

]).triggerAction({

    matches: /^c$/i

});

function postData(data, cb){
    request.post({
        url: 'https://requestb.in/1hbquhv1',
        body: data
    }, function(error, response, body){
        cb(body)
    });
}

var cardNames = ["hero card", "animation card"]

bot.dialog('D', [

    function (session) {
        builder.Prompts.choice(session, "what card?", cardNames, {
            maxRetries: 3,
            retryPrompt: "you entered something wrong"
        });
    },

    function (session, results) {
        var selectedCardName = results.response.entity;
        var card = createCard(selectedCardName, session)
        var msg = new builder.Message(session).addAttachment(card)
        session.send(msg)
    }

]).triggerAction({

    matches: /^d$/i

});

function createCard(selectedCardName, session){
    switch(selectedCardName){
        case "hero card":
        return createHeroCard(session)
        case "animation card":
        return createAnimationCard(session)
    }
}

function createHeroCard(session){
    return new builder.HeroCard(session)
    .title('This is a hero card')
    .subtitle('bots are cool')
    .text('text body content')
    .images([
        builder.CardImage.create(session, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS__T083aQoYWobj_e4vZ8g3BxiGbZpkVGe8BNiqehScu8RvqXO')
    ])
    .buttons([
        builder.CardAction.openUrl(session, 'https://www.google.com', 'click me')
    ])
}

function createAnimationCard(session){
    return new builder.AnimationCard(session)
    .title('Puppy GIF of the day')
    .subtitle('Daily Puppy')
    .media([
        builder.CardMedia.create(session, 'https://68.media.tumblr.com/d0e1c39e2924731d016b2a4236a3d519/tumblr_nvrm5vqjuA1qbxi45o1_400.gif')
    ])
}