function handleLoad() {
    var btn = document.querySelectorAll('.productsbuy__btn');

    btn.forEach(button => {
            button.addEventListener("click", function(){
            console.log(button.getAttribute("data-id"));
        });
    });
}

window.addEventListener('load', handleLoad);