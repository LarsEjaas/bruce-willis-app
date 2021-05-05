import * as React from "react"
import { ReactNode } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import { globalHistory as history } from "@reach/router"
import { useI18next } from "gatsby-plugin-react-i18next"

const removeBackSlashEnd = (path: string) => {
  if (!path) return
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path
}

const removeBackSlashStart = (path: string) => {
  if (!path) return
  return path.startsWith("/") ? path.slice(1, path.length) : path
}

const httpsTohttp = (path: string) => {
  if (!path) return
  return path.replace(/^https:\/\//i, "http://")
}

const getImageType = (path: string) => {
  if (!path) return
  let regexp = /jpeg|png?/gi
  return path.match(regexp)
}

interface SeoProps {
  children?: ReactNode
  title: string
  description?: string
  contentType?: string
  published?: string
  category?: string
  tags?: string
  twitter?: string
  author?: string
  image?: string
}

const SEO = ({
  children,
  title,
  description,
  contentType,
  published,
  category,
  tags,
  twitter,
  author,
  image,
}: SeoProps) => {
  const { location } = history

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title_en
            title_da
            description_en
            description_da
            siteUrl
            author
            logo
            right_en
            right_da
            seo_image_en
            seo_image_da
          }
        }
      }
    `
  )

  const { languages, language } = useI18next()
  const siteMetadata = data.site.siteMetadata
  const siteUrl = removeBackSlashEnd(siteMetadata.siteUrl)
  const NoSecuresiteUrl = httpsTohttp(siteUrl)
  const pageTitle = title || `${siteMetadata.title}`
  const pageDescription = description || `${siteMetadata.description}`
  const pageContentType = contentType || "article"
  const pagePublished = published || new Date().toISOString()
  const updated = new Date().toISOString()
  const pageCategory = category
  const pageTags = tags
  const pageTwitter = twitter
  const pageAuthor = author || `${siteMetadata.author}`
  const rights = siteMetadata[`right_${language}`]
  const imageType = `image/${getImageType(image)}` || `image/png`
  const imageWidth = "1200"
  const imageHeight = "630"

  const createUrlWithLang = (lng: string) => {
    const url = lng === "da" ? `${siteUrl}` : `${siteUrl}/${lng}`
    return url.endsWith("/") ? url : `${url}/`
  }

  const canonicalUrl = `${siteUrl}${location.pathname}` //this CANNOT be overwritten from SEO props!!

  return (
    <Helmet htmlAttributes={{ lang: language }} title={pageTitle}>
      <link rel="preload" as="image" href="../286_Bruce_Willis.avif" />
      <link rel="preload" as="image" href="/572_Bruce_Willis.avif" />
      <link
        rel="preconnect"
        href="https://api.themoviedb.org"
        crossOrigin="true"
      />
      {children}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="google-site-verification"
        content="QpzbWyXdTokkFrVZui6pGRmzux8ee4y8FHmFynU2mvM"
      />
      <meta name="language" content={language}></meta>
      <meta name="distribution" content="Global"></meta>
      <meta name="application-name" content={pageTitle}></meta>
      <meta name="rights" content={rights}></meta>
      <meta name="copyright" content={siteMetadata.author}></meta>
      <meta name="description" content={pageDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta
        name="twitter:creator"
        content={pageTwitter || siteMetadata.author}
      />
      <link rel="alternate" href={siteUrl} hrefLang="x-default" />
      <link rel="canonical" href={canonicalUrl} />
      {languages.map(lng => (
        <link
          rel="alternate"
          key={lng}
          href={createUrlWithLang(lng)}
          hrefLang={lng}
        />
      ))}
      <meta
        name="twitter:image"
        content={`${siteUrl}/${removeBackSlashStart(image)}`}
      />
      {pagePublished && (
        <meta name="article:published_time" content={pagePublished} />
      )}
      {updated && <meta name="article:modified_time" content={updated} />}
      {pageCategory && <meta name="article:section" content={pageCategory} />}
      {pageTags && <meta name="article:tag" content={pageTags} />}
      <meta property="og:title" content={pageTitle} />
      <meta
        property="og:type"
        content={contentType ? pageContentType : "website"}
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:author" content={pageAuthor} />
      <meta
        property="og:image"
        content={`${NoSecuresiteUrl}/${removeBackSlashStart(image)}`}
      />
      <meta property="og:image:type" content={imageType} />
      <meta
        property="og:image:secure_url"
        content={`${siteUrl}/${removeBackSlashStart(image)}`}
      />

      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content={pageTitle} />
      <meta
        property="og:locale"
        content={language === "da" ? "da_DK" : "en_GB"}
      />
      <meta itemProp="name" content={pageTitle} />
      <meta itemProp="description" content={pageDescription} />
      <meta
        itemProp="image"
        content={`${siteUrl}/${removeBackSlashStart(image)}`}
      />
    </Helmet>
  )
}

export default SEO
