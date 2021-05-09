import "react";

declare module 'react' {
    export interface IframeHTMLAttributes<T> {
      controls?: 0 | 1
      fs?: 0 | 1
      hl?: string
      cc_lang_pref?: string
      iv_load_policy?: 1 | 3
      modestbranding?: 1
      allowfullscreen?: true
      frameborder?: string
      rel?: 0 | 1
      disablekb?: 0 | 1
      widget_referrer?: string
    }
}
  