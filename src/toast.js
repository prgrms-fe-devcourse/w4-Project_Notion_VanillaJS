export default function toast(job) {
  const $toast = document.querySelector("#toast");

  $toast.innerHTML = `${job} now!`;

  $toast.classList.toggle("show");
  window.setTimeout(() => $toast.classList.toggle("show"), 2000);
}
