import http from "../http-common";


// const apiGet = async(query) => {
//   console.log(`Need to fetch ${BASE_URL}${query}`)
//   const response = await fetch(`${BASE_URL}${query}`).then(result => result.json());
//   return response;
// }


const upload = async (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);
  const response = await http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  // console.log("THIS PART "+JSON.stringify(response))
  return response;
   

};

const genImages = async(_layers, dirName, numEditions, routeCall) => {
  var postLayers = _layers.map((layer, idx)=>{
      return {name: layer}
  })
  postLayers = {layers: postLayers, dirName: dirName, numEditions:numEditions}
   console.log("GEN IMAGES jdfds " + JSON.stringify(postLayers))
   var data = await http.post(routeCall ? routeCall : '/genimages', postLayers)
   debugger;
   console.log("Images generated " + data);
   return data;
}

const previewImages = (_layers, dirName) => {
      return genImages(_layers,dirName, 10, '/previewimages');
}

const getFiles = () => {
  return http.get("/files");
};

const FileUploadService = {
  upload,
  getFiles,
  genImages,
  previewImages,
};

export default FileUploadService; 
