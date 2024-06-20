// const editimage = document.querySelector(".editimage");
// const inputimage = document.querySelector(".inputimage");
// const formimage =document.querySelector(".form-image");

// editimage.addEventListener("click",function(){
//     // inputimage.click();
//     alert("hello")
// })
  
// inputimage.addEventListener("change",function(){
//     formimage.submit();
// })



document.querySelector(".project").addEventListener("mouseover",function(){
    gsap.to("nav",{
        left:"6%",
        opacity:1,
        duration:1,
        stagger:true
    }) 
})
document.querySelector("nav").addEventListener("mouseleave",function(){
    gsap.to("nav",{
        left:"-25%",
        opacity:1,
    }) 
})

