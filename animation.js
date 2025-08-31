document.addEventListener("DOMContentLoaded", () => {
  const flowers = ["🌸", "🌺", "🌼", "🌻", "💮"];
  for (let i = 0; i < 20; i++) {
    let f = document.createElement("div");
    f.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    f.style.position = "absolute";
    f.style.left = Math.random() * window.innerWidth + "px";
    f.style.top = "-50px";
    f.style.fontSize = 20 + Math.random() * 20 + "px";
    document.body.appendChild(f);

    gsap.to(f, {
      y: window.innerHeight + 100,
      rotation: Math.random() * 360,
      duration: 5 + Math.random() * 5,
      repeat: -1,
      delay: Math.random() * 5,
      ease: "linear",
    });
  }
});
