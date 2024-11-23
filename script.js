function runMouseTrail() {
  const svg = document.querySelector("svg.trail");
  const path = document.querySelector("path");
  //   console.log(svg, path);

  let points = [];
  let segments = 100;
  let mouse = {
    x: 0,
    y: 0,
  };

  const move = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    mouse.x = x;
    mouse.y = y;

    if (points.length === 0) {
      for (let i = 0; i < segments; i++) {
        points.push({
          x: x,
          y: y,
        });
      }
    }
  };

  const anim = () => {
    // starting point
    let px = mouse.x;
    let py = mouse.y;

    points.forEach((p, index) => {
      p.x = px;
      p.y = py;

      let n = points[index + 1];

      if (n) {
        px = px - (p.x - n.x) * 0.1;
        py = py - (p.y - n.y) * 0.1;
      }
    });

    path.setAttribute(
      "d",
      `M ${points.map((p) => `${p.x} ${p.y}`).join(` L `)}`
    );

    requestAnimationFrame(anim);
  };

  const resize = () => {
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    svg.style.width = ww + "px";
    svg.style.height = wh + "px";
    svg.setAttribute("viewBox", `0 0 ${ww} ${wh}`);
  };

  document.addEventListener("mousemove", move);
  window.addEventListener("resize", resize);

  anim();
  resize();
}

function runString() {
  const path = document.querySelector("svg.string path");
  const svg = document.querySelector("svg.string");
  // console.log(svg, path);
  const intialPath = `M 0 250 Q 700 250 ${window.innerWidth} 250`;
  path.setAttribute("d", intialPath);

  svg.addEventListener("mousemove", (e) => {
    // console.log(svg.getBoundingClientRect().top);
    const data = svg.getBoundingClientRect();

    gsap.to("svg.string path", {
      attr: {
        d: `M 0 200 Q ${e.x - data.left} ${e.y - data.top} ${
          window.innerWidth
        } 200`,
      },
      duration: 0.1,
    });
  });

  svg.addEventListener("mouseleave", () => {
    gsap.to("svg.string path", {
      attr: { d: intialPath },
      duration: 0.5,
      ease: "bounce.out",
    });
  });
}

function runName() {
  const firstH1 = document.querySelector(".name h1.first");
  const secondH1 = document.querySelector(".name h1.second");
  const firstH1Text = firstH1.innerText.split("");
  const secondH1Text = secondH1.innerText.split("");
  firstH1.innerHTML = secondH1.innerHTML = "";

  firstH1Text.forEach((e) => (firstH1.innerHTML += `<span>${e}</span>`));
  secondH1Text.forEach((e) => (secondH1.innerHTML += `<span>${e}</span>`));

  gsap.from(".name .title h1.first span", {
    y: -1000,
    duration: 1,
    stagger: 0.2,
  });
  gsap.from(".name .title h1.second span", {
    y: 1000,
    duration: 1,
    stagger: 0.2,
  });

  gsap.to(".name .title h1 ", {
    y: -1000,
    duration: 2,
    stagger: 0.2,
    scrollTrigger: {
      // markers: true,
      trigger: ".homepage ",
      scroller: "body",
      start: "top 0%",
      scrub: true,
    },
  });

  gsap.to(".angular.left", {
    x: -500,
    scrollTrigger: {
      // markers: true,
      trigger: ".angular",
      scroller: "body",
      start: "top 0%",
      scrub: true,
    },
  });
  gsap.to(".angular.right", {
    x: 500,
    scrollTrigger: {
      // markers: true,
      trigger: ".angular",
      scroller: "body",
      start: "top 0%",
      scrub: true,
    },
  });
}

function runAbout() {
  gsap.to(".about-section .intro", {
    backgroundImage:
      "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
    backgroundColor: "#4158D0",
    transform: "translate(calc(-100% + 100vw))",
    scrollTrigger: {
      scroller: "body",
      trigger: ".about-section",
      // markers: true,
      scrub: true,
      pin: true,
      end: "top -300%",
    },
  });

  gsap.from(".about-section .content", {
    opacity: 0,
    duration: 3,
    y: -300,
    scale: 0,
    scrollTrigger: {
      trigger: ".about-section .content",
      scrub: true,
      // markers: true,
    },
  });
}

function runProjects() {
  gsap.from(".project1", {
    x: -1000,
    duration: 2,
    scrollTrigger: {
      scroller: "body",
      trigger: ".project1",
      // markers: true,
      scrub: 3,
      end: "bottom 70%",
    },
  });
  gsap.from(".project2", {
    x: 1000,
    duration: 2,
    scrollTrigger: {
      scroller: "body",
      trigger: ".project2",
      // markers: true,
      scrub: 3,
      end: "bottom 70%",
    },
  });
  gsap.from(".project3", {
    x: -1000,
    duration: 2,
    scrollTrigger: {
      scroller: "body",
      trigger: ".project3",
      // markers: true,
      scrub: 3,
      end: "bottom 70%",
    },
  });
  gsap.from(".project4", {
    x: 1000,
    duration: 2,
    scrollTrigger: {
      scroller: "body",
      trigger: ".project4",
      // markers: true,
      scrub: 3,
      end: "bottom 100%",
    },
  });
}

window.addEventListener("DOMContentLoaded", () => {
  runMouseTrail();
  runString();
  runName();
  runAbout();
  runProjects();
});
