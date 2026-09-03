import websiteIcon from '../assets/img/website-icon.png';
import config from '../../config.mjs';

export function GET() {
  return new Response(
    JSON.stringify({
      name: config.manifestName,
      short_name: config.manifestShortName,
      start_url: config.pathPrefix || config.manifestStartUrl,
      background_color: config.manifestBackgroundColor,
      theme_color: config.manifestThemeColor,
      display: config.manifestDisplay,
      icons: [
        {
          src: websiteIcon.src,
          sizes: `${websiteIcon.width}x${websiteIcon.height}`,
          type: 'image/png',
        },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
}
