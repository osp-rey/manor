export default function inputBtnContent() {
  const buttons = document.querySelectorAll("[data-input-target]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.dataset.inputContent;
        const input = document.querySelector(btn.dataset.inputTarget);

        if (input) {
          input.value = value;
        }
      });
    });
  }
}
