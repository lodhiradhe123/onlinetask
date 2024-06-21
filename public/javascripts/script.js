document.querySelector(".project").addEventListener("mouseenter", function () {
  gsap.to("nav", {
    left: "6%",
    opacity: 1,
    duration: 1,
    stagger: true,
  });
});
document.querySelector("nav").addEventListener("mouseleave", function () {
  gsap.to("nav", {
    left: "-25%",
    opacity: 1,
  });
});
