// ===== Select Elements =====
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const strengthText = document.getElementById("strengthText");

// ===== Character Sets =====
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_%[]{}<>?/";

// ===== Update Length Display =====
lengthValue.textContent = lengthSlider.value;

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
    updateStrength();
});

// ===== Generate Password =====
function generatePassword() {
    let length = +lengthSlider.value;
    let charset = "";
    let password = "";

    if (uppercaseCheck.checked) charset += UPPERCASE;
    if (lowercaseCheck.checked) charset += LOWERCASE;
    if (numbersCheck.checked) charset += NUMBERS;
    if (symbolsCheck.checked) charset += SYMBOLS;

    if (charset === "") {
        passwordInput.value = "Select at least one option";
        strengthText.textContent = "Weak";
        strengthText.style.color = "#ef4444";
        return;
    }

    // Ensure at least one character from each selected type
    if (uppercaseCheck.checked) password += randomChar(UPPERCASE);
    if (lowercaseCheck.checked) password += randomChar(LOWERCASE);
    if (numbersCheck.checked) password += randomChar(NUMBERS);
    if (symbolsCheck.checked) password += randomChar(SYMBOLS);

    // Fill remaining length
    for (let i = password.length; i < length; i++) {
        password += randomChar(charset);
    }

    // Shuffle for randomness
    password = shuffleString(password);

    passwordInput.value = password;
    updateStrength();
}

// ===== Helpers =====
function randomChar(str) {
    return str[Math.floor(Math.random() * str.length)];
}

function shuffleString(str) {
    return str
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
}

// ===== Copy to Clipboard =====
copyBtn.addEventListener("click", () => {
    if (!passwordInput.value) return;

    navigator.clipboard.writeText(passwordInput.value);

    copyBtn.textContent = "Copied ✔";
    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 1200);
});

// ===== Strength Checker =====
function updateStrength() {
    let length = +lengthSlider.value;
    let score = 0;

    if (uppercaseCheck.checked) score++;
    if (lowercaseCheck.checked) score++;
    if (numbersCheck.checked) score++;
    if (symbolsCheck.checked) score++;
    if (length >= 12) score++;

    if (score <= 2) {
        strengthText.textContent = "Weak";
        strengthText.style.color = "#ef4444";
    } else if (score <= 4) {
        strengthText.textContent = "Medium";
        strengthText.style.color = "#facc15";
    } else {
        strengthText.textContent = "Strong";
        strengthText.style.color = "#22c55e";
    }
}

// ===== Event Listeners =====
generateBtn.addEventListener("click", generatePassword);

[uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck].forEach(cb =>
    cb.addEventListener("change", updateStrength)
);

// Initial strength
updateStrength();
