class Product{
  constructor(name, info, imgUrl, price){
      this.name = name;
      this.info = info;
      this.imgUrl = imgUrl;
      this.price = price;
  }
}

const productsList = [
  new Product("Rice Ball", "You can taste the flavor of salmon and kelp in this rice ball.", "rice-ball", 1.25),
  new Product("Croissant", "It's a very crispy croissant with a lot of puff pastry, and it smells a good taste of butter.", "bread", 2.95),
  new Product("Shrimp Pasta", "Pasta in oil sauce with a delicious taste of shrimp", "shrimp-pasta", 9.99),
  new Product("Fried-Chicken", "Crunchy, juicy, and crispy fried chiken topped with chilli sause.", "fried-chicken", 7.95),
  new Product("Salad", "This salad is made with basil sauce and cream cheese.", "salad", 3.49),
  new Product("Sandwich", "A ham, lettuce, and egg sandwich in an easy-to-eat size.", "sandwich", 3.99),
  new Product("Coffee", "100% of rare specialty grade beans are used.", "coffee", 2.45),
  new Product("Sushi", "Salmon, prawns, squid, eggs, and other popular ingredients are combined with engawa.", "sushi", 8.65),
  new Product("Ice cream", "A chocolate vanilla bar with vanilla ice cream coated with chocolate.", "ice-cream", 1.5),
]

const target = document.getElementById("target");
target.classList.add("container", "bg-gray", "p-4", "m-5", "vh-75", "w-50");

// ---------- Base HTML structure ----------
target.innerHTML = 
`
<div class="d-flex justify-content-center align-items-center">
  <div id="leftBox">
      
  </div>
  <div id="rightBox">     
      <div id="rightBox_Num" class="col-12 d-flex justify-content-center align-items-center vh-10 bg-light" >
          <div id="productNum" class="col-4 d-flex justify-content-center align-items-center bg-danger text-light font-weight-bold display-4">
          </div>
          <div class="col-8">
              <div>
                  <div id="rightBox_product" class="h-30 d-flex justify-content-center align-items-center font-weight-bold display-6"></div>
                  <div id="rightBox_price" class="h-30 d-flex justify-content-center align-items-center text-primary font-weight-bold display-5 pt-3"></div>
              </div>
          </div>
      </div>
      <div id="btnBox">
      </div>       
  </div>
</div>
<div id="buyBtn">
</div>
<div id="infoBox">
</div>
`

// Get Element By Id
let leftBox = document.getElementById("leftBox");
let rightBox = document.getElementById("rightBox");
let btnBox = document.getElementById("btnBox");
let buyBtn = document.getElementById("buyBtn");
let infoBox = document.getElementById("infoBox");


// ---------- leftBox ----------
leftBox.classList.add("col-8", "vh-41", "bg-light", "d-flex", "flex-column", "justify-content-center", "align-items-center");
let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");

sliderShow.id = "sliderShow";
sliderShow.classList.add("col-12","d-flex","justify-content-center","align-items-center");
main.id = "main";
main.classList.add("main","full-width","d-flex","justify-content-center","align-items-center");
extra.id = "extra";
extra.classList.add("extra","full-width","d-flex","justify-content-center","align-items-center");

sliderShow.append(main);
sliderShow.append(extra);
leftBox.append(sliderShow);

main.setAttribute("data-index", "0");

// 初期状態のセット
main.append(createImage(0));
document.getElementById("productNum").innerHTML = "1";
document.getElementById("rightBox_product").innerHTML = productsList[0].name;
document.getElementById("rightBox_price").innerHTML = "$ " + productsList[0].price;


// ---------- rightBox ----------
rightBox.classList.add("col-4", "justify-content-center", "align-items-center");


// ---------- btnBox ----------
btnBox.classList.add("col-12", "vh-30", "bg-light", "mt-2", "d-flex", "justify-content-center", "align-items-center", "flex-wrap", "p-5");
btnBox.innerHTML = "";
  for (let i = 1; i <= productsList.length; i++){
      btnBox.innerHTML +=`
      <div>
          <button class="btn btn-primary m-2" onclick="showInfo()">${i}</button>
      </div>
      `
  }       

