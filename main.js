/* Conteúdos editáveis: tratamentos e depoimentos. */
const treatments = [
  { title: "Check-up e prevenção", text: "Acompanhamento para cuidar da sua saúde bucal.", icon: "shield" },
  { title: "Limpeza e profilaxia", text: "Cuidado preventivo e orientações para o dia a dia.", icon: "sparkle" },
  { title: "Restaurações", text: "Avaliação cuidadosa para recuperar dentes comprometidos.", icon: "tooth" },
  { title: "Clareamento", text: "Possibilidades estéticas avaliadas de forma individual.", icon: "smile" },
  { title: "Tratamento de canal", text: "Atenção e explicação em todas as etapas do cuidado.", icon: "heart" },
  { title: "Extrações", text: "Procedimentos indicados após avaliação clínica.", icon: "shield" },
  { title: "Odontopediatria", text: "Cuidado acolhedor para a saúde bucal das crianças.", icon: "smile" },
  { title: "Estética dental", text: "Alternativas para harmonizar seu sorriso com naturalidade.", icon: "sparkle" }
];

const testimonials = [
  { name: "Mayara 8019", initial: "M", avatar: "mayara", rating: 5, quote: "Fui ao consultório e fui super atendida, dentista super profissional e muito querida! Não me senti constrangida e sim acolhida. Me deu dicas de cuidado bucal! E a recepcionista super fofa teve paciência enquanto tive problema com meu plano, me ajudou a resolver o problema." },
  { name: "Anna Laura Thomsen Correa", initial: "A", avatar: "anna", rating: 5, quote: "A Dra Joyce é uma excelente profissional, uma educação e simpatia em pessoa. Passei em consulta e fui muito bem atendida, ela me explicou tudo com muita paciência." },
  { name: "Zeni Souza", initial: "Z", avatar: "zeni", rating: 5, quote: "O atendimento da Dra. Joyce é excelente. Tira todas as dúvidas com relação aos procedimentos realizados. E tem uma paciência com a minha filha. Só tenho a agradecer!" },
  { name: "janete camargo", initial: "J", avatar: "janete", rating: 5, quote: "Fui muito bem atendida, eu tinha trauma de dentista após uma péssima experiência, mas com a dra Joyce e sua auxiliar tive apoio até emocional para um atendimento bem sucedido, sou grata." },
  { name: "Débora Evelyn", initial: "D", avatar: "debora", rating: 5, quote: "Tive algumas vezes no consultório e fui muito bem atendida." },
  { name: "Maria Souza", initial: "M", avatar: "maria", rating: 5, quote: "A doutora possui um atendimento bom, porém sua postura durante o atendimento foi inadequada. Presenciei diversas repreensões feitas à secretária/auxiliar na minha frente, de forma ríspida, o que me causou constrangimento a mim e acredito que a auxiliar se sentiu humilhada, deixou o ambiente desconfortável. Ressalto que a funcionária foi extremamente educada e simpática em todo o momento, não merecendo esse tipo de exposição." },
  { name: "Julia Souza", initial: "J", avatar: "julia", rating: 1, quote: "Entrei em contato para fazer a colagem da minha contenção, por whats ela falou que faria, por isso confirmei a consulta. Agendei as 9h e cheguei 15 minutos antes, a clínica completamente fechada, sem ninguém para atender, ela foi chegar no consultório 9h05 e me atendeu apenas 9h25. Eu estava sentada na recepção e ela dentro do consultório pedindo meus dados, extremamente desrespeitosa. Me atendeu de maneira estúpida, virando meu rosto para conseguir ver os dentes com o braço, e apertando meus lábios para realizar a sucção da água. Molhou toda minha roupa e no rosto no final não colocou minha contenção e disse que não fazia esse procedimento pelo plano, o que eu já havia perguntado por WhatsApp e ela confirmou que fazia." }
];

