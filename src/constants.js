export const particlesOptions = {
    particles: {
      line_linked: {
        shadow: {
          enable: true,
          color: "#3CA9D1",
          blur: 5
        }
      }
    }
  }



export const initialAppState = {
    imgLinkInput: '',
    imageUrl: '',
    box: '',
    route: 'signin',
    isSignedIn: false,
  };
  
  export const initialUserState = {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: '',
  };