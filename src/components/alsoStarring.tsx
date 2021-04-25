import * as React from "react"
import Skeleton from "react-loading-skeleton"
import styled from "styled-components"
import FemaleMale from "../images/female_male.inline.svg"
import Profile from "../images/profile.inline.svg"
import ExternalLink from "./externalLink"
import { IconHeadline, Headline3 } from "./movieDetails"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"

const CastlistWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
`

interface CastCardProps {
  readonly movieId: number
  readonly isMobile: "mobile" | "desktop" | undefined
}

const CastCard = styled.div<CastCardProps>`
  height: fit-content;
  width: 20%;
  max-width: ${props => (props.isMobile === "mobile" ? "188px" : "196px")};
  min-width: 70px;
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  & a {
    margin: 0 auto;
    width: 100%;
    transition: transform 0.2s ease-in-out;
  }
  & a:hover {
    transform: scale(1.1);
  }
  & div {
    box-shadow: 8px 8px 6px var(--border-main);
    border-radius: 50%;
    border: ${props =>
      props.isMobile === "mobile"
        ? "4px solid var(--movie-paragraph-color)"
        : "8px solid var(--movie-paragraph-color)"};
    width: 100%;
    padding-top: ${props =>
      props.isMobile === "mobile" ? "calc(100% - 8px)" : "calc(100% - 16px)"};
    min-width: 72px;
    max-width: ${props => (props.isMobile === "mobile" ? "188px" : "196px")};
    overflow: hidden;
    position: relative;
    margin-bottom: 0.5em;
    height: 0;
  }
  & a:hover div {
    box-shadow: 6px 12px 6px var(--border-main);
  }
  & svg.profile {
    width: 80%;
    height: 80%;
    position: absolute;
    top: 6%;
    left: 10%;
    margin: 0;
  }
  & img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  & h2 {
    font-family: "Passion One", cursive;
    font-weight: 400;
    font-size: 1.2em;
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    line-height: 0.9;
    color: var(--movie-paragraph-color);
    text-shadow: 4px 4px 4px var(--border-main);
    text-align: center;
  }
  & h3 {
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
    font-size: 1em;
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0.8em;
    line-height: 1.1;
    color: var(--movie-paragraph-color);
    text-shadow: 4px 4px 4px var(--border-main);
    text-align: center;
  }
  & p {
    text-align: center;
    margin-block-start: 0.2em;
    margin-block-end: 0.4em;
    flex-basis: 20px;
    margin-block-start: 0.2em;
    margin-block-end: 0.4em;
    color: var(--movie-paragraph-color);
  }
`

interface StarringProps {
  movieDetailedData: object | null
  readonly isMobile: "mobile" | "desktop" | undefined
  isLoading: boolean
}

const AlsoStarring = ({
  movieDetailedData,
  isMobile,
  isLoading,
}: StarringProps) => {
  const { t } = useTranslation()
  const castListData =
    movieDetailedData !== null
      ? movieDetailedData.credits.cast.length > 1
        ? movieDetailedData.credits.cast
        : null
      : null
  //console.log(castListData)

  const castList =
    castListData !== null
      ? castListData.map((cast, index) =>
          cast.original_name !== "Bruce Willis" ? (
            index < 7 ? (
              cast.profile_path !== null ? (
                <>
                  <CastCard isMobile={isMobile}>
                    <ExternalLink
                      href={`https://www.themoviedb.org/person/${cast.id}`}
                      title={`Details about ${cast.original_name}`} //skal oversættes
                    >
                      <div>
                        <Profile className="profile" />
                        <img
                          src={`https://www.themoviedb.org/t/p/w180_and_h180_face${cast.profile_path}`}
                        />
                      </div>
                    </ExternalLink>
                    <h2>{cast.original_name}</h2>
                    <p className="starringAs">
                      {t("MOVIEDETAILS.STARRING_AS")}
                    </p>
                    <h3>{cast.character}</h3>
                  </CastCard>
                </>
              ) : null
            ) : null
          ) : null
        )
      : null

  console.log(castList !== null && castList.length === 1)

  return (
    <>
      {isLoading ? (
        <IconHeadline fullWidth isMobile={isMobile}>
          <span>
            <FemaleMale />
            <Headline3>{t("MOVIEDETAILS.ALSO_STARRING")}</Headline3>
          </span>
          <CastlistWrapper>
            <CastCard isMobile={isMobile}>
              <div>
                <Skeleton
                  width={"100%"}
                  height={"100%"}
                  style={{
                    position: "absolute",
                    top: "0",
                  }}
                  circle={true}
                />
                <Profile className="profile" />
              </div>
              <h2>CAST NAME</h2>
              <p className="starringAs">AS</p>
              <h3>CAST CARACTER</h3>
            </CastCard>
            <CastCard isMobile={isMobile}>
              <div>
                <Skeleton
                  width={"100%"}
                  height={"100%"}
                  style={{
                    position: "absolute",
                    top: "0",
                  }}
                  circle={true}
                />
                <Profile className="profile" />
              </div>
              <h2>CAST NAME</h2>
              <p className="starringAs">AS</p>
              <h3>CAST CARACTER</h3>
            </CastCard>
            <CastCard isMobile={isMobile}>
              <div>
                <Skeleton
                  width={"100%"}
                  height={"100%"}
                  style={{
                    position: "absolute",
                    top: "0",
                  }}
                  circle={true}
                />
                <Profile className="profile" />
              </div>
              <h2>CAST NAME</h2>
              <p className="starringAs">AS</p>
              <h3>CAST CARACTER</h3>
            </CastCard>
            <CastCard isMobile={isMobile}>
              <div>
                <Skeleton
                  width={"100%"}
                  height={"100%"}
                  style={{
                    position: "absolute",
                    top: "0",
                  }}
                  circle={true}
                />
                <Profile className="profile" />
              </div>
              <h2>CAST NAME</h2>
              <p className="starringAs">AS</p>
              <h3>CAST CARACTER</h3>
            </CastCard>
            <CastCard isMobile={isMobile}>
              <div>
                <Skeleton
                  width={"100%"}
                  height={"100%"}
                  style={{
                    position: "absolute",
                    top: "0",
                  }}
                  circle={true}
                />
                <Profile className="profile" />
              </div>
              <h2>CAST NAME</h2>
              <p className="starringAs">AS</p>
              <h3>CAST CARACTER</h3>
            </CastCard>
          </CastlistWrapper>
        </IconHeadline>
      ) : (
        <IconHeadline fullWidth isMobile={isMobile}>
          <span>
            <FemaleMale />
            <Headline3>{t("MOVIEDETAILS.ALSO_STARRING")}</Headline3>
          </span>
          <CastlistWrapper>{castList}</CastlistWrapper>
        </IconHeadline>
      )}
    </>
  )
}
export default AlsoStarring
