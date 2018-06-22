var system = new System([
    "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"
]);

system.booted(() => {
    var app = new Vue({
        el: '#app',
        data: {
            message: 'System got Vue running async!'
        }
    })
});