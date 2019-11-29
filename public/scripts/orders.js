function handleLoad() {
    var form = document.querySelector('.form__checkout')

    form.addEventListener("submit", function() {
        var promise = fetch('/api/orders', { method: 'POST' });
        promise.then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        });
    });
}

window.addEventListener('load', handleLoad);