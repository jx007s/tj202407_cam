/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import myCam from './components/myCam';
import myWeb_1 from './components/myWeb_1';
import myWeb_2 from './components/myWeb_2';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => myWeb_2);
