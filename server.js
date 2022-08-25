const fs = require('fs');
const path = require('path');


const PORT = process.env.PORT || 3001;

const notes = require('./db/db.json');

const express = require('express');

//instantiates the server
const app = express();


//make files available and not gated behind a server endpoint
app.use(express.static('public'));



// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());



app.get('/api/notes' , (req,res) => {
    res.json(notes.slice(1));
})

app.get('/notes', (req, res) => {
    //let results = notes;
    // console.log(req.query);
    res.sendFile(path.join(__dirname, './public/notes.html'));
    //res.json({"message": "hellooooooo"});

    console.log('Get request!');
    //res.send("GOT IT!");

});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/notes.html'));
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});






function createNewNote(body, notesArray){
    console.log(body);
  
    //our functions main code will go here!
    const note = body;
    //notesArray.push(note);
    if(!Array.isArray(notesArray)){
        notesArray = [];
    }
    if(notesArray.length === 0){
        notesArray.push(0);
    }

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(note);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notesArray,null,2)
  
    //stringify converts the javascript data to json
    //null means we dont want to edit our existing data
    // 2 means we want to create white space between our values to make it more readable
    //JSON.parse.stringify({notes: notesArray}, null,2)
    
    
    );

  
    //return finished code to post route for response
    return note;
  }



//set up post routes
app.post('/api/notes',(req, res) => {
    console.log(req.body);
    const note = createNewNote(req.body, notes);
    res.json(notes);

});




// //delete function
// function deleteNote (id,notesArray){
//      for (let i = 0; i<notesArray.length; i++){
//         let note = notesArray = notesArray[i];

//         if (note.id == id){
//             notesArray.splice(i,1);
//             fs.writeFileSync(path.join(__dirname, './db/db.json'),JSON.stringify(notesArray,null,2));
//             break;
//         }
        
//     // let ID = parseInt(id);
//     // notesArray.splice(ID,1);
//     //rewrite IDs for remaining notes
//     // for(let i = ID; i< notesArray)
    
//     }
// }


// app.delete('/api/notes/:id', (req,res) => {
//     deleteNote(req.params.id , notes);
//     res.json(true);
// })




//make the server listen
app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
  });







