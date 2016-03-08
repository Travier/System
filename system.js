var System = function(){};
(function() {
if(typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1){
}else{
    throw new Error('Promises not available on this client');
    return false;
}
System = function(libs) {
    var self = this;

    /* private props */
    self.libsQueue = libs;
    self.loadedLibs = [];
    self.readyScripts = [];
    self.bootstrapped = false;

    self.ready = function(cb) {
        if(self.bootstrapped) {
            cb();

            return true;
        }

        self.readyScripts.push(cb);
        return true;
    }

    /* private methods */
    self.finishBoot = function() {
        self.bootstrapped = true;
        self.readyScripts.forEach(function(cb) {
            cb();
        });
    }
    //takes lib off top of libsQueue at resolves it
    self.bootChunk = function() {
        if(self.libsQueue.length <= 0) {
            self.finishBoot();
            return true;
        }

        var lib = self.libsQueue.shift();
        console.log('resolving:' + lib);
        var resolver = new Promise(function(resolve, reject) {
            self.resolveLib(lib, function() {
                self.loadedLibs.push(lib);
                console.log('resolved:' + lib);
                resolve('success');
            });
        });

        resolver.then(function() {
            self.bootChunk();
        })

    }

    self.resolveLib = function(lib, cb) {
       var url = lib;
       var head = document.getElementsByTagName('head')[0];
       var script = document.createElement('script');
       script.type = 'text/javascript';
       script.src = url;

       script.onreadystatechange = cb;
       script.onload = cb;

       head.appendChild(script);
    }

    //start boot process
    self.bootChunk();

    return self;
}
})();
