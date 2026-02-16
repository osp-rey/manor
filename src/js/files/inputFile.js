export default function inputFile() {
  const controls = document.querySelectorAll(".input-control-file");

  if (controls.length) {
    controls.forEach((control) => {
      const input = control.querySelector(".input-file");
      const label = control.querySelector(".label-file");
      const labelText = label.querySelector("span");

      input.addEventListener("change", (e) => {
        if (e.target.files[0]) {
          labelText.textContent = e.target.files[0].name;
        }
      });
    });
  }
}
