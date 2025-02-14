class CreateCanvas {
  constructor(DOMID: string) {
    let domId = "";
    if (DOMID[0] !== "#") {
      domId = "#" + DOMID;
    } else {
      domId = DOMID;
    }
    const dom = document.querySelector(domId);
  }
}
