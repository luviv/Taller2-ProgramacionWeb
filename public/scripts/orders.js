    var form = document.querySelector(".form__checkout");

    form.addEventListener('submit',function(event){
    event.preventDefault();
        var formInfo= new FormData(form);
        var data= new URLSearchParams(formInfo);

        var promise = fetch('/api/orders', {
            method : 'POST',
            body : data
        });

        promise.then((raw) => {
            return raw.json();
        }).then((info) => {
            form.reset();
            console.log(info);
        });
});