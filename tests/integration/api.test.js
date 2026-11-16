// Calls the real PHP API, which must be running against a database
// loaded from tests/integration/setup.sql (CI does this; see .github/workflows/ci.yml).
const API = process.env.API_URL || "http://127.0.0.1:8000";

async function post(endpoint, body) {
  const res = await fetch(`${API}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  expect(res.status).toBe(200);
  expect(res.headers.get("content-type")).toMatch(/application\/json/);
  return res.json();
}

test("Login.php returns the user for valid credentials", async () => {
  const user = await post("Login.php", { login: "testuser", password: "testpass" });

  expect(user).toEqual({ id: expect.any(Number), firstName: "Test", lastName: "User", error: "" });
  expect(user.id).toBeGreaterThan(0);
});

test("Login.php returns id 0 and an error for a wrong password", async () => {
  const user = await post("Login.php", { login: "testuser", password: "wrong" });

  expect(user).toEqual({ id: 0, firstName: "", lastName: "", error: "No Records Found" });
});

test("a color added with AddColor.php is found by SearchColors.php", async () => {
  const { id } = await post("Login.php", { login: "testuser", password: "testpass" });

  expect(await post("AddColor.php", { color: "Ocean Blue", userId: id })).toEqual({ error: "" });

  const found = await post("SearchColors.php", { search: "ocean", userId: id });
  expect(found.error).toBe("");
  expect(found.results).toContain("Ocean Blue");
});

test("SearchColors.php returns an error and no results when nothing matches", async () => {
  const found = await post("SearchColors.php", { search: "no-such-color", userId: 1 });

  expect(found.error).toBe("No Records Found");
  expect(found).not.toHaveProperty("results");
});
