const passwordInput = document.getElementById('passwordInput');
const meterFill = document.getElementById('meterFill');
const strengthText = document.getElementById('strengthText');

const ruleLength = document.getElementById('ruleLength');
const ruleUpper = document.getElementById('ruleUpper');
const ruleNumber = document.getElementById('ruleNumber');
const ruleSymbol = document.getElementById('ruleSymbol');

passwordInput.addEventListener('input', function () {
    const pwd = passwordInput.value;
    const hasLength = pwd.length >= 8;
    const hasUpper = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pwd);
    updateRule(ruleLength, hasLength);
    updateRule(ruleUpper, hasUpper);
    updateRule(ruleNumber, hasNumber);
    updateRule(ruleSymbol, hasSymbol);
    let score = 0;
    if (hasLength) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;
    if (pwd.length === 0) {
        meterFill.style.width = '0%';
        strengthText.textContent = 'Введіть пароль для оцінки';
        strengthText.style.color = 'var(--text-muted)';
    } else if (score <= 1) {
        meterFill.style.width = '25%';
        meterFill.style.backgroundColor = 'var(--neon-red)';
        strengthText.textContent = 'Слабкий пароль ❌';
        strengthText.style.color = 'var(--neon-red)';
    } else if (score <= 3) {
        meterFill.style.width = '65%';
        meterFill.style.backgroundColor = '#eab308';
        strengthText.textContent = 'Середній пароль ⚠️';
        strengthText.style.color = '#eab308';
    } else {
        meterFill.style.width = '100%';
        meterFill.style.backgroundColor = 'var(--neon-green)';
        strengthText.textContent = 'Дуже надійний пароль! ✅';
        strengthText.style.color = 'var(--neon-green)';
    }
});

function updateRule(element, isValid) {
    if (isValid) {
        element.classList.add('valid');
    } else {
        element.classList.remove('valid');
    }
}
const generatedPassword = document.getElementById('generatedPassword');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
lengthSlider.addEventListener('input', function () {
    lengthValue.textContent = lengthSlider.value;
});
function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let result = '';
    const length = lengthSlider.value;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }

    generatedPassword.value = result;
}

generateBtn.addEventListener('click', generatePassword);


copyBtn.addEventListener('click', function () {
    if (!generatedPassword.value) return;

    navigator.clipboard.writeText(generatedPassword.value);
    copyBtn.textContent = 'Скопійовано! ✓';

    setTimeout(() => {
        copyBtn.textContent = 'Копіювати';
    }, 2000);
});
generatePassword();
const quizData = [
    {
        question: "Який із цих паролів є найстійкішим до зламу?",
        options: ["12345678", "Password2024", "k9#mP!8$xL2"],
        correct: 2
    },
    {
        question: "Що таке двофакторна автентифікація (2FA)?",
        options: [
            "Використання двох однакових паролів",
            "Додаткове підтвердження (код з SMS/додатка)",
            "Вхід з двох різних пристроїв одночасно"
        ],
        correct: 1
    },
    {
        question: "Що робити, якщо вам надіслали лінк на «виграш» з невідомого номера?",
        options: [
            "Перейти та ввести дані картки",
            "Переслати всім друзям",
            "Ігнорувати та видалити повідомлення"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const quizContainer = document.getElementById('quizContainer');
const quizResult = document.getElementById('quizResult');
const scoreText = document.getElementById('scoreText');
const restartQuizBtn = document.getElementById('restartQuizBtn');

function loadQuestion() {
    quizFeedback.textContent = '';
    const q = quizData[currentQuestion];
    quizQuestion.textContent = `${currentQuestion + 1}. ${q.question}`;
    quizOptions.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => selectAnswer(index, btn));
        quizOptions.appendChild(btn);
    });
}

function selectAnswer(selectedIndex, clickedBtn) {
    const q = quizData[currentQuestion];
    const allButtons = quizOptions.querySelectorAll('.quiz-btn');

    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
        clickedBtn.classList.add('correct');
        quizFeedback.textContent = 'Правильно! 🎉';
        quizFeedback.style.color = 'var(--neon-green)';
        score++;
    } else {
        clickedBtn.classList.add('wrong');
        allButtons[q.correct].classList.add('correct');
        quizFeedback.textContent = 'Неправильно ❌';
        quizFeedback.style.color = 'var(--neon-red)';
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    quizContainer.classList.add('hidden');
    quizResult.classList.remove('hidden');
    scoreText.textContent = `Ваш результат: ${score} з ${quizData.length}`;
}

restartQuizBtn.addEventListener('click', function () {
    currentQuestion = 0;
    score = 0;
    quizResult.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
});

loadQuestion();