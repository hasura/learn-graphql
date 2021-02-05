document.addEventListener("DOMContentLoaded", function() {
    var app = Elm.Main.init({node: document.getElementById('app')})

    app.ports.storeToken.subscribe(function(token) {
        localStorage.setItem('token', token)
    })
    app.ports.removeTokenFromStarage.subscribe(function() {
        localStorage.removeItem('token')
    })
    var token = localStorage.getItem('token')
    if ( token ) {
        app.ports.gotStoredToken.send(token)
    }
})