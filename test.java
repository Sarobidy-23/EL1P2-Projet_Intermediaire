  
  const client = new AWS.Rekognition({region: "eu-west-2"})
  // const reader = new FileReader();
  
  let conv = new  Uint8Array(file)
  
  // let params = {
  //   "Attributes": [ "string" ],
  //  "Image": { 
  //     "Bytes": conv,
  //     "S3Object": { 
  //        "Bucket": "string",
  //        "Name": "string",
  //        "Version": "string"
  //     }
  //  }
  // }
  var params = {
    Image: {
      Bytes: conv
    },
    Attributes: [
      'ALL',
    ]
  };
  
  client.detectFaces(params, function(err, data){
    if(data){
      console.log(data.FaceDetails)
    }
    else{
      console.log(err)
    }
  })

  const anoLog = ()=>{
      AWS.config.region = 'eu-west-2'; // Region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
         IdentityPoolId: 'eu-west-2:371cdf1c-657e-4e3f-a6a0-3cdcf905bfdc',
      });
  }
  anoLog()
  //   // let conv = new  Uint8Array(file)
//  const change = (fichier: Base64) =>{
//   if(fichier.length > 0){
//     let imageBytes
//     var length = fichier.length;
//           imageBytes = new ArrayBuffer(length);
//           var ua = new Uint8Array(imageBytes);
//           for (var i = 0; i < length; i++) {
//             ua[i] = fichier.charCodeAt(i);
            
//           }
//           DetectFaces(ua.buffer)
//         }
//       }
