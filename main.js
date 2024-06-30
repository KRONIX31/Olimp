const fullscreen_preview = document.querySelector('.fullscreen_preview')
const fullscreen_preview_close = document.querySelector('.fullscreen_preview_close')
const fullscreen_preview_img_wrapper = document.querySelector('.fullscreen_preview_img_wrapper')
/*-----header-----*/
const header = document.querySelector('.header')
/*-----body-----*/
const site_title_bg_hq = document.querySelector('.site_bg_hq')
const site_title_bg_hq_src = "media/bg_hq.png"

const body = document.querySelector('body')
const content = document.querySelector("main.content")
const slides = document.querySelectorAll('.swiper-slide')

function load_bg(src) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', resolve)
        image.addEventListener('error', reject)
        image.src = src
    })
}
load_bg(site_title_bg_hq_src).then(() => {
    console.log("bg_hq")
    site_title_bg_hq.style.backgroundImage = `url(${site_title_bg_hq_src})`
    site_title_bg_hq.style.opacity = "1"
})

function fullscreen_preview_showing(){
    fullscreen_preview.style.display = 'block'
    fullscreen_preview.style.overflow = 'auto'
    body.style.overflow = 'hidden'
    setTimeout(()=>{
        fullscreen_preview.style.opacity = '1'
    }, 30)

}
function fullscreen_preview_closing(){
    fullscreen_preview.style.opacity = '0'
    setTimeout(()=>{
        fullscreen_preview.style.display = 'none'
    }, 350)
    fullscreen_preview.style.overflow = 'hidden'
    body.style.overflow = 'auto'
    fullscreen_preview_img_wrapper.innerHTML = ''
}

const swiper = new Swiper('.card_slider', {
    navigation:{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    pagination:{
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: false,
        dynamicMainBullets: 2,
        renderBullet: function(index, classname){
            return '<span class="' + classname + '">' + (index+1) + '</span>'
        }
    },
    preloadImages: false, /* отключение предзагрузки всех картинок */
    lazy: {
        loadOnTransitionStart: false, /* загрузка картинок при переключении слайда */
        loadPrevNext: false
    },
    autoHeight: true,
    watchOverflow: true,
    speed: 500,
    slidesPerGroup: 1,
    centeredSlides: false,
    grabCursor: true,
    effect: "coverflow",
    coverflowEffect:{
        rotate: 9,
        stretch: 0,
        depth: 10,
        modifier: 1,
        slideShadows: true
    },
    breakpoints: {
        1: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        570: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        800: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        1100: {
          slidesPerView: 4,
          spaceBetween: 25
        }
    },
})

slides.forEach(slide => {
    slide.querySelector('img').addEventListener('click', ()=>{
        console.log(slide.querySelector('img').src)
        fullscreen_preview_showing()
        let img = new Image()
        img.src = slide.querySelector('img').src
        fullscreen_preview_img_wrapper.appendChild(img)
        img.onload = function(){
            if(img.naturalHeight > img.naturalWidth){
                img.style.height = '100%'
            } else{
                img.style.width = '100%'
            }
        }
    })
})

// Intense(slides) zoom решить

window.addEventListener('scroll',()=>{
    let max_height = window.document.documentElement.scrollHeight - window.innerHeight
    document.documentElement.style.setProperty('--header_poloska', `${window.scrollY / max_height * 100}%`)
})
fullscreen_preview_close.addEventListener('click', ()=>{
    fullscreen_preview_closing()
})