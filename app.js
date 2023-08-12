/**
 * The function `downloadPDF` creates a link element with attributes for downloading a PDF file.
 */
function downloadPDF() {
  let link = document.createElement("a");
  link.setAttribute("download", "Oscar-Lopez-CV.pdf");
  link.setAttribute("href", "media/files/Oscar-Lopez-CV.pdf");
  link.click();
}

/* The code snippet defines a constructor function called `TxtType`. This function takes three
parameters: `el`, `toRotate`, and `period`. */
let TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

/* The `TxtType.prototype.tick` function is responsible for animating the text typing effect. */
TxtType.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  let that = this;
  let delta = 100 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

/* The `window.onload` function is an event handler that is triggered when the window has finished
loading all its content. In this specific code snippet, the `window.onload` function is used to
initialize a text typing effect on elements with the class "typewrite". */
window.onload = function () {
  let elements = document.getElementsByClassName("typewrite");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-type");
    let period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  let css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML =
    ".typewrite > .wrap { border-right: 1rem solid #fff; color: #fdfcdc; font-style: italic;}";

  document.body.appendChild(css);
};
