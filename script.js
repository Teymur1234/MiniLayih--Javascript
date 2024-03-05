const hamburgerMenu = document.getElementById("hamburger");
const nav = document.getElementById("nav1");
let click = false;

hamburgerMenu.addEventListener("click", () => {
    if (!click) {
        const div = document.createElement("div");
        div.innerHTML = `
      <ul class="menucontainer">
        <li><a class="menulink" href="">Home</a></li>
        <li><a class="menulink" href="">Shop</a></li>
        <li><a class="menulink" href="">Features</a></li>
        <li><a class="menulink" href="">Blog</a></li>
        <li><a class="menulink" href="">About</a></li>
        <li><a class="menulink" href="">Contact</a></li>
      </ul>
    `;
        div.style.backgroundColor="#717FE0"
        div.style.marginTop="70px"
        nav.appendChild(div);
        click = true;
    }
    else {
        const ul = nav.querySelectorAll("ul");
        ul[1].remove();
        click = false;
    }
});
const nav1=document.getElementById("nav")
function navScroll() {
    let next=window.pageYOffset
    if (next!==0) {
        nav1.style.backgroundColor="white"
    }
    else{
        nav1.style.backgroundColor="transparent"
    }
}
window.addEventListener("scroll",navScroll)
const slide=document.querySelectorAll(".slide")
const containerSlide=document.querySelector(".slide-container")
const slides=document.querySelector(".slides")
const nextSlide=document.getElementById("left-arrow")
const previousSlide=document.getElementById("right-arrow")
let currentIndex=0
let interval
function next() {
    if (currentIndex<slide.length-1) {
        currentIndex++
    }
    else{
        currentIndex=0
    }
    updateSlider()
}
function previous() {
    if (currentIndex>0) {
        currentIndex++
    }
    else{
        currentIndex=slide.length-1
    }
    updateSlider()
}
function updateSlider() {
    const transformvalue=-currentIndex*100 +"%"
    slides.style.transform=`translateX(${transformvalue})`
}
function startAutoPlay() {
    interval=setInterval(()=>{
        if (currentIndex<slide.length-1) {
            currentIndex++
        }
        else{
            currentIndex=0
        }
        updateSlider()
    },3000)
}
startAutoPlay()
nextSlide.addEventListener("click",()=>{
    if (currentIndex<slide.length-1) {
        currentIndex++
    }
    else{
        currentIndex=0
    }
    updateSlider()
})
previousSlide.addEventListener("click",previous)
const openBasket=document.getElementById("gotobasket")
const closeBasket=document.getElementById("close")
openBasket.addEventListener("click",()=>{
    document.getElementById("basket1").style.right="0"
})
closeBasket.addEventListener("click",()=>{
    document.getElementById("basket1").style.right="-400px"
})
const openWish=document.getElementById("gotowish")
const closeWish=document.getElementById("close1")
openWish.addEventListener("click",()=>{
    document.getElementById("wishlist").style.right="0"
})
closeWish.addEventListener("click",()=>{
    document.getElementById("wishlist").style.right="-1000px"
})

