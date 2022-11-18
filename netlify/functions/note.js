const pageTemplate = require('./page/template.js');
const notes = require('../../site/_data/notes.json');
const { builder } = require('@netlify/functions');



const handler = async(event) => {


  console.log(`render note`);
  
    // get the note ID from the request
    const noteID = event.path.split("/note/")[1];

console.log(`get ${noteID}`);



    const note = notes[noteID];

    if(!note) {

      console.log('Not found:', noteID);
      return {

        statusCode: 301,
        headers: {
          Location: `/notes/index.html`,
        }
      };
      
    } else {
      
      return {
          statusCode: 200,
          headers: {
              "Content-Type": "text/html",
          },
          body: pageTemplate(note)
      }
    }
    

}

exports.handler = builder(handler);
