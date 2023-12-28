document.addEventListener('DOMContentLoaded', function () {
  const showPopoutBtn = document.querySelector(".login-btn");
  const formPopout = document.querySelector(".form-popout");
  const hidePopoutBtn = document.querySelector(".form-popout .close-btn");

  const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");

  // Show
  showPopoutBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popout");
  });

  // Hide
  hidePopoutBtn.addEventListener("click", () => {
    showPopoutBtn.click();
  });

  loginSignupLink.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      formPopout.classList.toggle("show-signup", link.id === "signup-link");
    });
  });
});