let buttons = document.querySelectorAll(".btn");
for (let i = 0; i < buttons.length; i++){
  buttons[i].addEventListener("click", function(){
      // console.log(buttons);
      slideJump(parseInt(buttons[i].innerHTML), "dummy");
      document.getElementById("productNum").innerHTML = buttons[i].innerHTML;
      document.getElementById("rightBox_product").innerHTML = productsList[i].name;
      document.getElementById("rightBox_price").innerHTML = "$ " + productsList[i].price;
  })
}


// ---------- buyBtn ----------
buyBtn.classList.add("col-7", "text-center", "vh-10", "mt-5");
  buyBtn.innerHTML=
  `
      <button class="btn btn-danger text-center w-75" onclick="buy()">Buy</button>
  `

function buy(){
  let selectItem = main.getAttribute("data-index");
  alert("You bought " + productsList[selectItem].name + " [" + productsList[selectItem].price + "]" + ".  Thank you!");
}

// ---------- infoBox ----------
infoBox.innerHTML=`
  <div class="container bg-light my-2">
      <div id="productInfo" class="box-bottom pt-2">
          
      </div>
  </div>
`

function showInfo(){
  btnBox.addEventListener("click", function(){
      let selectItem = main.getAttribute("data-index");
      let productInfo = document.getElementById("productInfo");
      productInfo.innerHTML =
      `
      <p>${productsList[selectItem].info}</p>
      `
  })
}


// ---------- Slider Functions ----------

function createImage(number){
  let imgBox = document.createElement("img");
  imgBox.classList.add("h-100", "slider-item", "justify-content-center");
  imgBox.src = `assets/${productsList[number].imgUrl}.jpg`;
  imgBox.style = "object-fit: cover";
  return imgBox;
}

// ボタンがクリックされると、次の要素にアクセスするために数字を受け取り、次の要素を設定する slideJump関数
function slideJump(selectedBtn, animationType){
  let main = document.getElementById("main");
  let index = parseInt(main.getAttribute("data-index"));
  
  // innerHTML = 9 -> index = 8
  selectedBtn = selectedBtn-1;
          
  if (selectedBtn > index){
      animationType = "right";
      let currentItem = index;
      let nextItem = selectedBtn;

      let currentElement = createImage(currentItem);
      let nextElement = createImage(nextItem);
      main.setAttribute("data-index", nextItem.toString());
      animateMain(currentElement, nextElement, animationType);
  } else if (selectedBtn < index){
      animationType = "left";
      let nextItem = selectedBtn;
      let currentItem = index;
      
      let currentElement = createImage(currentItem);
      let nextElement = createImage(nextItem);

      main.setAttribute("data-index", nextItem.toString());
      animateMain(currentElement, nextElement, animationType);
  }
}

// 現在の要素、次の要素、right か left を受け取って、スライダーを実現する animateMain関数
function animateMain(currentElement, nextElement, animationType){
  let sliderShow = document.getElementById("sliderShow");
  let main = document.getElementById("main");
  let extra = document.getElementById("extra");
  
  // extraに今の要素を入れます。
  extra.innerHTML = "";
  extra.append(currentElement);
  // mainに次の要素を入れます。
  main.innerHTML = "";
  main.append(nextElement);
  // mainが出てくるようにexpandのanimationをつけます。
  main.classList.add("expand-animation");
  extra.classList.add("deplete-animation");

  if (animationType === "right"){
      sliderShow.innerHTML = "";
      // 次のmainを後に入れ、extraが消えてmainが登場するアニメーション
      sliderShow.append(extra);
      sliderShow.append(main);
  } else if (animationType === "left") {
      sliderShow.innerHTML = "";
      sliderShow.append(main);
      sliderShow.append(extra);
  }
}