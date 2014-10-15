enyo.kind({
    name: "AppConfig",
    statics: {
        baseURL: "/", // should be used everywhere in the app
        prodURL: "/",
        // debugURL: "https://localhost/",
        // debugURL: "https://173.36.245.244/",
        debugURL: "https://cim.cisco.com/",
        currentLocation: true,
        secureid: "iotwf2014",
        ssid: "@City Wi-Fi IoT", //  As per Jason O Brien's suggestion (:))
        notificationTypes: ["offer", "event", "location"], // _lowercase_ values for notifications - notifications ("offers") with these types will generate a location based message
        notificationRange: 100 * 0.000189394, // distance to trigger a notification when the app reaches a location in miles, 100 ft in this case
        kioskRange: 50 * 0.000189394, // distance to trigger a icon update when a kiosk is nearby in miles, 50 ft in this case
        finalTourStopRange: 50 * 0.000189394, // distance to trigger a icon update when a kiosk is nearby in miles, 50 ft in this case
        simulateOtherLocation: false, // set to true to use hyatt location (doesn't update/not working)
        kioskQueryRange: "500ft", // distance passed to find nearby kiosks format defined by MQ API
        allKiosksRange: "5280ft", // distance for all kiosks to check so that we don't have to make API requests all the time (they don't move so might as well get them all)
        locationUpdateInterval: 5 * 1000, // 4 seconds
        dataLoadInterval: 20 * 1000
    },
    create: function() {
        this.inherited(arguments);
        if (!window.location.hostname || window.location.hostname.indexOf("localhost") >= 0) {
            AppConfig.baseURL = AppConfig.debugURL;
        }
    }
});
