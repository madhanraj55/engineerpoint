// Project showcase data & filter logic
const projects = [
  {
    title: "Sample Business Website",
    category: "Websites",
    description: "Placeholder: a modern website for a growing business.",
    image: "",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "",
    githubUrl: ""
  },
  {
    title: "Sample Web Application",
    category: "Web Applications",
    description: "Placeholder: a custom platform built around business needs.",
    image: "",
    technologies: ["React", "Node", "MySQL"],
    liveUrl: "",
    githubUrl: ""
  },
  {
    title: "Sample Mobile App",
    category: "Mobile Apps",
    description: "Placeholder: an Android / cross-platform app.",
    image: "",
    technologies: ["Flutter", "Kotlin"],
    liveUrl: "",
    githubUrl: ""
  },
  {
    title: "Sample UI/UX Concept",
    category: "UI/UX Design",
    description: "Placeholder: interface design and user flows.",
    image: "",
    technologies: ["Figma"],
    liveUrl: "",
    githubUrl: ""
  }
];

(function () {
  const cats = ["All Projects", "Websites", "Web Applications", "Mobile Apps", "Digital Marketing", "UI/UX Design"];
  const grid = document.getElementById("grid");
  const bar = document.getElementById("filters");
  const modal = document.getElementById("modal");

  if (!grid || !bar || !modal) return;

  function render(c) {
    grid.innerHTML = "";
    projects
      .filter((p) => c === "All Projects" || p.category === c)
      .forEach((p) => {
        const a = document.createElement("article");
        a.className = "card";
        a.tabIndex = 0;
        a.innerHTML = `<div class="thumb">${p.image ? `<img loading="lazy" alt="" src="${p.image}">` : "PLACEHOLDER"}</div><small>${p.category}</small><h3></h3><p></p><div class="tags">${p.technologies.map((t) => `<span>${t}</span>`).join("")}</div>`;
        a.querySelector("h3").textContent = p.title;
        a.querySelector("p").textContent = p.description;

        const open = () => {
          modal.querySelector("div").innerHTML = `<h3></h3><p></p>${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener">Live site</a> ` : ""}${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener">GitHub</a>` : ""}<br><button class="btn" style="margin-top:16px;">Close</button>`;
          modal.querySelector("h3").textContent = p.title;
          modal.querySelector("p").textContent = p.description;
          modal.hidden = false;
          modal.querySelector("button").onclick = () => (modal.hidden = true);
        };

        a.onclick = open;
        a.onkeydown = (e) => e.key === "Enter" && open();
        grid.appendChild(a);
      });
  }

  cats.forEach((c, i) => {
    const b = document.createElement("button");
    b.textContent = c;
    if (!i) b.className = "on";
    b.onclick = () => {
      bar.querySelectorAll("button").forEach((x) => (x.className = ""));
      b.className = "on";
      render(c);
    };
    bar.appendChild(b);
  });

  render("All Projects");
})();
