enyo.kind({
  name: "AnalyticsLogger",
  statics:{
    loggerKey: "692039f6-5516-49e0-816c-5a1b9df72ce9",
    loggerHost: "https://logs-01.loggly.com",
    loggerURL: "",
    apiURL: "http://mtuity.loggly.com/api/facets/json.",
    appName: "CIM_Mobile",
    platformInfo: {name:'unknown'},
    _analyticsLogger: null,
    initialize: function() {

      if ((typeof(_LTracker) != 'undefined') && _LTracker) {
        enyo.log('Analytics Initialized');
        AnalyticsLogger._analyticsLogger = _LTracker;
        AnalyticsLogger._analyticsLogger.push({'logglyKey': this.loggerKey });        
      } else {
        AnalyticsLogger._analyticsLogger = [];
        enyo.warn('analytics not available')
      }
    },
    _sendLogData: function(logData) {
        enyo.log('logging analytics:', logData);
        AnalyticsLogger._analyticsLogger.push(logData);
    },
    logAnalyticsData: function(logObj) {
      if (AnalyticsLogger._analyticsLogger) {
        var postData = {date: Date(), location: window.location.href, app: AnalyticsLogger.appName};
        // enyo.log('logging analytics (platformInfo):', AnalyticsLogger.platformInfo);
        // add the platform data
        enyo.mixin(postData,AnalyticsLogger.platformInfo);

        // add data that was passed in to the logging function
        enyo.mixin(postData,logObj);

        // add location
        postData.location = app.getCurrentLocation();
        this._sendLogData(postData);   
      } else {
        enyo.warn('unable to log analytics:'+ postData);
      }
    },
    getAnalyticsData: function(resource, context, callback) {
      var ajax = new enyo.Ajax({
        url: this.apiURL + resource +'/',
        cacheBust: false,
        headers: {
          "Authorization": this.authHeader()
        }
      });
      ajax.response(context, callback);
      ajax.cache
      ajax.error(this, "processError");
      ajax.go();
    },
    authHeader: function() {
      var tok = "devtuity" + ':' + "dev2MTUITY";
      var hash = window.btoa(tok);
      return "Basic " + hash;
    },
    processError: function(inSender, inResponse) {
      console.error("*** Loggly API ERROR ***");
      console.error(inResponse);
    },
  },
});
