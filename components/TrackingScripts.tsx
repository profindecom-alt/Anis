'use client';

import Script from 'next/script';
import type { TrackingSettings } from '@/lib/settings';

/**
 * Scripts de mesure d'audience (Google Tag Manager / GA4, Hotjar, Microsoft
 * Clarity), chargés via next/script. Ce composant ne doit être monté QU'APRÈS
 * le consentement aux cookies (voir ConsentManager) ; chaque outil n'est chargé
 * que si son identifiant est renseigné dans Sanity (Paramètres du site).
 *
 * Les domaines de ces scripts doivent être autorisés par la CSP
 * (voir next.config.mjs).
 */
export default function TrackingScripts({
  gtmId,
  ga4Id,
  hotjarId,
  clarityId,
}: TrackingSettings) {
  return (
    <>
      {/* Google Tag Manager */}
      {gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {/* Google Analytics 4 (gtag.js) */}
      {ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${ga4Id}');`}
          </Script>
        </>
      )}

      {/* Hotjar */}
      {hotjarId && (
        <Script id="hotjar" strategy="afterInteractive">
          {`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
h._hjSettings={hjid:${hotjarId},hjsv:6};a=o.getElementsByTagName('head')[0];
r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      )}

      {/* Microsoft Clarity */}
      {clarityId && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  );
}
