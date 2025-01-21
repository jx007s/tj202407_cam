import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

function myWeb_2(props) {


    const msgGo=(ee)=>{
        const {data} = ee.nativeEvent
        console.log("msgGo 실행", data)
    }

    return (
        <View style={{flex:1}}>
            <WebView 
                style={{
                    width:'100%',
                    height:'70%'
                }}
                source={{uri:'file:///android_asset/qqq/asdf.html'}}
                javaScriptEnabled={true}  //javascript 활성화
                domStorageEnabled={true}  //dom Storage 활성화
                onMessage={msgGo}  //WebView에서 보내는 메시지 처리하는 콜백함수
            />
            
        </View>
    );
}

export default myWeb_2