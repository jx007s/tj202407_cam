import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, Text, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request , PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNFS from 'react-native-fs';

var camChk = false
var storageChk = false
function myCam(props) {

    const [imgUrl, setImgUrl] = useState(null) //선택한 이미지 경로 
    const [fileName, setFileName] = useState(null) //선택한 이미지 파일명


    useEffect(()=>{
        camChk = requestCamPermission()
        storageChk = requestStoragePermission()
    },[])

    //카메라 권한요청 함수
    const requestCamPermission = async () =>{

        //카메라 권한요청
        const ret = await request(PERMISSIONS.ANDROID.CAMERA)

        if(ret===RESULTS.GRANTED){
            return true
        }else{
            Alert.alert('권한필요','카메라 권한 필요')
            return false
        }

    }

    //갤러리 권한요청 함수
    const requestStoragePermission = async () =>{

        //갤러리 권한요청
        const ret = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)

        if(ret === RESULTS.GRANTED){
            return true
        }else{
            Alert.alert('권한필요','갤러리 권한 필요')
            return false
        }

    }


    const openCamera = async ()=>{
        //카메라 권한 확인
        if(!camChk){
            return;
        }

        launchCamera(
            {
            mediaType :'photo',
            cameraType:'back',
            saveToPhotos:true,
            quality:1
            },

            async (res)=>{
                if(res.didCancel){
                    console.log('카메라 취소')
                }else if(res.errorCode){
                    console.log('카메라 에러', res.errorMessage)
                }else{
                    const mySrc = {uri:res.assets[0].uri}
                    setImgUrl(mySrc.uri)

                    const fName = res.assets[0].fileName;
                    setFileName(fName);
                    

                    // 앱 특정폴더  --> RNFS.DocumentDirectoryPath : 현재 앱 위치
                    const appFolderPath = RNFS.DocumentDirectoryPath+"/qqq";
                    //저장될 파일 경로
                    const fPath = appFolderPath+"/"+fName;

                    try {
                        //폴더가 없으면 폴더 생성
                        const fis =  await RNFS.exists(appFolderPath)    
                        if(!fis){
                            await RNFS.mkdir(appFolderPath)
                        }

                        //파일저장(파일 복사)
                        await RNFS.copyFile(mySrc.uri, fPath);

                        //삭제
                        //await RNFS.unlink(fPath);

                        //파일저장(파일 이동)
                        //await RNFS.moveFile(mySrc.uri, fPath);

                        console.log("파일저장성공 : ", fPath);
                    } catch (error) {
                        console.log("파일저장실패 : ", error);
                    }
                    



                }
            }
         )

    }

    const openGallery = async ()=>{
        //저장소 권한 확인
        if(!storageChk){
            return;
        }

        launchImageLibrary(
            {
                mediaType :'photo',
                quality:1
            },

            (res)=>{
                if(res.didCancel){
                    console.log('갤러리 취소')
                }else if(res.errorCode){
                    console.log('갤러리 에러', res.errorMessage)
                }else{
                    const mySrc = {uri:res.assets[0].uri}
                    setImgUrl(mySrc.uri)
                }
            }
        )

    }



    return (
        <View>
            <Text>카메라입니다.</Text>
            <Button title="카메라" onPress={openCamera}/>
            <Button title="갤러리" onPress={openGallery}/>
            {
                imgUrl && (<Image 
                    source={{uri : imgUrl}}
                    style={{width:300 , height:300, marginTop:20}}
                />)
            }

            {
                fileName && (<Text>파일명 : {fileName}</Text>)
            }
        </View>
    );
}

export default myCam;