const url=`http://localhost:3001/products`
axios(url).then(data=>{
    const productItems=document.getElementById("cart-items")
    let say=0
    data.data.forEach(product => {
        const card=document.createElement("div")
        if (say<=10) {
            card.innerHTML=`
            <div class="card1" data-id="${product.id}">
            <div class="product-image">
            <img src=${product.image} alt="">
            <button class="go-to-product">Quick View</button>
            </div>
            <div class="info">
                <h3>${product.name}</h3>
                <i class="fa-regular fa-heart wish"></i>
             </div> 
             <p>$${product.price}</p>                   
             </div>
            </div>
            `
            productItems.appendChild(card)  
            const cardViewButtons=productItems.getElementsByClassName("go-to-product")
          
            const modal=document.createElement("div")
            cardViewButtons[say].addEventListener("click",(e)=>{
                e.preventDefault()
                modal.className="view-card"
                modal.innerHTML=``
                modal.innerHTML=`
            <div class="products-images">
                <img src=${product.image} alt="">
                <img src=${product.image} alt="">
                <img src=${product.image} alt="">
            </div>
            <div class="product-slider">
                <div class="product-slides">
                    <div class="product-slide"
                        style="background-image: url(${product.image});">
                    <div class="product-slide"
                        style="background-image: url(${product.image});">
                    </div>
                    <div class="product-slide"
                        style="background-image: url(${product.image});">
                    </div>
                </div>
            </div>
        </div>
            <div class="product-infos" data-id="${product.id}">
            <i class="fa-solid fa-x close-card"></i>
                    <h1>${product.image}</h1>
                    <h2>${product.name}</h2>
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <div class="buttons1"><button>-</button><span>1</span><button>+</button></div>
                    <button class="add-to-card">ADD TO CARD</button>
            </div>
                `
                document.body.appendChild(modal)
                const addToCardButton=document.getElementsByClassName("add-to-card")
                const closeButton=document.getElementsByClassName("close-card")
                closeButton[0].addEventListener("click",(e)=>{
                    e.preventDefault()
                    const parentElement=e.target.parentElement.parentElement
                    parentElement.remove()
                })
                addBasket(addToCardButton)
            })
            say++
        }
    
    });    
    const addToWishlist=productItems.querySelectorAll(".wish")
    addToWishlist.forEach(icon=>{
         icon.addEventListener("click",(e)=>{
         icon.classList.add="heart-active"
         const card=e.target.closest(".card1")
         const product={
    id:card.dataset.id,
    image:card.querySelector("img").src,
    title:card.querySelector("h3").innerText,
    price:parseFloat(card.querySelector("p").innerText.replace("$",'')),
    quantity: 1
}
addToWishlist1(product)   
})   
})
})
const moreButton=document.getElementById("more-products")
const lessButton=document.getElementById("less-products")
    moreButton.addEventListener("click",()=>{
        axios(url).then(data=>{
            const productItems=document.getElementById("cart-items")
            let say=0
            productItems.innerHTML=``
            data.data.forEach(product => {
               
                    const card=document.createElement("div")
                    card.innerHTML=`
                    <div class="card1" data-id="${product.id}">
                    <div class="product-image">
                    <img src=${product.image} alt="">
                    <button class="go-to-product">Quick View</button>
                    </div>
                    <div class="info">
                        <h3>${product.name}</h3>
                        <i class="fa-regular fa-heart wish"></i>
                     </div> 
                     <p>$${product.price}</p>                   
                     </div>
                    </div>
                    `
                    productItems.appendChild(card) 
                    const cardViewButtons=productItems.getElementsByClassName("go-to-product")
          
                    const modal=document.createElement("div")
                    cardViewButtons[say].addEventListener("click",(e)=>{
                        e.preventDefault()
                        modal.className="view-card"
                        modal.innerHTML=``
                        modal.innerHTML=`
                    <div class="products-images">
                        <img src=${product.image} alt="">
                        <img src=${product.image} alt="">
                        <img src=${product.image} alt="">
                    </div>
                    <div class="product-slider">
                        <div class="product-slides">
                            <div class="product-slide"
                                style="background-image: url(${product.image});">
                            <div class="product-slide"
                                style="background-image: url(${product.image});">
                            </div>
                            <div class="product-slide"
                                style="background-image: url(${product.image});">
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="product-infos" data-id="${product.id}">
                    <i class="fa-solid fa-x close-card"></i>
                            <h1>${product.image}</h1>
                            <h2>${product.name}</h2>
                            <h3>${product.name}</h3>
                            <p>$${product.price}</p>
                            <div class="buttons1"><button>-</button><span>1</span><button>+</button></div>
                            <button class="add-to-card">ADD TO CARD</button>
                    </div>
                        `
                        document.body.appendChild(modal)
                        const addToCardButton=document.getElementsByClassName("add-to-card")
                        const closeButton=document.getElementsByClassName("close-card")
                        closeButton[0].addEventListener("click",(e)=>{
                            e.preventDefault()
                            const parentElement=e.target.parentElement.parentElement
                            parentElement.remove()
                        })
                        addBasket(addToCardButton)
                    })   
                    say++
            }); 
            const addToWishlist=productItems.querySelectorAll(".wish")
            addToWishlist.forEach(icon=>{
                 icon.addEventListener("click",(e)=>{
                 icon.classList.add="heart-active"
                 const card=e.target.closest(".card1")
                 const product={
            id:card.dataset.id,
            image:card.querySelector("img").src,
            title:card.querySelector("h3").innerText,
            price:parseFloat(card.querySelector("p").innerText.replace("$",'')),
            quantity: 1
        }
       
        addToWishlist1(product)   
        })   
        })
        });    
    lessButton.style.display="block"
    moreButton.style.display="none"
})
    lessButton.addEventListener("click",()=>{
        axios(url).then(data=>{
            const productItems=document.getElementById("cart-items")
            productItems.innerHTML=``
            let say=0
            data.data.forEach(product => {
               
                if (say<=10) {
                    const card=document.createElement("div")
                    card.innerHTML=`
                    <div class="card1" data-id="${product.id}">
                    <div class="product-image">
                    <img src=${product.image} alt="">
                    <button class="go-to-product">Quick View</button>
                    </div>
                    <div class="info">
                        <h3>${product.name}</h3>
                        <i class="fa-regular fa-heart wish"></i>
                     </div> 
                     <p>$${product.price}</p>                   
                     </div>
                    </div>
                    `
                    productItems.appendChild(card)  
                    const cardViewButtons=productItems.getElementsByClassName("go-to-product")
          
                    const modal=document.createElement("div")
                    cardViewButtons[say].addEventListener("click",(e)=>{
                        e.preventDefault()
                        modal.className="view-card"
                        modal.innerHTML=``
                        modal.innerHTML=`
                    <div class="products-images">
                        <img src=${product.image} alt="">
                        <img src=${product.image} alt="">
                        <img src=${product.image} alt="">
                    </div>
                    <div class="product-slider">
                        <div class="product-slides">
                            <div class="product-slide"
                                style="background-image: url(${product.image});">
                            <div class="product-slide"
                                style="background-image: url(${product.image});">
                            </div>
                            <div class="product-slide"
                                style="background-image: url(${product.image});">
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="product-infos" data-id="${product.id}">
                    <i class="fa-solid fa-x close-card"></i>
                            <h1>${product.image}</h1>
                            <h2>${product.name}</h2>
                            <h3>${product.name}</h3>
                            <p>$${product.price}</p>
                            <div class="buttons1"><button>-</button><span>1</span><button>+</button></div>
                            <button class="add-to-card">ADD TO CARD</button>
                    </div>
                        `
                        document.body.appendChild(modal)
                        const addToCardButton=document.getElementsByClassName("add-to-card")
                        const closeButton=document.getElementsByClassName("close-card")
                        closeButton[0].addEventListener("click",(e)=>{
                            e.preventDefault()
                            const parentElement=e.target.parentElement.parentElement
                            parentElement.remove()
                        })
                        addBasket(addToCardButton)
                    })
                    say++
                }
                const addToWishlist=productItems.querySelectorAll(".wish")
                addToWishlist.forEach(icon=>{
                     icon.addEventListener("click",(e)=>{
                     icon.classList.add="heart-active"
                     const card=e.target.closest(".card1")
                     const product={
                id:card.dataset.id,
                image:card.querySelector("img").src,
                title:card.querySelector("h3").innerText,
                price:parseFloat(card.querySelector("p").innerText.replace("$",'')),
                quantity: 1
            }
           
            addToWishlist1(product)   
            })   
            })
            });               
        })
        lessButton.style.display="none"
        moreButton.style.display="block"
    })
    const active=document.getElementsByClassName("active")
    document.getElementById("all").addEventListener("click",(e)=>{  
        e.preventDefault()
        axios(url).then(data=>{
            const productItems=document.getElementById("cart-items")
            productItems.innerHTML=``
            let say=0
            data.data.forEach(product => {
               
                if (say<=10) {
                    const card=document.createElement("div")
                    card.innerHTML=`
                    <div class="card1" data-id="${product.id}">
                    <div class="product-image">
                    <img src=${product.image} alt="">
                    <button class="go-to-product">Quick View</button>
                    </div>
                    <div class="info">
                        <h3>${product.name}</h3>
                        <i class="fa-regular fa-heart wish"></i>
                     </div> 
                     <p>$${product.price}</p>                   
                     </div>
                    </div>
                    `
                    say++
                    productItems.appendChild(card)  
                }
            });    
            moreButton.style.display="block"
        })
    })
    document.getElementById("women").addEventListener("click",(e)=>{
        e.preventDefault()
        axios(url).then(data=>{
            const productItems=document.getElementById("cart-items")
            productItems.innerHTML=``
            data.data.forEach(product => {
                if (product.type==="women") {
                    const card=document.createElement("div")
                    card.innerHTML=`
                    <div class="card1" data-id="${product.id}">
                    <div class="product-image">
                    <img src=${product.image} alt="">
                    <button class="go-to-product">Quick View</button>
                    </div>
                    <div class="info">
                        <h3>${product.name}</h3>
                        <i class="fa-regular fa-heart wish"></i>
                     </div> 
                     <p>$${product.price}</p>                   
                     </div>
                    </div>
                    `
                    productItems.appendChild(card)  
                }
            });    
            moreButton.style.display="none"
        })
    })
    document.getElementById("men").addEventListener("click",(e)=>{
        e.preventDefault()
        axios(url).then(data=>{
            const productItems=document.getElementById("cart-items")
            productItems.innerHTML=``
            data.data.forEach(product => {
                if (product.type==="men") {
                    const card=document.createElement("div")
                    card.innerHTML=`
                    <div class="card1" data-id="${product.id}">
                    <div class="product-image">
                    <img src=${product.image} alt="">
                    <button class="go-to-product">Quick View</button>
                    </div>
                    <div class="info">
                        <h3>${product.name}</h3>
                        <i class="fa-regular fa-heart wish"></i>
                     </div> 
                     <p>$${product.price}</p>                   
                     </div>
                    </div>
                    `
                    productItems.appendChild(card)  
                }
            });    
            moreButton.style.display="none"
        })
    })
    document.getElementById("shoes").addEventListener("click",(e)=>{
        e.preventDefault()
        axios(url).then(data=>{
            const productItems=document.getElementById("cart-items")
            productItems.innerHTML=``
            data.data.forEach(product => {
                if (product.type==="shoes") {
                    const card=document.createElement("div")
                    card.innerHTML=`
                    <div class="card1" data-id="${product.id}">
                    <div class="product-image">
                    <img src=${product.image} alt="">
                    <button class="go-to-product">Quick View</button>
                    </div>
                    <div class="info">
                        <h3>${product.name}</h3>
                        <i class="fa-regular fa-heart wish"></i>
                     </div> 
                     <p>$${product.price}</p>                   
                     </div>
                    </div>
                    `
                    productItems.appendChild(card)  
                }
            });    
            moreButton.style.display="none"
        })
    })
    document.getElementById("bag").addEventListener("click",(e)=>{
        e.preventDefault()
        axios(url).then(data=>{
            const productItems=document.getElementById("cart-items")
            productItems.innerHTML=``
            data.data.forEach(product => {
                if (product.type==="bag") {
                    const card=document.createElement("div")
                    card.innerHTML=`
                    <div class="card1" data-id="${product.id}">
                    <div class="product-image">
                    <img src=${product.image} alt="">
                    <button class="go-to-product">Quick View</button>
                    </div>
                    <div class="info">
                        <h3>${product.name}</h3>
                        <i class="fa-regular fa-heart wish"></i>
                     </div> 
                     <p>$${product.price}</p>                   
                     </div>
                    </div>
                    `
                    productItems.appendChild(card)  
                }
            });    
            moreButton.style.display="none"
        })
    })
    document.getElementById("watches").addEventListener("click",(e)=>{
        e.preventDefault()
        axios(url).then(data=>{
            const productItems=document.getElementById("cart-items")
            productItems.innerHTML=``
            data.data.forEach(product => {
                if (product.type==="watch") {
                    const card=document.createElement("div")
                    card.innerHTML=`
                    <div class="card1" data-id="${product.id}">
                    <div class="product-image">
                    <img src=${product.image} alt="">
                    <button class="go-to-product">Quick View</button>
                    </div>
                    <div class="info">
                        <h3>${product.name}</h3>
                        <i class="fa-regular fa-heart wish"></i>
                     </div> 
                     <p>$${product.price}</p>                   
                     </div>
                    </div>
                    `
                    productItems.appendChild(card)  
                }
            });    
            moreButton.style.display="none"
        })
    })
