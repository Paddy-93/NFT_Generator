let fs = require("fs");
let axios = require("axios");
const path = require('path');
const util = require('util')

let imageArray = [];
let imagePromises = [];

let metaArray = [];
let metaPromises = [];


const ipfsHeader = {
    "X-API-KEY": 'c1jzqwqRxXeKXk5T8woxEioB4mWshxYsrUPmr3j8TgkkUFpdgfkPvoGYbAQuDWFs',
    "Content-Type": "application/json",
    "accept": "application/json"
}

const ipfsUrl = "https://deep-index.moralis.io/api/v2/ipfs/uploadFolder";

const uploadFiles = (directory, fileArray, promiseArray, fileExtension, fileType, numEditions) => {
    console.log("DIRECT "+directory);
    for (let i = 1; i <= numEditions; i++) {
        let paddedHex = (  i.toString() );
        promiseArray.push(new Promise( (res, rej) => {
            // console.log(`dir name ${__dirname}/public/${directory}/${fileType}/${paddedHex}${fileExtension}`);
            fs.readFile(`${__dirname}/public/${directory}/${fileType}/${paddedHex}${fileExtension}`, (err, data) => {
               // console.log(data.toString());
                if(err) rej();
                fileArray.push({
                    path: `${paddedHex}${fileExtension}`,
                    content: data.toString("base64")
                })
                res();
            })
        }))
    }
}

const updateMetaData = (directory, newString) => {
    const dir = `${__dirname}/public/${directory}/json/`;
    const filePaths = walk(dir);
    // console.log(filePaths);
    filePaths.forEach(filePath => edit(filePath,newString));
};

const uploadImages = async (directory, numEditions) => {
    uploadFiles(directory, imageArray, imagePromises, '.png', 'images', numEditions );

    await Promise.all(imagePromises);
    var result = await axios.post(ipfsUrl, 
            imageArray,
            {
                headers: ipfsHeader
            });
    
    return result.data[0].path 
}

const uploadMetaData = async(directory, numEditions) => {
    uploadFiles(directory, metaArray, metaPromises, '.json', 'json', numEdition);

    await Promise.all(metaPromises);

    var result = await axios.post(ipfsUrl, 
            metaArray,
            {
                headers: ipfsHeader
            });


    return result.data[0].path 
}

const walk = dir => {
    try {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
          // Recurse into subdir
          results = [...results, ...walk(file)];
        } else {
          // Is a file
          results.push(file);
        }
      });
      return results;
    } catch (error) {
      console.error(`Error when walking dir ${dir}`, error);
    }
  };

const edit = (filePath,newString) => {
    const oldContent = fs.readFileSync(filePath, {encoding: 'utf8'});
    const regex = /NewUriToReplace/;
    const replaceVal = newString;
    const newContent = oldContent.replace(regex, replaceVal);
    fs.writeFileSync(filePath, newContent, {encoding: 'utf-8'});
    // console.log(`Edited file: ${filePath}`);
};

// const cleanNewString = (oldString) => {
//     console.log("OLD STRING "+oldString)
//     const firstIndex = "/ipfs/";
//     const first = oldString.slice(
//         oldString.indexOf("/ipfs/") + firstIndex.length,
//     );
//     const middle  = first.substr(0, first.indexOf('/')); 
//     // console.log(middle)
//     return middle;

// }

const uploadData=async(directory)=>{
    var imagePath = await uploadImages(directory);
    var newString = cleanNewString(imagePath);
    updateMetaData(directory,newString);
    var metaPath = await uploadMetaData(directory);
    console.log("META DONE "+metaPath);
    fs.rmSync(`${__dirname}/public/${directory}`, { recursive: true, force: true });
    fs.rmSync(`${__dirname}/output/${directory}`, { recursive: true, force: true });
    return metaPath;
}

// uploadData('1663871369776_Racoons');

module.exports = { uploadData };
