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
document.addEventListener("DOMContentLoaded",()=>{

    
    function DisplayCheckout() {
        
        let cart=JSON.parse(localStorage.getItem("basket")) || []
        let checkoutItems=document.getElementById("checkout-items")
        checkoutItems.innerHTML='';
        cart.forEach((product,index) => {
                let cartElement=document.createElement("div")
                cartElement.innerHTML=`
                <div class="checkout-product" data-id=${product.id}>
                <img class="checkout-image" src=${product.image} alt="">
                <h3>${product.name}</h3>
                <div>
                <button class="decrease">-</button>
                <span class="quantity">${product.quantity}</span>
                <button class="increase">+</button>
                </div>
                <p>${product.price}</p>
                <span class="product-total-price">Total ${(product.quantity*product.price).toFixed(2)}</span>
                <button class="delete-checkout-product">Delete</button>
            </div>
                `
               
                checkoutItems.appendChild(cartElement)
                

                cartElement.querySelector(".increase").addEventListener("click",()=>{
                    updateProductQuantity(index,1)
                })
                cartElement.querySelector(".decrease").addEventListener("click",()=>{
                    updateProductQuantity(index,-1)
                    cart[index].quantity++
                })
                cartElement.querySelector(".delete-checkout-product").addEventListener("click",()=>{
                    deleteProductFromCheckout(index)
                    
                })

        });


    }

    function updateProductQuantity(index,change) {
        let cart=JSON.parse(localStorage.getItem("basket")) || []
        if(parseInt(cart[index].quantity) + change<=0){
            cart.splice(index,1)
        }
        else{
            cart[index].quantity = (parseInt(cart[index].quantity) + change).toString();
        }
        localStorage.setItem("basket",JSON.stringify(cart))
        DisplayCheckout()
        UpdateCheckoutTotalPrice()
        
    }

    function UpdateCheckoutTotalPrice() {
        let cart=JSON.parse(localStorage.getItem("basket")) || []

        const total=cart.reduce((toplam,item)=>toplam+(item.price*item.quantity),0)

        document.getElementById("checkout-total-price").innerText=total.toFixed(2)
    }
    function deleteProductFromCheckout(index) {
        let cart=JSON.parse(localStorage.getItem("basket")) || []

        cart.splice(index,1)
        localStorage.setItem("basket",JSON.stringify(cart))

        DisplayCheckout()
        UpdateCheckoutTotalPrice()
    }


document.getElementById("checkout-delete-all").addEventListener("click",()=>{
    localStorage.removeItem("basket")
    DisplayCheckout()
    UpdateCheckoutTotalPrice()

})

DisplayCheckout()
UpdateCheckoutTotalPrice()

})