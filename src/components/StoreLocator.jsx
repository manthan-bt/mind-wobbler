import React, { useEffect, useRef } from 'react';

/**
 * StoreLocator Component
 * Integrates Google Maps Store Locator Plus using the Extended Component Library.
 */
const StoreLocator = ({ apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE" }) => {
  const locatorRef = useRef(null);

  useEffect(() => {
    // Load the Extended Component Library script
    const scriptId = 'google-maps-extended-components';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js';
      script.type = 'module';
      document.head.appendChild(script);
    }

    const CONFIGURATION = {
      "locations": [
        {
          "title": "Mind Wobbler",
          "address1": "362/28, 2nd Floor, 11th cross, 8th main road, 2nd block Jayanagar",
          "address2": "Bengaluru, Karnataka, India",
          "coords": { "lat": 12.9382858, "lng": 77.582226 },
          "placeId": "ChIJJaa2mGrXta0ROVCSjqv-V2I"
        }
      ],
      "mapOptions": {
        "center": { "lat": 12.9382858, "lng": 77.582226 },
        "fullscreenControl": true,
        "mapTypeControl": false,
        "streetViewControl": false,
        "zoom": 15,
        "zoomControl": true,
        "maxZoom": 17,
        "mapId": ""
      },
      "mapsApiKey": apiKey,
      "capabilities": {
        "input": false,
        "autocomplete": false,
        "directions": false,
        "distanceMatrix": false,
        "details": false,
        "actions": false
      }
    };

    const configureLocator = async () => {
      // Wait for the custom element to be defined
      if (window.customElements) {
        await window.customElements.whenDefined('gmpx-store-locator');
        if (locatorRef.current) {
          locatorRef.current.configureFromQuickBuilder(CONFIGURATION);
        }
      }
    };

    configureLocator();
  }, [apiKey]);

  return (
    <div className="google-map-container w-full h-full min-h-[450px] relative">
      <style dangerouslySetInnerHTML={{ __html: `
        gmpx-store-locator {
          width: 100%;
          height: 100%;
          --gmpx-color-surface: #fff;
          --gmpx-color-on-surface: #000;
          --gmpx-color-on-surface-variant: #666;
          --gmpx-color-primary: #000;
          --gmpx-color-outline: #eee;
          --gmpx-fixed-panel-width-row-layout: 20em;
          --gmpx-fixed-panel-height-column-layout: 60%;
          --gmpx-font-family-base: "Montserrat", sans-serif;
          --gmpx-font-family-headings: "Montserrat", sans-serif;
          --gmpx-font-size-base: 0.85rem;
          --gmpx-hours-color-open: #188038;
          --gmpx-hours-color-closed: #d50000;
          --gmpx-rating-color: #ffb300;
          --gmpx-rating-color-empty: #e0e0e0;
        }
        /* Custom scrollbar for the locator panel */
        gmpx-store-locator::part(panel) {
          scrollbar-width: thin;
          scrollbar-color: #000 #fff;
        }
      `}} />
      <gmpx-api-loader key={apiKey} solution-channel="GMP_QB_locatorplus_v11_c"></gmpx-api-loader>
      <gmpx-store-locator ref={locatorRef}></gmpx-store-locator>
    </div>
  );
};

export default StoreLocator;