const icon = (name) => `<svg aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
const reviewStars = (rating) => `${"★".repeat(rating)}<span class="empty-stars">${"★".repeat(5 - rating)}</span>`;

function renderTreatments() {
  const grid = document.querySelector("#treatment-grid");
  if (!grid) return;
  grid.innerHTML = treatments.map((treatment) => `
    <article class="treatment-card">
      <span class="icon-disc">${icon(treatment.icon)}</span>
      <div><h3>${treatment.title}</h3><p>${treatment.text}</p></div>
    </article>`).join("");
}

function setupTestimonials() {
  const track = document.querySelector("#testimonial-track");
  const previous = document.querySelector("[data-slide-prev]");
  const next = document.querySelector("[data-slide-next]");
  const status = document.querySelector("#slider-status");
  const viewport = document.querySelector(".testimonial-viewport");
  if (!track || !previous || !next || !status || !viewport) return;

  track.innerHTML = testimonials.map((testimonial) => `
    <article class="testimonial-card" role="group" aria-roledescription="slide" aria-label="Depoimento de ${testimonial.name}">
      <header class="reviewer"><span class="review-avatar avatar-${testimonial.avatar}" aria-hidden="true">${testimonial.initial}</span><div><strong>${testimonial.name}</strong><small>avaliação no Google</small></div><span class="review-stars" aria-label="${testimonial.rating} de 5 estrelas">${reviewStars(testimonial.rating)}</span></header>
      <span class="quote" aria-hidden="true">“</span>
      <blockquote>${testimonial.quote}</blockquote>
    </article>`).join("");

  let index = 0;
  let startX = 0;
  const adjustHeight = () => { viewport.style.height = `${track.children[index].offsetHeight}px`; };
  const show = (newIndex) => {
    index = (newIndex + testimonials.length) % testimonials.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    status.textContent = `${index + 1} de ${testimonials.length}`;
    window.requestAnimationFrame(adjustHeight);
  };
  previous.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", () => show(index + 1));
  track.addEventListener("touchstart", (event) => { startX = event.changedTouches[0].screenX; }, { passive: true });
  track.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].screenX - startX;
    if (Math.abs(distance) > 45) show(index + (distance < 0 ? 1 : -1));
  }, { passive: true });
  window.addEventListener("resize", adjustHeight);
  show(0);
}

function setupAccordion() {
  document.querySelectorAll("[data-accordion] button").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  });
}

function setupMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;
  const close = () => { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Abrir menu"); };
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  window.addEventListener("resize", () => { if (window.innerWidth >= 860) close(); });
}

function updateOpeningStatus() {
  const element = document.querySelector("#open-status");
  if (!element) return;
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const value = (type) => Number(parts.find((part) => part.type === type)?.value || 0);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const minutes = value("hour") * 60 + value("minute");
  const businessDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const open = businessDays.includes(weekday) && minutes >= 540 && minutes < 1080;
  const nextOpening = () => {
    if (businessDays.includes(weekday) && minutes < 540) return "abre hoje às 09:00";
    if (weekday === "Fri" || weekday === "Sat" || weekday === "Sun") return "abre segunda-feira às 09:00";
    return "abre amanhã às 09:00";
  };
  element.textContent = open ? "Aberto agora · até 18:00" : `Fechado agora · ${nextOpening()}`;
  element.classList.toggle("is-closed", !open);
}

function setupLightbox() {
  const dialog = document.querySelector("[data-lightbox]");
  const opener = document.querySelector("[data-lightbox-open]");
  const closer = document.querySelector("[data-lightbox-close]");
  if (!dialog || !opener || !closer) return;
  opener.addEventListener("click", () => dialog.showModal());
  closer.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
}

function setupReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", () => {
  renderTreatments();
  setupTestimonials();
  setupAccordion();
  setupMenu();
  setupLightbox();
  setupReveal();
  updateOpeningStatus();
  document.querySelector("#copyright-year").textContent = new Date().getFullYear();
  const header = document.querySelector("[data-header]");
  window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", window.scrollY > 4), { passive: true });
});
