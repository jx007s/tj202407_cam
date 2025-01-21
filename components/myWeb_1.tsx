import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import WebView from 'react-native-webview';

function myWeb_1(props) {

    const [inputUrl, setInputUrl] = useState("")
    const [url, setUrl] = useState('https://m.nate.com')

    //웹 페이지 로드 함수
    const loadWebPage = (url)=>{
        setUrl(url)
    }

    return (
        <View style={{flex:1}}>
            <WebView 
                source={{ uri:url } }
                style={{ backgroundColor:'#ff0',
                    width:'100%',
                    height:'60%'
                }}   
            />
            <TextInput placeholder='주소입력' value={inputUrl} onChangeText={setInputUrl}/>
            <Button title="inputGo" onPress={()=>loadWebPage(inputUrl)}/>
            <Button title="네이버" onPress={()=>loadWebPage('https://m.naver.com')}/>  
            <Button title="html파일" onPress={()=>loadWebPage('file:///android_asset/qqq/qwer.html')}/>    
        </View>
    );
}

export default myWeb_1;