# System
Load any Javascript library over CDN and have it available to use in a sandbox.

```javascript
//enable logging from System
var debugMode = true;
//add library links
var libraryLinks = [
  "https://code.jquery.com/jquery-2.2.1.min.js"
];

var system = new System(libraryLinks, debugMode);

//starts system process and does callback when finished
system.booted(function() {
  console.log($);
});
```

Notice: System will not prevent library links from running nefarious code. Please use System with only trusted CDNs and even then use at your own risk.
