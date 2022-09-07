const express = require('express');         // Express Web Server
const busboy = require('connect-busboy');   // Middleware to handle the file upload https://github.com/mscdex/connect-busboy
const path = require('path');               // Used for manipulation with path
const fs = require('fs');             // Classic fs
const cors = require("cors");
const unzipper = require('unzipper');


const app = express(); // Initialize the express web server
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware

const uploadPath = path.join(__dirname, 'fileupload'); // Register the upload path


var corsOptions = {
    origin: "http://localhost:3000/"
  };
  
  app.use(cors());



/**
 * Create route /upload which handles the post request
 */
app.route('/upload').post((req, res, next) => {
    var data;
    var tempFileName;
    req.pipe(req.busboy); // Pipe it trough busboy

    req.busboy.on('file', (fieldname, file, filename) => {
        tempFileName =  Date.now()+filename.filename;
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
            // console.log("DATA IS "+data)
            res.send(data);
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
    console.log(`Listening here on port ${server.address().port}`);
});