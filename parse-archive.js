const fs = require('fs');
const data = require('./tweets.json');

var tweets = [];

const exclude = [
  "1592471685252644864",
  "1592471053699551233",
  "1592179278002917378",
  "1592176704641957888",
  "1592471237657505793",
  "1592471159689580544",
  "1592471105771827200",
  "1592177093106102272"
];

for (let t = 0; t < data.length; t++) {
  const tweet = data[t].tweet;

  if(!exclude.includes(tweet.id)) {
   
    tweets.push({
      "id": tweet.id,
      "created_at": tweet.created_at,
      "full_text": tweet.full_text,
      "urls": tweet.entities?.urls || null,
      "in_reply_to_status_id": tweet.in_reply_to_status_id || null,
      "in_reply_to_screen_name": tweet.in_reply_to_screen_name || null
    });
  }

}

console.log(data.length);
console.log(tweets.length);


fs.writeFile('site/_data/notes.json', JSON.stringify(tweets), err => {
  if (err) {
    console.error(err);
  }
  console.error("Notes saved");

});


// {
//   "id" : "1592501775491563521",
//   "in_reply_to_status_id" : "1592500774747402243",
//       "created_at" : "Tue Nov 15 12:56:25 +0000 2022",
//       "full_text" : "@mahemoff Yeah, I'm very concerned about this at the moment. I requested my data export yesterday, and am nervously awaiting it.\n\nOnce I have that archive self-hosted, I may even delete my content from twitter because I'm so concerned about the integrity and compliance there now.",
      
// }
