# webdriverio-tests

Цей проект містить автоматизовані end-to-end тести, створені з використанням **WebdriverIO**, що перевіряють функціональність популярних вебсайтів, таких як **WebdriverIO Docs** і **GitHub**.

# Структура 
HW1_WEBDRIVERIO/
1. test/ specs/
 - final-homework.e2e.js 
 - test.e2e.js
2. wdio.conf.js
3. package.json
4. package-lock.json
5. gitignore
6. README.md

## test.e2e.js — WebdriverIO Docs Tests

Цей файл містить **серію тестів для офіційного сайту WebdriverIO**, зокрема:

- Перевірка завантаження головної сторінки.
- Навігація до API-документації через верхнє меню.
- Перевірка заголовків (`<h1>`), breadcrumb-елементів, та існування лінків на сторінці.
- Тестування пошукового інтерфейсу (введення та очищення запитів).
- Перевірка елементів у футері.
- Валідація клікабельності лінків.
- Очікування на заголовки при переході між сторінками (`waitUntil`).


---

## final-homework.e2e.js — GitHub Functional Flows

Цей файл містить **кілька інтеграційних тестів для GitHub.com**, що охоплюють:

### 🔹 GitHub Sign-Up Flow
- Перехід на форму реєстрації.
- Заповнення email, пароля, нікнейму, вибір країни.
- Перевірка доступності кнопки "Continue" і натискання.

### 🔹 Copilot CTA (Call to Action)
- Скрол до нижнього блоку з Copilot-пропозицією.
- Перевірка кнопки "Try now", переходу на сторінку підписки Copilot Pro.

### 🔹 GitHub Newsletter Subscribe
- Перехід до сторінки підписки на розсилку.
- Заповнення email, вибір країни.
- Активування чекбоксу згоди.
- Надсилання форми та перевірка підтвердження.

### 🔹 GitHub Search
- Відкриття глобального пошуку.
- Введення запиту `"act"` та перевірка наявності релевантних результатів.

### 🔹 GitHub Pricing & Compare Features
- Перехід на сторінку `/pricing`.
- Скрол до блоку `Compare all features`.
- Перевірка заголовка `Compare features`.

---

## Як запускати тести

1. Встановити залежності:
   ```bash
   npm install

2. Запустити всі тести 
   ```bash
   npm run wdio

## Використано:
- WebdriverIO з @wdio/globals
- ChromeDriver як сервіс
- Очікування (waitForDisplayed, waitUntil)
- Робота з DOM (getText, isDisplayed scrollIntoView, click та інші)

