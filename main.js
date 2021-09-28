const url = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json';
fetch(url).then(response => response.json())
    .then(data => {
        
        let navBar = document.getElementsByClassName('navbar-nav')[0];
        for( i= 0; i<data.length; i++){
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.classList.add("nav-link");
            a.classList.add("active");
            a.innerHTML = data[i].name;
            a.addEventListener("click",()=>{
                let categoria = data.filter( p=>{
                    return p.name==a.innerHTML;
                })
                console.log(categoria[0]);
        
                let titulo = document.getElementById('category');
                titulo.innerHTML = a.innerHTML;
                selectCategoria(categoria[0]);
            });
            li.appendChild(a);
            navBar.appendChild(li);
        }
    });


function selectCategoria(categoria){
    let row = document.getElementById('contenido');
    let productos = categoria.products;
    for(i=0;i<productos.length;i++){
        let column = document.createElement('div');
        column.classList.add("col-3");
        let card = document.create
    }
    
}

