import Component from "../../helpers/Component.js";

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    const { parentElement } = props;
    this.routes = [{ nane: "ROOT" }];
    this.parentElement = parentElement;
    this.renderElement = Breadcrumb.createBreadcrumb();
    this.init();
  }

  static createBreadcrumb() {
    const breadcrumbWrapper = document.createElement("section");
    const breadcrumb = document.createElement("div");
    const backButton = document.createElement("button");

    breadcrumbWrapper.classList.add("breadcrumb-container");
    breadcrumb.classList.add("breadcrumbs");
    backButton.classList.add("button-back");

    breadcrumbWrapper.appendChild(breadcrumb);
    breadcrumbWrapper.appendChild(backButton);

    return breadcrumbWrapper;
  }

  init() {
    this.parentElement.appendChild(this.renderElement);
    this.bindEvents();
  }

  bindEvents() {
    const backButton = this.renderElement.querySelector(".button-back");
    backButton.addEventListener("click", () => this.emit("back"));
  }

  forward(route) {
    this.routes.push(route);

    return this;
  }

  back() {
    this.routes.pop();
    return this;
  }

  getParentNode() {
    return this.routes[this.routes.length - 1];
  }

  render() {
    const routeElements = this.routes
      .map((route) => {
        `<span>${route.name}</span>`;
      })
      .join("");

    this.renderElement.querySelector(".breadcrumbs").innerHTML = routeElements;

    return this.renderElement;
  }
}

export default Breadcrumb;
