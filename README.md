# System
Load any Javascript library over CDN and have it available to use in a sandbox.

```javascript
var system = new System([
  'https://code.jquery.com/jquery-2.2.1.min.js',
]);

system.ready(function() {
  console.log($);
});
```
