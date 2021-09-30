const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let car = [];
let menu = {};
let total = 0;

fetch(url).then(response => response.json())
  .then(data => {
    data.forEach(element => {
      menu[element.name] = element.products;
    });

    let navBar = document.getElementsByClassName("navbar-nav")[0];
    for( i= 0; i<data.length; i++) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.classList.add("nav-link");
      a.innerHTML = data[i].name;
      a.addEventListener("click",()=>{
        selectCategoria(a.innerHTML,data);
      });
      a.style.paddingRight = "2em";
      li.appendChild(a);
      navBar.appendChild(li);
    }
    selectCategoria(data[0].name,data);

    let carro_img = document.querySelectorAll("img.carro")[0];
    carro_img.addEventListener("click",()=>click_car());

    let button_cancel = document.getElementById("btn-modal-cancel");
    button_cancel.addEventListener("click",()=>click_cancel());

    let button_confirm = document.getElementById("btn_confirm");
    button_confirm.addEventListener("click",()=>click_confirm());
  });


function selectCategoria(categoriaName,data) {
  click_section();
  clear_categoria();


  let categoria = data.find( p=>{
    return p.name==categoriaName;
  });

  let titulo = document.getElementById("category");
  titulo.innerHTML = categoriaName;



  let row = document.getElementById("products");
  let productos = categoria.products;
  for(i=0;i<productos.length;i++) {
    let col = document.createElement("div");
    col.setAttribute("class", "col-lg-3 col-md-6 col-s-12 products");
    
    let card = document.createElement("div");
    card.setAttribute("class", "card h-100");
    
    let image = document.createElement("img");
    image.setAttribute("class", "img-fluid card-img-top");
    image.setAttribute("src", productos[i].image);    
    
    let body_card = document.createElement("div");
    body_card.setAttribute("class", "card-body");

    let nombre = document.createElement("h4");
    nombre.setAttribute("class", "card-title");
    nombre.textContent = productos[i].name;
    body_card.appendChild(nombre);

    let description = document.createElement("p");
    description.setAttribute("class", "card-text");
    description.textContent = productos[i].description;
    body_card.appendChild(description);


    let price = document.createElement("h5");
    price.textContent = "$" + productos[i].price;
    body_card.appendChild(price);

    let button = document.createElement("a");
    button.setAttribute("class", "btn btn-dark");
    button.setAttribute("id",productos[i].name);
    button.addEventListener("click",()=>{
      add_product(button.id,categoriaName);
    });
    button.innerHTML = "Add to car";
    body_card.appendChild(button);

    card.appendChild(image);
    card.appendChild(body_card);
    
    col.appendChild(card);
    row.appendChild(col);
  }

}


function clear_categoria() {
  const category = document.getElementById("products");
  while (category.firstChild) {
    category.removeChild(category.firstChild);
  }
}

function add_product(name,category) {
  let product = car.find((p) => {
    return p.name==name;
  });
  if (product!=undefined) {
    product.qty += 1;
    product.amount += product.price;
    car.map((p)=>{
      if(p.name==product.name) {p = product;}
    });
    total += product.price;
  }else{
    let add = menu[category].find((p)=> {
      return p.name == name;
    });
    product = {
      name: add.name,
      qty: 1,
      description: add.description,
      price: add.price,
      amount: add.price,
    };
    car.push(product);
    total += product.price;
    let item = document.getElementById("numeroCarro");
    item.innerHTML = car.length;
  }

}

function click_section() {
  let products = document.getElementById("section_products");
  products.style.display = "block";

  let compras = document.getElementById("compras");
  compras.style.display = "none";
}

function click_car() {
  let products = document.getElementById("section_products");
  products.style.display = "none";

  let compras = document.getElementById("compras");
  compras.style.display = "block";

  update_compras();
}

function update_compras() {
  clear_car();
  let body = document.getElementById("body_compras");
  for (let i = 0; i < car.length; i++) {
    let row = document.createElement("th");
    row.setAttribute("scope", "row");
    row.innerHTML = i + 1;

    let qty = document.createElement("td");
    qty.innerHTML = car[i].qty;

    let desc = document.createElement("td");
    desc.innerHTML = car[i].name;

    let price = document.createElement("td");
    price.innerHTML = car[i].price;

    let amo = document.createElement("td");
    amo.innerHTML = car[i].amount.toFixed(2);

    let mod = document.createElement("td");
    let div = document.createElement("div");
    div.setAttribute("id","div-btn");
    let button1 = document.createElement("button");
    button1.setAttribute("class","btn btn-secondary");
    button1.setAttribute("id", car[i].name); 
    button1.innerHTML = " + ";
    button1.addEventListener("click",()=>{
      let product = car.find(p=>p.name == button1.id);
      product.qty += 1 ;
      product.amount += product.price;
      total += product.price;
      update_compras();
    });
    
    let button2 = document.createElement("button");
    button2.setAttribute("class","btn btn-secondary");
    button2.setAttribute("id", car[i].name); 
    button2.innerHTML = " - ";
    button2.addEventListener("click",()=>{
      let product = car.find(p=>p.name == button2.id);
      product.qty -= 1 ;
      product.amount -= product.price;
      total -= product.price;
      if(product.qty ==0) {
        car = car.filter(p=>p.name != button2.id);
      }
      update_compras();
    });
    
    
    div.appendChild(button1);
    div.appendChild(button2);
    mod.appendChild(div);

    let tr = document.createElement("tr");

    tr.appendChild(row);
    tr.appendChild(qty);
    tr.appendChild(desc);
    tr.appendChild(price);
    tr.appendChild(amo);
    tr.appendChild(mod);

    body.appendChild(tr);
  }

  let tot = document.getElementById("total_compras");
  tot.innerHTML = total.toFixed(2);
}


function clear_car() {
  let body = document.getElementById("body_compras");
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
}



function click_cancel() {
  car = [];
  total=0;
  clear_car();
  update_compras();
}

function click_confirm() {
  let orden = [];
  for(i=0;i<car.length;i++) {
    product = {
      item: i+1,
      qty: car[i].qty,
      description: car[i].name,
      unitPrice: car[i].price,
    };
    orden.push(product);
  }
  console.log(orden);
}