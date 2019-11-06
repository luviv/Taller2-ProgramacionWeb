function handleLoad() {
    var btn = document.querySelectorAll('.productsbuy__btn');

    btn.forEach(button => {
            button.addEventListener("click", function(){
            console.log(button.getAttribute("data-id"));

            var data = new URLSearchParams();
            data.append('productId', button.getAttribute("data-id"));

            var promise = fetch('/api/cart', {
                method: 'POST',
                body: data
            });

            promise.then((raw) => {
                return raw.json();
            }).then((info) => {
                displayCar();
            });
        });
    });
}

window.addEventListener('load', handleLoad);