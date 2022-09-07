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
  return response;
  // console.log("THIS PART "+JSON.stringify(response))

};

const getFiles = () => {
  return http.get("/files");
};

const FileUploadService = {
  upload,
  getFiles,
};

export default FileUploadService; 
