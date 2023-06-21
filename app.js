let buttonSection = document.querySelector(".bottom__section__top");
const cardsArr = [];

setTimeout(() => {
    buttonSection.innerHTML=`<section class="bottom__section position-relative">
    <form>
    <input type="text" class="bottom__section--input" placeholder="Search for a coin">
    <button type="submit" class="btn btn-danger ms-3 bottom__section--button">SEARCH</button>
    </form>
    </section>`

    changed(buttonSection);
}, 1000);


const changed = (btnSection) =>{

    const buttonSectionBtn = document.querySelector(".bottom__section--button");
    const form = document.querySelector("form");
   
    console.log(buttonSectionBtn)
    form.addEventListener("submit" , (e) =>{
      e.preventDefault();  
      if(!e.target.children[0].value){
        callErrorFunc();
      }
      else{
        getData(e.target.children[0].value);
      }
      
      form.reset();
    })
}


const getData =  async (value)=>{
  
  const url = "coinranking20048bead1a991367d8941d8562d2d6677b6114f16a9fd85"
  
  const options = {
    headers: {
      'x-access-token': url
    },
  };
  
    
  try {
    const response = await fetch(`https://api.coinranking.com/v2/coins?search=${value}&limit=1`, options)
    .then((response) => {
  
      return response.json();
  
    }
   
    )
    .then((result) => {
      getCard(result.data.coins[0]);
      console.log(result.data.coins[0])
    }
  );
  } catch (error) {
    callErrorFunc();
  }


}

const getCard = (coinInfo) =>{
  const cardsPly = document.querySelector(".cards");
  const {name,symbol,price,iconUrl,change} = coinInfo ;

  if(cardsArr.length && cardsArr.filter(card => card==name).length){
    callErrorFunc();
  }
  else{
    cardsArr.push(name);
    cardsPly.innerHTML=`
  <div class="col order-first">
  <div class="card rounded-5" >
 
  <div class="card-body">
    <div class="card-body-div">
    <h5 class="card-title text-start" >${coinInfo.name}</h5>
    <p class="bottom-p">${symbol}</p>
    </div>
    <h5 class="card-title text-start" >${Number(price).toFixed(4)}</h5>
    <img class="card-img-top d-block" src="${iconUrl}" alt="Card image cap">
    <i class="fa-solid fa-chart-line"></i>
    <p class="d-inline" style="color:${change > 0 ? "green" : "red"}; font-weight:bold">${coinInfo.change}%</p>
   
  </div>
</div>
</div>`+cardsPly.innerHTML;
  }
  

}

const callErrorFunc = ()=>{
  const form = document.querySelector("form");
  const nullInfo = document.createElement("p");
  nullInfo.textContent="Please enter a valid coin";
  nullInfo.style.color="red";
  nullInfo.style.color="red";
  nullInfo.style.position="absolute"
  if(!form.nextElementSibling){
    form.after(nullInfo);
  }
  setTimeout(() => {
    nullInfo.remove();
  }, 2000);
}