import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import { requestArtist, receiveArtist, receiveArtistError } from "../../action";
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
      .catch((err) => dispatch(receiveArtistError()));
  }, [accessToken, currentArtist]);
  console.log(currentArtist);
  return (
    <Main>
      {!currentArtist && <p>loading!</p>}
      {currentArtist && (
        <>
          {currentArtist.images.slice(1, 2).map((image, index) => (
            <Picture url={image.url}>
              <Name>{currentArtist.name}</Name>
            </Picture>
          ))}
          <p>
            <Followers style={{ fontWeight: 800 }}>
              {numFormatter(currentArtist.followers.total)}
            </Followers>
            &nbsp;followers
          </p>
          <TagTitle>tags</TagTitle>
          <TagSection>
            {currentArtist.genres.slice(0, 2).map((genre, index) => (
              <Tag key={index}>{genre}</Tag>
            ))}
          </TagSection>
        </>
      )}
    </Main>
  );
};

const Main = styled.main`
  min-width: 400px;
  margin: 20px auto;
  height: 100vh;
  display: flex;
  flex-flow:column nowrap;
  align-items: center;
`;
const Picture = styled.div`
  background: url(${(props) => props.url}) center center;
  background-size: cover;
  width: 250px;
  height: 250px;
  margin: 59px 0 40px 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Name = styled.h1`
  white-space: nowrap;
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;
  margin: 0;
  /* White */
  color: #ffffff;
  /* Triple shadow */
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
`;

const Followers = styled.span`
  color: #ff4fd8;
`;
const Tag = styled.li`
  display: inline-block;
  background-color: rgba(75, 75, 75, 0.4);
  border-radius: 10px;
  padding: 15px 30px;
`;

const TagTitle = styled.h2`
  font-weight: 600;
`;
const TagSection = styled.ul`
margin-top:70px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-weight:600;
`;
export default ArtistRoute;
