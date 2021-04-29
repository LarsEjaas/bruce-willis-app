import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import { globalHistory as history } from "@reach/router"
import { useI18next } from "gatsby-plugin-react-i18next"

const removeBackSlashEnd = (path: string) => {
  if (path === undefined) return
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path
}

const removeBackSlashStart = (path: string) => {
  if (path === undefined) return
  return path.startsWith("/") ? path.slice(1, path.length) : path
}

const httpsTohttp = (path: string) => {
  if (path === undefined) return
  return path.replace(/^https:\/\//i, "http://")
}

const getImageType = (path: string) => {
  if (path === undefined) return
  let regexp = /jpeg|png?/gi
  return path.match(regexp)
}

const SEO = props => {
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

  const { language } = useI18next()
  const siteMetadata = data.site.siteMetadata
  const siteUrl = removeBackSlashEnd(siteMetadata.siteUrl)
  const NoSecuresiteUrl = httpsTohttp(siteUrl)
  const children = props.childen
  const title = props.title || `${siteMetadata.title}`
  const description = props.description || `${siteMetadata.description}`
  const contentType = props.contentType || "article"
  const published = props.published || new Date().toISOString()
  const updated = new Date().toISOString()
  const category = props.category
  const tags = props.tags
  const twitter = props.twitter
  const author = props.author || `${siteMetadata.author}`
  const rights = siteMetadata[`right_${language}`]
  const imageType = `image/${getImageType(props.image)}` || `image/png`
  const imageWidth = "1200"
  const imageHeight = "630"
  const createUrlWithLang = lng => {
    const url = `${siteUrl}${location.pathname}`
    return url.endsWith("/") ? url : `${url}/`
  }

  console.log(props)

  const canonicalUrl = `${siteUrl}${location.pathname}` //this CANNOT be overwritten from SEO props!!

  return (
    <Helmet htmlAttributes={{ lang: language }} title={title}>
      <link rel="preload" as="image" href="../286_Bruce_Willis.avif" />
      <link rel="preload" as="image" href="/572_Bruce_Willis.avif" />
      <link
        rel="preconnect"
        href="https://api.themoviedb.org"
        crossOrigin="true"
      />
      {children}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="language" content={language}></meta>
      <meta name="distribution" content="Global"></meta>
      <meta name="application-name" content={title}></meta>
      <meta name="rights" content={rights}></meta>
      <meta name="copyright" content={siteMetadata.author}></meta>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={twitter || siteMetadata.author} />
      <meta
        name="twitter:image"
        content={`${siteUrl}/${removeBackSlashStart(props.image)}`}
      />
      {published && <meta name="article:published_time" content={published} />}
      {updated && <meta name="article:modified_time" content={updated} />}
      {category && <meta name="article:section" content={category} />}
      {tags && <meta name="article:tag" content={tags} />}
      <meta
        property="og:title"
        content={props.title ? `${title}` : `${siteMetadata.title}`}
      />
      <meta
        property="og:type"
        content={contentType ? contentType : "website"}
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:author" content={author} />
      <meta
        property="og:image"
        content={`${NoSecuresiteUrl}/${removeBackSlashStart(props.image)}`}
      />
      <meta property="og:image:type" content={imageType} />
      <meta
        property="og:image:secure_url"
        content={`${siteUrl}/${removeBackSlashStart(props.image)}`}
      />

      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={`${title}`} />
      <meta itemProp="name" content={`${title}`} />
      <meta itemProp="description" content={description} />
      <meta
        itemProp="image"
        content={`${siteUrl}/${removeBackSlashStart(props.image)}`}
      />

      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "mainEntityOfPage": {
          "@type": "${contentType}",
          "@id": "${canonicalUrl}"
        },
          "headline": "${title}",
          "image": "${`${siteUrl}/${removeBackSlashStart(props.image)}`}",
          "datePublished": "${published}",
          "dateModified": "${updated}",
          "author": {
            "@type": "Person",
            "name": "${author ? author : `${siteMetadata.author}`}"
          },
          "publisher": {
            "@type": "Person",
            "name": "${siteMetadata.author}",
            "logo": {
              "@type": "ImageObject",
              "url": "${siteUrl}/icons/icon-512x512.png?v=4db9887fdc702424d8fa53e12b3563e0"},
              "description": "${description
                .replace(/"/g, '\\"')
                .replace(/(\r\n|\n|\r)/gm, "")}"
            }
          }, 
        }
        `}
      </script>
    </Helmet>
  )
}

export default SEO
