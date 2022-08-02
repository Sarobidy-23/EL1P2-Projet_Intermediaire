import * as AWS from 'aws-sdk';

const DetectFaces = (imageData: ArrayBuffer, setDataList: any, setLoading: any) => {

    //Customer information
    AWS.config.region = `${process.env.REACT_APP_CREDENTIAL_REGION}`; 
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId:  `${process.env.REACT_APP_CREDENTIAL_IDENTITY}`,
    });
    var rekognition = new AWS.Rekognition();

    //Parameters of the image sending
    var params = {
      Image: {
        Bytes: imageData
      },
      Attributes: [
        'ALL',
      ]
    };
    rekognition.detectFaces(params, function (err, data) {
      if (err) {
        console.log(err)
      }
      else {
        //Get information given by AWS
        setDataList(data.FaceDetails)
        setLoading(false)
      }
    });
  };

export default DetectFaces;