document.addEventListener("DOMContentLoaded",()=>{
    const checkoutButton=document.getElementById("checkout")
    checkoutButton.addEventListener("click",()=>{
        window.location.href="./checout.html"
    })
})
function addBasket(addToCardButton) {
    addToCardButton[0].addEventListener("click",(e)=>{
        e.preventDefault()
        const parentElement = e.target.parentNode;
        const product={
            id:parentElement.dataset.id,
            image:parentElement.querySelector("h1").innerText,
            name:parentElement.querySelector("h2").innerText,
            price:parentElement.querySelector("p").innerText.replace("$",""),
            quantity:parentElement.querySelector("span").innerText
        }
        addToBasket(product)
    })
}
function addToBasket(addproduct){
    let cart=JSON.parse(localStorage.getItem("basket")) || []
    const existingProduct=cart.findIndex((product)=>product.id===addproduct.id)
    if (existingProduct>-1) {
        alert("daxil edilib")
    }
    else{
        cart.push(addproduct)
    }
    localStorage.setItem("basket",JSON.stringify(cart))
    basketadding()
    updateCount()
}
function basketadding() {
    const cart=JSON.parse(localStorage.getItem("basket")) || []
    const elements=document.querySelector(".basket-items")
    elements.innerHTML=``
    cart.forEach((product)=>{
        const elementsdiv=document.createElement("div")
        elementsdiv.dataset.id=product.id
        elementsdiv.className="cartProduct1"
        elementsdiv.innerHTML=`<img class="cartImage" src=${product.image} alt="">${product.name}-${product.quantity}-x${(product.quantity*product.price).toFixed(2)}<i class="fa-solid fa-trash delete-product"></i>`
        elements.appendChild(elementsdiv)
    })
    const totalPrice=cart.reduce((toplam,item)=>toplam+item.price*item.quantity,0)
    document.getElementById("total").textContent=totalPrice.toFixed(2)
    const deleteProduct=document.querySelectorAll(".delete-product")
        deleteProduct.forEach(delPro=>{
            delPro.addEventListener("click",(e)=>{
                const card=e.target.closest(".cartProduct1")
                const productId=card.dataset.id
                RemoveProduct(productId)
            })
        })
}
function updateCount() {
    const cart=JSON.parse(localStorage.getItem("basket")) || []
    const say=cart.reduce((toplam,item)=>toplam+=parseInt(item.quantity),0)
    document.getElementById("say").innerHTML=``
    document.getElementById("say").innerText=say
}
function RemoveProduct(productID) {
    const cart=JSON.parse(localStorage.getItem("basket")) || []
    const updateCart=cart.filter(item=>item.id !==productID)

    localStorage.setItem("basket",JSON.stringify(updateCart))
    updateCount()
    basketadding()
}
updateCount()
basketadding()
// const addToWishlist=productItems.querySelectorAll(".wish")
// console.log(addToWishlist);
// addToWishlist.forEach(icon=>{
//     console.log(addToWishlist[i]);
//     icon.addEventListener("click",(e)=>{
//         const card=e.target.closest(".card1")
//         console.log(card);
//         const product={
//             // id:card.dataset.id,
//             image:card.querySelector("img").src,
//             title:card.querySelector("h3").innerText,
//             price:parseFloat(card.querySelector("p").innerText.replace("$",'')),
//             quantity: 1
//         }
//         console.log(product);
//         addToWishlist(product)   
//     })   
// })
function addToWishlist1(data) {
    let wishlist=JSON.parse(localStorage.getItem("wishlist")) || []
    const existingProduct=wishlist.findIndex((product)=>product.id===data.id)
    if (existingProduct>-1) {
        alert("daxil edilib")
    }
    else{
        wishlist.push(data)
        localStorage.setItem("wishlist",JSON.stringify(wishlist))
    }
    DisplayWishlist()  
}
function DisplayWishlist() {
    let wishlist=JSON.parse(localStorage.getItem("wishlist")) || []
    const wishlistItems=document.getElementById("wishlist-items")
    wishlistItems.innerHTML=''
    wishlist.forEach((product)=>{
        const productElement=document.createElement("div")
        productElement.className="wish-product"
        productElement.innerHTML=`<div class="card123" >
        <img src=${product.image} alt="Mercedes">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
        <button class="add-to-cart">Add to cart</button>
        <i class="fa-solid fa-trash remove-to-wishlist" data-id=${product.id}></i>
    </div>`
    wishlistItems.appendChild(productElement)
updateWishCount()

})
wishlistItems.querySelectorAll(".add-to-cart").forEach((button, index) => {
    button.addEventListener("click", () => {
        const product = wishlist[index];
        addToBasket({
            id: product.id,
            image: product.image,
            title: product.name,
            price: parseFloat(product.price), 
            quantity: 1
        });
        basketadding()
    });
})
    
    document.querySelectorAll(".remove-to-wishlist").forEach(button=>{
        button.addEventListener("click",(e)=>{
            const productId=e.target.dataset.id
            removeFromWishlist(productId)
        })
    })
   }
   function removeFromWishlist(productID) {
    
    let wishlist=JSON.parse(localStorage.getItem("wishlist")) || []

    const updatedWishlist=wishlist.filter((item)=> item.id!==productID)
    localStorage.setItem("wishlist",JSON.stringify(updatedWishlist))
    DisplayWishlist()

}
function updateWishCount() {
    const wish=JSON.parse(localStorage.getItem("wishlist")) || []
    const say=wish.reduce((toplam,item)=>toplam+=item.quantity,0)
    document.getElementById("say1").innerHTML=``
    document.getElementById("say1").innerText=say
}
DisplayWishlist()
updateWishCount()


