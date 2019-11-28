function handleLoad() {
    var btn = document.querySelectorAll('.productsbuy__btn');
    var cartSize = document.querySelector('.countsize');

    btn.forEach(button => {
            button.addEventListener("click", function(event){
                event.preventDefault();

            var id= button.getAttribute("data-id");
            console.log("holiii");

            var data = new URLSearchParams();
            data.append('productId', button.getAttribute("data-id"));

            var promise = fetch('/api/cart/' + id, { method: 'POST' });
            promise.then(function(response) {
                console.log(response);
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                cartSize.innerHTML = data.cartSize;
            });


        });
    });
}

window.addEventListener('load', handleLoad);