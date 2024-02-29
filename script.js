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