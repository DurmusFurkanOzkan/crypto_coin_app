const buttonSection = document.querySelector(".bottom__section");

setTimeout(() => {
    buttonSection.innerHTML=`<section class="bottom__section position-absolute">
    <input type="text" class="bottom__section--input" placeholder="Search for a coin">
    <button class="btn btn-danger ms-3 bottom__section--button">SEARCH</button>
    </section>`
}, 1000);