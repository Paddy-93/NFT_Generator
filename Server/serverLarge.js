const express = require('express');         // Express Web Server
const busboy = require('connect-busboy');   // Middleware to handle the file upload https://github.com/mscdex/connect-busboy
const path = require('path');               // Used for manipulation with path
const fs = require('fs');             // Classic fs
const cors = require("cors");
const unzipper = require('unzipper');
const {genArt} = require('./artGenerator.js')


const app = express(); // Initialize the express web server

console.log(" DIR NAME " + __dirname)
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware




const uploadPath = path.join(__dirname, 'fileupload'); // Register the upload path


var corsOptions = {
    origin: "http://localhost:3000/"
  };
  
  app.use(cors());
  app.use(express.json());

//   app.use(express.static(__dirname + "/public"));

app.use('/images', express.static(__dirname+'/public/'))

  console.log(__dirname);

  app.route('/genimages').post((req, res, next) => {
   console.log("GEN IMAGES "+req.body.layers);
   genArt(req.body.layers, req.body.dirName, req.body.numEditions);
  });


  app.route('/previewimages').post((req, res, next) => {
    console.log("GEN IMAGES "+req.body.layers);
    genArt(req.body.layers, req.body.dirName, 10);

   });

// /**
//  * Create route /upload which handles the post request
//  */
app.route('/upload').post((req, res, next) => {
    var data;
    var tempFileName;
    req.pipe(req.busboy); // Pipe it trough busboy

    req.busboy.on('file', (fieldname, file, filename) => {
        tempFileName =  Date.now()+'_'+filename.filename;
        console.log('Upload of '+filename+' started');
        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(uploadPath, tempFileName));
        // Pipe it trough
        file.pipe(fstream);

        

        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${tempFileName}' finished`);
            const directoryName = tempFileName.split(".zip")[0];
            fs.mkdirSync('./output/'+directoryName);
            var stream = fs.createReadStream('./fileupload/'+tempFileName).pipe(unzipper.Extract({ path: 'output/'+directoryName }));
            stream.on('finish', function () { 
            data = getDirectories("./output/"+directoryName+"/"+filename.filename.split(".zip")[0]);
             console.log("DATA TO SEND IS "+data)
            const responseData = {layerOrder: data, directoryName: directoryName}
            res.send(responseData);
            });

            const getDirectories = source =>
            fs.readdirSync(source, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map((dirent)=> {
                    return dirent.name;
                })

            //res.redirect('back');
        });
    });
});

// app.use(express.static(__dirname +'/build/'));

// app.use('/images', express.static(__dirname+'/build/'))

/**
 * Serve the basic index.html with upload form
 */
app.route('/').get((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="upload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="fileToUpload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});

const server = app.listen(3001, function () {
    console.log(`Listening here on pfdsort ${server.address().port}`);
});