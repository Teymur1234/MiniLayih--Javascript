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
    console.log(next);
    if (next!==0) {
        nav1.style.backgroundColor="white"
    }
    else{
        nav1.style.backgroundColor="transparent"
    }
}
window.addEventListener("scroll",navScroll)
const slider=document.getElementById("slider1")
const sliderItems=document.getElementById("slider-items1")
const slide=document.querySelectorAll(".slide")
let currentSlide=0  
let interval
function next() {
    if (currentSlide<slide.length-1) {
        currentSlide++
    }
    else{
        currentSlide=0
    }
    updateSlider()
}
function previous() {
    if (currentSlide>0) {
        currentSlide-=1
    }
    else{
        currentSlide=slide.length-1
    }
    updateSlider()
}
function updateSlider() {
    const transformvalue=-currentSlide*100 +"%"
    sliderItems.style.transform=`translateX(${transformvalue})`
}
function startAutoPlay() {
    interval=setInterval(()=>{
        if (currentSlide<slide.length-1) {
            currentSlide++
        }
        else{
            currentSlide=0
        }
        updateSlider()
    },3000)
}
const previousSlide=document.getElementById("previousslide")
const nextSlide=document.getElementById("nextslide")
slider.addEventListener("mouseover",()=>{
    previousSlide.style.display="block"
    nextSlide.style.display="block"
})
slider.addEventListener("mouseleave",()=>{
    previousSlide.style.display="none"
    nextSlide.style.display="none"
})
previousSlide.addEventListener("click",previous)
nextSlide.addEventListener("click",next)
startAutoPlay()