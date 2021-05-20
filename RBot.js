var TelegramBot = require('node-telegram-bot-api');
var admin = require('firebase-admin');
var serviceAccount = require('./key.json'); //keep your key file from firebase
 


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

 


var token = "1695526803:AAHJ9vaw0V35YV0gIS73N2Q8BxND3btnqAg";

 

var bot = new TelegramBot(token, {polling: true});

var db = admin.firestore();


bot.on('message', function(msg){


if(msg.text=="history"){


db.collection('Remember bot').where('chat.id','==', msg.chat.id).get().then(function(docs){
docs.forEach(function(doc){
    console.log(doc.data().name)
        bot.sendMessage(msg.chat.id, doc.data().text)
});
})


}
else{
db.collection('Remember bot').add(msg).then(function(){
    bot.sendMessage(msg.chat.id, "Data inserted success")
});
}
})