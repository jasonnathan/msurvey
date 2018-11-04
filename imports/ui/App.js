import React, { PureComponent } from 'react';
import {
  createNavigator,
  SwitchRouter,
  SceneView
} from '@react-navigation/core';
import { createBrowserApp, Link } from '@react-navigation/web';
import { GraphView } from './scenes/SentimentView';
import CenteredContainer from './components/CenteredContainer';
import Login from './features/Accounts/components/Login';
import SignUp from './features/Accounts/components/SignUp';
import ForgotPassword from './features/Accounts/components/ForgotPassword';
import ResetPassword from './features/Accounts/components/ResetPassword';

function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>
        <Link routeName="Login">Sign In</Link> to continue
      </p>
    </div>
  );
}
Home.path = '';
Home.navigationOptions = {
  title: 'Home',
  linkName: 'Home Page'
};

class MainScene extends PureComponent {
  render() {
    const { descriptors, navigation } = this.props;
    const activeKey = navigation.state.routes[navigation.state.index].key;
    const descriptor = descriptors[activeKey];
    return (
      <CenteredContainer>
        <SceneView
          component={ descriptor.getComponent() }
          navigation={ descriptor.navigation }
        />
      </CenteredContainer>
    );
  }
}

class Menu extends PureComponent {
  render() {
    return (
      <div
        style={ {
          display: 'flex',
          height: '100%',
          justifyContent: 'stretch',
          flexDirection: 'column'
        } }
      >
        <div
          className="menu"
          style={ {
            backgroundColor: '#efefef',
            borderRight: '1px solid #99b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: 0,
            margin: 0,
            textAlign: 'center'
          } }
        >
          <Link routeName="Home">Home</Link>
          <Link routeName="Login">Login</Link>
        </div>
      </div>
    );
  }
}

const AppNavigator = createNavigator(
  MainScene,
  SwitchRouter({
    Home,
    Login,
    SignUp,
    ForgotPassword,
    ResetPassword
  }),
  {}
);

const App = createBrowserApp(AppNavigator);

export default App;
