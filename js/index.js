/*Boton de cambio de tema */

const btnSwitch = document.querySelector("#nav-switch");

btnSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btnSwitch.classList.toggle("active");
});

/*Acordeon */
const btnToggle = document.querySelector("#toggle-colapse");
const leftColapse = document.querySelector("#colapse-side-left");
const iconColapse = document.querySelector(".colapse-icon");
const sideLeft = document.querySelector(".side-left");

btnToggle.addEventListener("click", () => {
  if (sideLeft.classList.contains("side-left-active")) {
    sideLeft.classList.remove("side-left-active");
  } else {
    setTimeout(function () {
      sideLeft.classList.add("side-left-active");
    }, 700);
  }
  leftColapse.classList.toggle("colapse-side-left-active");
  iconColapse.classList.toggle("colapse-icon-active");
});

/*ICONO ANIMADO */
/*
const element = document.querySelector('.icon-down');
element.classList.add('animate__animated', 'animate__slideInDown', 'animate__infinite',	'infinite', 'animate__slow');
*/

$("#owl2").owlCarousel({
  autoplay: false,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  autoplaySpeed: 1000,
  items: 1,
  loop: true,
  dots: true,
  autoHeight: false,
  responsiveClass: true,
  responsive: {
    0: {
      margin: 10,
      items: 1,
      nav: false,
    },
    600: {
      margin: 60,
      items: 1,
      nav: true,
    },
    1024: {
      margin: 60,
      items: 1,
      nav: true,
      loop: false,
    },
  },
});

$("#owl3").owlCarousel({
  autoplay: false,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  autoplaySpeed: 1000,
  loop: true,
  dots: true,
  autoHeight: false,
  responsiveClass: true,
  responsive: {
    0: {
      margin: 10,
      items: 1,
      nav: false,
    },
    600: {
      margin: 60,
      items: 1,
      nav: true,
    },
    1024: {
      margin: 60,
      items: 1,
      nav: true,
      loop: false,
    },
  },
});
/*MENU - COLOR DE LINKS*/

let links = document.getElementsByClassName("menuLink");

let node = [...links];

node.forEach((e) => {
  e.addEventListener("click", () => {
    node.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.add("active");
  });
});

$(document).ready(function () {
  var section1 = $("#about-blend").offset().top;
  var section2 = $("#why-blend").offset().top;
  var section3 = $("#how-we-blend").offset().top;
  var section4 = $("#service-blend").offset().top;
  var section5 = $("#contact-blend").offset().top;

  $(window).scroll(function () {   
    $(".titulo-nav").each(function () {
      let offset = $(this);
      if ($(window).scrollTop() > offset.offset().top - 50) {
         $('.menuLink').each(function() {
          if ($(this)[0].dataset.name === offset[0].id){
             $('.menuLink').each(function(){
              this.classList.remove("active")
             })
             this.classList.add("active")
          } 
        });       
      }
    });
  });
});


