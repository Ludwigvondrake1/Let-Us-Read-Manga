const express = require('express');
const app = express();
const port = 3000;
const url = require('url');


app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port} http://localhost:3000/ `)
  })

 

  app.get('/mangainfo', (req, res) => {
  
    
    res.sendFile(__dirname + '/public/mangainfo.html');

  });
  app.get('/mangachapter', (req, res) => {
  
    
    res.sendFile(__dirname + '/public/mangachapter.html');

  });