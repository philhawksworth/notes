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


fs.writeFile('site/_data/notes.json', JSON.stringify(tweets), err => {
  if (err) {
    console.error(err);
  }
  console.error("Notes saved");
});
