import * as React from "react"
import Profile from "../../images/profile.inline.svg"
import ExternalLink from "../ExternModal/externalLink"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { CastCard } from "./alsoStarring"

interface CastListProps {
  readonly castListData: CastListDataInterface
  readonly isMobile: "mobile" | "desktop" | undefined
}

export interface CastListDataInterface {
  map?(arg: (cast: any, index: number) => JSX.Element): any
  [index: number]: { string: string }
  length?: number
}

const CastList = ({ castListData, isMobile }: CastListProps) => {
  const { t } = useTranslation()

  return !!castListData
    ? castListData.map((cast: any, index: number) =>
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
}
export default CastList
