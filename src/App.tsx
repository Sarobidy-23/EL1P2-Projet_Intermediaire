import React, { useState, useEffect} from 'react';
import './App.css';
//Send request at AWS Rekognition
import DetectFaces from './component/DetectFaces';
//Wait for result
import Load from './component/Load'
//Display result
import Result from './component/Result';
//get size of the image for the frame on the face
import getSize from './component/getSize'


function App() {
  const [fichier, setFichier] = useState<any>();
  const [source, setSource] = useState<any>()
  const [dataList, setDataList] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  const previewFile = (event: any) => {
    //Convert to Base64
      const base64 = new FileReader();
      base64.readAsDataURL(event.target.files[0])
      base64.addEventListener('load', function(){
        setSource(base64.result);
      })
  
    //Convert file to ArrayBuffer for AWS request
      const buffer = new FileReader();
      buffer.readAsArrayBuffer(event.target.files[0]);
      buffer.addEventListener("load", function () {
        setFichier(buffer.result)
      }, false);   
  };

  useEffect(() => {
      if(fichier !== undefined && fichier !== null){
         DetectFaces(fichier, setDataList, setLoading)
      }
  }, [fichier]);

  return (
    <>
      <div className='navBar'>
        <span className='text'></span>
      </div>
      <div className='file'>
          <label htmlFor="fileToUpload" className="files">upload image</label>
          <input id='fileToUpload' type="file" accept='image/*' onChange={(e)=>{previewFile(e); setLoading(true); setDataList(null)}} />
      </div>
      <div className='ici'> <br />
        {dataList && source?
          <>
            <div className='photo'>
              <img src={source} alt="" id='img' onLoad={(e)=>{getSize(e, dataList)}}/>
              <div className='cadre'></div>
            </div>
            <Result datas={dataList}/> 
          </>: ""
        }
      {/* <Result/>  */}
      </div>
      {loading?
        <Load/>:""
      }
    </>
  );
}

export default App;
