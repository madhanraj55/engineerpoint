// Project showcase data & filter logic
const projects = [
  {
    title: "Apex Cloud Enterprise Platform",
    category: "Websites",
    description: "Modern, ultra-fast corporate digital presence with cloud architecture and SEO integration.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    technologies: ["HTML5", "CSS3", "JavaScript", "Next.js"],
    liveUrl: "https://engineerpoint.com",
    githubUrl: ""
  },
  {
    title: "OmniFlow Logistics SaaS",
    category: "Web Applications",
    description: "Enterprise operations management dashboard with live real-time analytics and inventory tracking.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    liveUrl: "https://engineerpoint.com",
    githubUrl: ""
  },
  {
    title: "PulseFit Health & Wellness App",
    category: "Mobile Apps",
    description: "Cross-platform mobile application featuring daily goal telemetry, biometric sync, and workout plans.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    technologies: ["Flutter", "Dart", "Firebase", "REST API"],
    liveUrl: "https://engineerpoint.com",
    githubUrl: ""
  },
  {
    title: "FinTech NeoBank Interface",
    category: "UI/UX Design",
    description: "Next-generation banking experience, design systems, interactive transaction flows and prototyping.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    technologies: ["Figma", "Design Systems", "Prototyping"],
    liveUrl: "https://engineerpoint.com",
    githubUrl: ""
  },
  {
    title: "Global Reach Marketing Engine",
    category: "Digital Marketing",
    description: "Multi-channel PPC and performance marketing campaign system driving verified conversion growth.",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80",
    technologies: ["Google Ads", "Meta Ads", "Analytics", "SEO"],
    liveUrl: "https://engineerpoint.com",
    githubUrl: ""
  },
  {
    title: "Aura Commerce Storefront",
    category: "Websites",
    description: "High-performance headless eCommerce platform with frictionless checkout and product discoverability.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    technologies: ["Shopify", "Liquid", "React", "Stripe"],
    liveUrl: "https://engineerpoint.com",
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
