export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

export const requestArtist = () => ({
  type: "REQUEST_ARTIST",
});

export const receiveArtist = (artistProfile) => ({
  type: "RECEIVE_ARTIST",
  artistProfile,
});

export const receiveArtistError = () => ({
  type: "RECEIVE_ARTIST_ERROR",
});
