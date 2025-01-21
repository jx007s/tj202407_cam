/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import myCam from './components/myCam';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => myCam);
