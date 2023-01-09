var img = document.getElementById('img');

var slides = ['BANNER-1.jpg','BANNER-2.png','BANNER-3.jpg','BANNER-4.jpg'];

var Start=0;

function slider(){
    if(Start<slides.length){
        Start=Start+1;
    }
    else{
        Start=1;
    }
    img.innerHTML = "<img src=img/"+slides[Start-1]+">";
   
}

setInterval(slider,3000);