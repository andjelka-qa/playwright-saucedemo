##  Playwright Saucedemo Test Suite

Automated end-to-end tests for [SauceDemo](https://www.saucedemo.com/) using Playwright and the Page Object Model.

---

###  Technologies

- [Playwright](https://playwright.dev/)
- TypeScript
- Page Object Model
- HTML Test Reports

---

###  Setup

```bash
npm install
npx playwright install
```

---

###  Run All Tests

```bash
npx playwright test
```

---

###  Run One Spec File

```bash
npx playwright test tests/CartTest.spec.ts
```

---

###  Run in One Browser Only

```bash
npx playwright test --project=Firefox
```

Other options:

```bash
--project=Chromium
--project=WebKit
```

---

###  Run One Test by Name

```bash
npx playwright test -g "Cart shows added item"
```

---

###  View HTML Report

```bash
npx playwright show-report
```

---

###  Dummy Accounts

| Role          | Username          | Password       |
|---------------|-------------------|----------------|
| Standard User | `standard_user`   | `secret_sauce` |
| Locked Out    | `locked_out_user` | `secret_sauce` |