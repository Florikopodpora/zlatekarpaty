// Script to test JS runtime without JSDOM (pure mock)
const fs = require('fs');
const path = require('path');

// Mock window, document, localStorage
global.window = global;
global.localStorage = {
  getItem: () => null,
  setItem: () => null
};

const domElements = {};
global.document = {
  addEventListener: (event, callback) => {
    if (event === 'DOMContentLoaded') {
      setTimeout(callback, 50);
    }
  },
  getElementById: (id) => {
    if (!domElements[id]) {
      domElements[id] = {
        innerHTML: '',
        innerText: '',
        addEventListener: () => {},
        appendChild: () => {},
        classList: {
          add: () => {},
          remove: () => {},
          toggle: () => {}
        }
      };
    }
    return domElements[id];
  },
  createElement: (tag) => {
    return {
      classList: {
        add: () => {},
        remove: () => {}
      }
    };
  },
  body: {
    appendChild: () => {}
  }
};

console.log("Mocking DOM environment...");

try {
  // Load scripts in order
  eval(fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8'));
  eval(fs.readFileSync(path.join(__dirname, '../js/myBookings.js'), 'utf8'));
  eval(fs.readFileSync(path.join(__dirname, '../js/booking.js'), 'utf8'));
  eval(fs.readFileSync(path.join(__dirname, '../js/payment.js'), 'utf8'));
  eval(fs.readFileSync(path.join(__dirname, '../js/tiktok.js'), 'utf8'));
  eval(fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8'));
  console.log("All JS scripts executed without syntax errors!");
  
  // Wait for DOMContentLoaded to trigger
  setTimeout(() => {
    console.log("DOMContentLoaded event executed successfully!");
    process.exit(0);
  }, 100);
} catch (err) {
  console.error("RUNTIME ERROR DETECTED:", err);
  process.exit(1);
}
