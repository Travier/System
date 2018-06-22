# System
Load any Javascript library over CDN and have it available to use in a sandbox.

```javascript
//enable logging from System
var debugMode = true;
//construct new system class with library links
var system = new System([
  'https://code.jquery.com/jquery-2.2.1.min.js',
]);

//starts system process and does callback when finished
system.booted(function() {
  console.log($);
});
```
