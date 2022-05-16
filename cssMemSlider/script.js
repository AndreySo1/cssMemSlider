let offset = 0;
let sliderImg = document.querySelector('.slider-img');
let btnPrev = document.querySelector('.prev');
let btnNext = document.querySelector('.next');
let img = document.querySelector('img');
let images = document.querySelectorAll('img');
let toggls= document.querySelectorAll('.toggle-dot');
let index = 0;
let imgText = images[0].getAttribute('alt');
let text = document.querySelector('.slider-text');
let around = document.querySelectorAll('.around');

/* ------------------------- */

let memImg=document.querySelector('.test-mem');
let memBtn=document.querySelector('.btn-mem');
let urlImg="https://meme-api.herokuapp.com/gimme";

async function loadMem(e){
   let response = await fetch(urlImg, { method:'GET',});

   let responseResult = await response.json();

   if(response.ok){
      getMem(responseResult);
   } else {
      memImg.innerHTML = responseResult.message;
   }
}

function getMem(data){
   console.log(data);

   let imgSrc = data.url;
   let text = data.title;

   let tpl = `
   <img class="img-mem" src="${imgSrc}" alt="${text}">
   `;

   memImg.innerHTML = tpl;
}

/* ---------------------------- */

function getImgText(n){
   if(imgText != 0){
   imgText = images[n].getAttribute('alt');
   }
   if(imgText == 0){
      imgText = 'Text for image not found'; 
   }
   text.innerHTML = imgText;   
}


function activeSlide(n){ 
   console.log(n);

   for(toggl of toggls){
      toggl.classList.remove('active');
   }
   toggls[n].classList.add('active');
   getImgText(n);
}

function nextSlide(){
   if(index == toggls.length -1){
      index = 0;
      activeSlide(index);
   } else{
      index++;
      activeSlide(index);
   }
}

function prevSlide(){
   if(index == 0){
      index = toggls.length -1;
      activeSlide(index);
   } else{
      index--;
      activeSlide(index);
   }
}








btnNext.addEventListener('click', () =>{
   let imgWidth = img.offsetWidth;
   offset+= imgWidth;

   if(offset == imgWidth*4){
      offset = 0;
   }

   sliderImg.style.left = -offset + 'px';
   nextSlide();
});

btnPrev.addEventListener('click', () =>{
   let imgWidth = img.offsetWidth;
   offset-= imgWidth;

   if(offset < 0){
      offset = imgWidth*3;
   }

   sliderImg.style.left = -offset + 'px';
   prevSlide();
});

// function currentSlide(n){
//    let imgWidth = img.offsetWidth;
//    offset = imgWidth * n;

//    sliderImg.style.left = -offset + 'px';
// }

around.forEach((item, indexAround)=>{
   item.addEventListener('click', ()=>{
      index = indexAround;
      let imgWidth = img.offsetWidth;
      offset = imgWidth * indexAround;
      sliderImg.style.left = -offset + 'px';
      activeSlide(indexAround);
   });  
});



//sliderToggle.addEventListener('click', toggleClick);

