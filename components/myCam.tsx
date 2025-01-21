import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, Text, View } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { request , PERMISSIONS, RESULTS} from 'react-native-permissions';

var camChk = false
function myCam(props) {

    const [imgUrl, setImgUrl] = useState(null) //선택한 이미지 경로 


    useEffect(()=>{
        camChk = requestCamPermission()
        requestStoragePermission()
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

            (res)=>{
                if(res.didCancel){
                    console.log('카메라 취소')
                }else if(res.errorCode){
                    console.log('카메라 에러', res.errorMessage)
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
            {
                imgUrl && (<Image 
                    source={{uri : imgUrl}}
                    style={{width:300 , height:300, marginTop:20}}
                />)
            }
        </View>
    );
}

export default myCam;