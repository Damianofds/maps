# Roma Maps

Static GitHub Pages clients for two maps:

- `roma-ztl/`
- `roma-innovazione/`

## GitHub Pages

The site is plain HTML and can be published from GitHub Pages. The included workflow publishes the repository root.

## GeoServer dependency

The clients still depend on GeoServer for WMS/WFS map data. Because GitHub Pages is HTTPS-only, `assets/config.js` must point to an HTTPS GeoServer endpoint with CORS enabled:

```js
window.MAPS_CONFIG.geoserverBase = "https://maps.example.com/geoserver";
```

The current local GeoServer endpoint is HTTP-only, which browser mixed-content rules will block from GitHub Pages.
