import React, { useRef, useState } from 'react';
import { View , Text, Button} from 'react-native';
import WebView from 'react-native-webview';

function myWeb_2(props) {
    const [htmlMsg, setHtmlMsg] = useState('')

    const wvRef = useRef(null)

    const msgGo=(ee)=>{
        const {data} = ee.nativeEvent
        console.log("msgGo 실행", data)
        setHtmlMsg(data)
    }
    const htmlFnGo=()=>{
        if(wvRef.current){  // 앱 -> html 의 함수 실행
            wvRef.current.injectJavaScript('h1BG()')
        }
        
    }

    return (
        <View style={{flex:1}}>
            <Text>html 에서 온 내용 : {htmlMsg}</Text>
            <Button title="html함수" onPress={htmlFnGo}/>

            <WebView 
                ref={wvRef}
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