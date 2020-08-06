import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {
  requestArtist,
  receiveArtist,
  receiveAccessTokenError,
} from "../../action";
import { numFormatter } from "../../helpers/utils";

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const currentArtist = useSelector((state) => state.artists.currentArtist);

  const artistId = useParams().id;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtist());
    fetchArtistProfile(accessToken, artistId)
      .then((data) => {
        dispatch(receiveArtist(data));
      })
      .catch((err) => dispatch(receiveAccessTokenError()));
  }, [accessToken, currentArtist]);
  console.log(currentArtist);
  return (
    <>
      {!currentArtist && <p>loading!</p>}
      {currentArtist && (
        <>
          <h1>{currentArtist.name}</h1>
          <p>
            <span style={{ fontWeight: 800 }}>
              {numFormatter(currentArtist.followers.total)}
            </span>
            &nbsp;followers
          </p>
          {currentArtist.images.slice(1, 2).map((image, index) => (
            <img key={index} src={image.url} alt={currentArtist.name} />
          ))}
          <h2>Tags</h2>
          <ul>
            {currentArtist.genres.slice(0, 2).map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
export default ArtistRoute;
