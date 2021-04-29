import * as React from "react"

const config = require("../gatsby-config.js")

interface HtmlProps {
  body: any
  postBodyComponents: any
  headComponents: any
}

export default (props: HtmlProps) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {props.headComponents}
        <style
          dangerouslySetInnerHTML={{
            __html: `html{background-color: #080705}`,
          }}
        ></style>
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}
