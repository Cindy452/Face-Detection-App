import React, { useState, useReducer } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Navigation from './components/navigation/Navigation';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import {particlesOptions, initialAppState, initialUserState } from './constants';
import { calculateFaceLocation } from './utils';
import './App.css';
import 'tachyons';

const reducer = (appState, action) => {
  switch (action.type) {
    case 'resetAppState':
      return initialAppState;
    case 'resetUserState':
      return initialUserState;
    default:
      const result = { ...appState };
      result[action.type] = action.value;

      return result;
  }
};

const App = () => {
  const [appState, dispatch] = useReducer(reducer, initialAppState);
  const { imgLinkInput, imageUrl, box, route, isSignedIn } = appState;
  const [user, setUser] = useState(initialUserState);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: name, value });
  };

  const displayFacebox = (boxValues, dispatch) => {
    dispatch({ type: 'box', value: boxValues });
  };

  const onPictureSubmit = () => {
    dispatch({ type: 'imageUrl', value: imgLinkInput });
    fetch('https://arcane-refuge-49695.herokuapp.com/imageurl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: imgLinkInput,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch('https://arcane-refuge-49695.herokuapp.com/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser((prevUser) => {
                return {
                  ...prevUser,
                  entries: count,
                };
              });
            })
            .catch(console.log);
        }
        displayFacebox(calculateFaceLocation(response), dispatch);
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if (route === 'signout') {
      dispatch({ type: 'resetUserState' });
      dispatch({ type: 'resetAppState' });
    } else if (route === 'home') {
      dispatch({ type: 'isSignedIn', value: true });
    }
    dispatch({ type: 'route', value: route });
  };

  return (
    <div className='App'>
      <Particles className='particles' params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home' ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />{' '}
        </div>
      ) : route === 'signin' ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
};

export default App;