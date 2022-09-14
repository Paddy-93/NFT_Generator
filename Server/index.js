const artGen = require('./artGenerator');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const { createCanvas, loadImage } = require("canvas");
const multer = require('multer');

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('a36b3c95f0ca387a9a06', '7abef80ea6579574c93a54f2dca4216974bd510dcb3aa1dc9a3e5d1f362b98c3');

const canvas = createCanvas(1000, 1000);
const ctx = canvas.getContext("2d");

//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const { layerConfigurations } = require('./src/config');
//joining path of directory 
const directoryPath = path.join(__dirname, 'Documents');

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use(express.urlencoded({ extended: true }));

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-fff' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/uploadFile',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        } else{
          console.log("SHOULD HAVE UPLOADED")
        }
        res.end("File is uploaded");
    });
});


app.post('/upload-avatar', async (req, res) => {
  console.log('hit it');
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
          let avatar = req.files.avatar;
          
          //Use the mv() method to place the file in upload directory (i.e. "uploads")
          avatar.mv('./uploads/' + avatar.name);

          //send response
          console.log("good")
          res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                  name: avatar.name,
                  mimetype: avatar.mimetype,
                  size: avatar.size
              }
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});


// Priority serve any static files.
//app.use(express.static(path.resolve(__dirname, '../vue-ui/dist')));

var cache = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/uploadFile', (req, res) => {
  //res.redirect('/');
  console.log("OKAY DO IT ");
});

app.post('/upload', (req, res) => {
  //res.redirect('/');
  console.log("OKAY GET IT ");
});



app.post('/genArt', function(req, res){
 // console.log("HEY MAN");      { name: "Background" },

var layerConfig = [];
console.log("HERE "+req.body);
for(var i=0; i<req.body.length; i++){
  var layer = req.body[i];
  var layerEntry = {name: layer}
  layerConfig.push(layerEntry);
}
 artGen.genArt(layerConfig);
 res.send("HOWDY MANmnnn "+layerConfig);
});


// listen on the port
app.listen(port);
