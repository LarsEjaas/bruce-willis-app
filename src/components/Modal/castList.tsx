import * as React from "react"
import Profile from "../../images/profile.inline.svg"
import ExternalLink from "../ExternModal/externalLink"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { CastCard } from "./alsoStarring"
import { CastEntity } from "../Data/sourceData"

interface CastListProps {
  readonly castListData: CastEntity[]
  readonly isMobile: "mobile" | "desktop" | undefined
}

const CastList = ({ castListData, isMobile }: CastListProps) => {
  const { t } = useTranslation()

  const castListArray = !!castListData
    ? castListData.map((cast: CastEntity, index: number) =>
        cast.original_name !== "Bruce Willis" ? (
          index < 7 ? (
            !!cast.profile_path ? (
              <>
                <CastCard isMobile={isMobile}>
                  <ExternalLink
                    href={`https://www.themoviedb.org/person/${cast.id}`}
                    title={`${t("MOVIEDETAILS.ALSO_STARRING_TITLE")}${
                      cast.original_name
                    }`}
                  >
                    <div>
                      <Profile className="profile" />
                      <img
                        src={`https://www.themoviedb.org/t/p/w180_and_h180_face${cast.profile_path}`}
                        alt={`${t("MOVIEDETAILS.ALSO_STARRING_ALT")}${
                          cast.original_name
                        }`}
                      />
                    </div>
                  </ExternalLink>
                  <h2>{cast.original_name}</h2>
                  <p className="starringAs">{t("MOVIEDETAILS.STARRING_AS")}</p>
                  <h3>{cast.character}</h3>
                </CastCard>
              </>
            ) : null
          ) : null
        ) : null
      )
    : null

  return <>{castListArray}</>
}
export default CastList
