/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");

// Stand-in for XMLHttpRequest: records the request so a test can answer it.
let lastRequest;
class FakeXhr {
  open(method, url) { this.method = method; this.url = url; }
  setRequestHeader() {}
  send(body) { this.body = body; lastRequest = this; }
  respond(json) {
    this.readyState = 4;
    this.status = 200;
    this.responseText = JSON.stringify(json);
    this.onreadystatechange();
  }
}

beforeAll(() => {
  window.XMLHttpRequest = FakeXhr;
  // Load code.js the same way the pages do: as a classic <script>.
  const script = document.createElement("script");
  script.textContent = fs.readFileSync(path.join(__dirname, "../../public/js/code.js"), "utf8");
  document.head.appendChild(script);
});

test("doLogin posts the typed credentials as JSON to Login.php", () => {
  document.body.innerHTML = `
    <input id="loginName" value="rick">
    <input id="loginPassword" value="COP4331">
    <span id="loginResult"></span>`;

  doLogin();

  expect(lastRequest.method).toBe("POST");
  expect(lastRequest.url).toMatch(/\/Login\.php$/);
  expect(JSON.parse(lastRequest.body)).toEqual({ login: "rick", password: "COP4331" });
});

test("doLogin shows an error when the API rejects the login", () => {
  document.body.innerHTML = `
    <input id="loginName" value="rick">
    <input id="loginPassword" value="wrong">
    <span id="loginResult"></span>`;

  doLogin();
  lastRequest.respond({ id: 0, firstName: "", lastName: "", error: "No Records Found" });

  expect(document.getElementById("loginResult").textContent).toBe("User/Password combination incorrect");
});

test("addColor posts the new color to AddColor.php and confirms it", () => {
  document.body.innerHTML = `
    <input id="colorText" value="Teal">
    <span id="colorAddResult"></span>`;

  addColor();
  expect(lastRequest.url).toMatch(/\/AddColor\.php$/);
  expect(JSON.parse(lastRequest.body)).toEqual({ color: "Teal", userId: 0 });

  lastRequest.respond({ error: "" });
  expect(document.getElementById("colorAddResult").textContent).toBe("Color has been added");
});

test("searchColor lists each result on its own line", () => {
  document.body.innerHTML = `
    <input id="searchText" value="red">
    <span id="colorSearchResult"></span>
    <p id="colorList"></p>`;

  searchColor();
  expect(JSON.parse(lastRequest.body)).toEqual({ search: "red", userId: 0 });

  lastRequest.respond({ results: ["Red", "Dark Red"], error: "" });
  const list = document.getElementById("colorList");
  expect(list.querySelectorAll("br")).toHaveLength(1);
  expect(list.textContent).toMatch(/Red\s+Dark Red/);
});
