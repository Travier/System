/**
 * Constructor for System class
 * @param [string] libraryLinks 
 * @param boolean debugMode - enable logging or nah
 */
function System(libraryLinks, debugMode = false) {
    this.ready = false;
    this.debugMode = debugMode;
    this.loadedLinks = [];
    this.libraryLinks = libraryLinks;
    this.callbacks = [];

    _throwPromiseError();
}

System.prototype.booted = function(callback) {
    //starts event loop of system
    if(!this.ready) {
        this.callbacks.push(callback);
        this.doMountLoop();
    }
}

//loop mounting library links until finished
System.prototype.doMountLoop = function() {
    if(this.libraryLinks <= 0) {
        //nothing left todo...
        this.finishedMountLoop();
        return true;
    }

    //get next library link
    var link = this.libraryLinks.shift();
    this.log("Loading " + link);

    var resolver = new Promise((resolve, reject) => {
        this.mountLibraryLink(link, () => {
            this.log("Successfully mounted link!");
            resolve('success');
        });
    })

    resolver.then(() => {
        this.doMountLoop();
    });
}

//called when mount loop is finished
System.prototype.finishedMountLoop = function() {
    this.log("System is ready!");
    this.ready = true;

    //call callbacks
    this.callbacks.forEach((callback) => {
        callback();
    })
}

/**
 * Mount a script to the dom
 * @param string link 
 * @param function callback 
 */
System.prototype.mountLibraryLink = function(link, callback) {
    //get page head element
    var head = document.getElementsByTagName('head')[0];
    //make script element
    var script = document.createElement('script');
    script.type = 'text/javascript';
    //add our library link
    script.src = link;

    //on ready do callback
    script.onreadystatechange = callback;
    script.onload = callback;

    //append to dom
    head.appendChild(script);
}

//debug logging
System.prototype.log = function(message) {
    if(this.debugMode)
        console.log(message);
}

//private functions
function _throwPromiseError() {
    if(typeof Promise == "undefined" && Promise.toString().indexOf("[native code]") == -1) {
        throw new Error('Promises not available for this Browser. System can not run.');
    }

    return false;
}