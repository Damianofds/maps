# Mappe Roma

Client statici GitHub Pages per due mappe:

- `roma-ztl/`
- `roma-innovazione/`

## GitHub Pages

Il sito e HTML semplice e puo essere pubblicato con GitHub Pages servendo la root del repository dal branch `main`.

## Dipendenza GeoServer

I client dipendono ancora da GeoServer per i dati mappa WMS/WFS. Poiche GitHub Pages usa HTTPS, `assets/config.js` deve puntare a un endpoint GeoServer HTTPS con CORS abilitato:

```js
window.MAPS_CONFIG.geoserverBase = "https://maps.example.com/geoserver";
```

Un endpoint GeoServer solo HTTP verrebbe bloccato da GitHub Pages per le regole browser sul mixed content.
