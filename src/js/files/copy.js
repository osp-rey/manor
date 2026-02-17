export default function copy() {
  const buttons = document.querySelectorAll("[data-copy]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.dataset.copy;

        const tooltip = tippy(btn, {
          content: "Скопировано",
          trigger: "manual",
        });
        tooltip.show();

        setTimeout(() => {
          tooltip.hide();
        }, 1000);
        navigator.clipboard.writeText(value).then(() => {
          tooltip.show();

          setTimeout(() => {
            tooltip.hide();
          }, 1000);
        });
      });
    });
  }
}
