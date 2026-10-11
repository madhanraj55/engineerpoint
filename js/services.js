(function () {
  const SERVICES = [
    ["Web Design", "\ud83c\udfa8", [
      ["Corporate Web Design", "Professional company websites that build trust and credibility."],
      ["Web Designing for Startups", "Fast, flexible launch websites for new and growing ventures."],
      ["Web Redesigning", "Refresh outdated sites with modern design and better performance."],
      ["Landing Page Design", "Focused pages built to turn visitors into enquiries."],
      ["Website Maintenance", "Updates, fixes, backups and ongoing care for your site."],
      ["Cloud Servers & Maintenance", "Cloud deployment, backups and monitoring you can rely on."],
      ["Industry Solutions", "Website approaches tailored to the needs of your industry."],
      ["SEO & AI Search Visibility", "Be found in search engines and AI-powered answers."],
      ["AI Tools & Resources", "Practical AI tools and resources to speed up your business."],
      ["UI/UX Design", "User-friendly interfaces and engaging digital experiences."]
    ]],
    ["Web Development", "\ud83d\udcbb", [
      ["Custom Web Development", "Bespoke web platforms designed around your requirements."],
      ["Dynamic Web Development", "Data-driven sites with admin panels and live content."],
      ["PHP Development", "Reliable PHP and MySQL applications and websites."],
      ["MERN Full Stack Development", "React-based applications with MongoDB, Express and Node."],
      ["Python Development", "Scalable back ends, automation and data-driven apps."],
      ["Custom Software Solutions", "Tailored software that improves your business workflows."]
    ]],
    ["CMS & Ecommerce", "\ud83d\uded2", [
      ["WordPress Development", "Easy-to-manage WordPress sites, themes and plugins."],
      ["Ecommerce Development", "Online stores with smooth product discovery and checkout."],
      ["Shopify Development", "Shopify stores set up, customised and ready to sell."]
    ]],
    ["Digital Marketing", "\ud83d\udce3", [
      ["Search Engine Optimization - SEO", "Technical and on-page SEO for lasting organic visibility."],
      ["Social Media Marketing", "Content, campaigns and brand communication for your audience."],
      ["Google Ads - PPC", "Targeted paid campaigns with budget control and tracking."]
    ]],
    ["Mobile Applications", "\ud83d\udcf1", [
      ["Android Apps", "Native Android apps for customers and teams."],
      ["iOS Apps", "Polished iPhone and iPad applications."],
      ["Single Vendor", "Mobile commerce apps for one brand or store."],
      ["Multi Vendor", "Marketplace apps with multiple sellers and one platform."]
    ]],
    ["AI Agent", "\ud83e\udd16", [
      ["AI Development", "Custom AI solutions that automate repeatable work."],
      ["AI Consulting", "Find where AI can create real value in your business."],
      ["AI Powered Mobile App Development", "Mobile apps with built-in intelligent features."],
      ["Generative AI", "Content, image and text generation tailored to your needs."],
      ["ChatGPT Solutions", "Chatbots and assistants built on modern language models."]
    ]],
    ["SAP", "\ud83c\udfe2", [
      ["SAP Implementation & Consulting", "Plan, implement and support SAP for your operations."]
    ]],
    ["DevOps", "\u2699\ufe0f", [
      ["CI/CD Pipeline & Automation", "Automated builds, testing and releases."],
      ["Cloud Servers & Maintenance", "Cloud deployment, backups and monitoring you can rely on."]
    ]]
  ];

  function esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function slug(c) {
    return c.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
  }

  const wrap = document.getElementById("svcWrap");
  const mega = document.getElementById("megaSub");
  const sel = document.getElementById("svcSel");
  const seen = {};
  let h = "";
  let m = "";

  SERVICES.forEach(function (c) {
    const id = "svc-" + slug(c[0]);
    h += '<h3 class="cat" id="' + id + '">' + esc(c[0]) + '</h3><div class="grid">';
    m += '<a class="mega-head-link" href="#' + id + '"><span>' + c[1] + '</span> ' + esc(c[0]) + '</a>';
    c[2].forEach(function (x) {
      if (seen[x[0]]) return;
      seen[x[0]] = 1;
      h += '<div class="svc rv"><i>' + c[1] + '</i><h3>' + esc(x[0]) + '</h3><p>' + esc(x[1]) + '</p><a href="#contact" data-svc="' + esc(x[0]) + '">Explore Service</a></div>';
      if (sel) {
        const o = document.createElement("option");
        o.textContent = x[0];
        sel.appendChild(o);
      }
    });
    h += '</div>';
  });

  if (wrap) wrap.innerHTML = h;
  if (mega) mega.innerHTML = m;

  if (wrap && sel) {
    wrap.addEventListener("click", function (e) {
      const a = e.target.closest("[data-svc]");
      if (a) sel.value = a.dataset.svc;
    });
  }

  // Mobile menu setup
  const menu = document.getElementById("menu");
  const bg = document.getElementById("burger");
  if (bg && menu) {
    bg.addEventListener("click", function () {
      const o = menu.classList.toggle("open");
      bg.setAttribute("aria-expanded", o);
    });
  }

  document.querySelectorAll(".tg").forEach(function (b) {
    b.addEventListener("click", function () {
      const li = b.parentNode;
      const o = li.classList.toggle("open");
      b.textContent = o ? "\u2212" : "+";
    });
  });

  if (menu) {
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && innerWidth <= 960) {
        menu.classList.remove("open");
      }
    });
  }
})();
