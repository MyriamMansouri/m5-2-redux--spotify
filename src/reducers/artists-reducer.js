const initialState = {
  currentArtist: null,
  status: "idle",
};

const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_ARTIST": {
      return { ...state, status: "loading" };
    }
    case "RECEIVE_ARTIST": {
      return {
        ...state,
        currentArtist: action.artistProfile,
        status: "idle",
      };
    }
    case "RECEIVE_ARTIST_ERROR": {
      return { ...state, status: "error" };
    }
    default: {
      return state;
    }
  }
};

export default artistReducer;
