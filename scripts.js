// Simulated backend data for demonstration
let users = [];
let currentUserIndex = null;

function showLogin() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function showSignUp() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showMainMenu() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('account-menu').style.display = 'none';
    document.getElementById('deposit-form').style.display = 'none';
    document.getElementById('withdraw-form').style.display = 'none';
    document.getElementById('transfer-form').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
}

function showAccountMenu() {
    document.getElementById('account-menu').style.display = 'block';
    document.getElementById('deposit-form').style.display = 'none';
    document.getElementById('withdraw-form').style.display = 'none';
    document.getElementById('transfer-form').style.display = 'none';
}

function showDepositForm() {
    document.getElementById('account-menu').style.display = 'none';
    document.getElementById('deposit-form').style.display = 'block';
}

function showWithdrawForm() {
    document.getElementById('account-menu').style.display = 'none';
    document.getElementById('withdraw-form').style.display = 'block';
}

function showTransferForm() {
    document.getElementById('account-menu').style.display = 'none';
    document.getElementById('transfer-form').style.display = 'block';
}

function signUp() {
    const name = document.getElementById('signupName').value;
    const nickname = document.getElementById('signupNickname').value;
    const age = parseInt(document.getElementById('signupAge').value);
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

    if (age < 18) {
        document.getElementById('signupMessage').innerText = "You are underage. You can't create an account.";
        return;
    }

    if (password !== passwordConfirm) {
        document.getElementById('signupMessage').innerText = "Passwords do not match!";
        return;
    }

    for (let user of users) {
        if (user.name === name && user.nickname === nickname) {
            document.getElementById('signupMessage').innerText = "Name or nickname already used.";
            return;
        }
    }

    users.push({ name, nickname, password, balance: 0 });
    document.getElementById('signupMessage').innerText = "Sign up successful!";
    showMainMenu();
}

function login() {
    const name = document.getElementById('loginName').value;
    const nickname = document.getElementById('loginNickname').value;
    const password = document.getElementById('loginPassword').value;

    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name && users[i].nickname === nickname && users[i].password === password) {
            currentUserIndex = i;
            document.getElementById('loginMessage').innerText = "";
            showAccountMenu();
            return;
        }
    }

    document.getElementById('loginMessage').innerText = "Login failed. Incorrect name, nickname, or password.";
}

function checkBalance() {
    if (currentUserIndex !== null) {
        alert("Your current balance: " + users[currentUserIndex].balance);
    }
}

function deposit() {
    const depositAmount = parseInt(document.getElementById('depositAmount').value);
    if (currentUserIndex !== null) {
        users[currentUserIndex].balance += depositAmount;
        document.getElementById('accountMessage').innerText = "Deposit successful!";
        showAccountMenu();
    }
}

function withdraw() {
    const withdrawAmount = parseInt(document.getElementById('withdrawAmount').value);
    if (currentUserIndex !== null) {
        if (withdrawAmount <= users[currentUserIndex].balance) {
            users[currentUserIndex].balance -= withdrawAmount;
            document.getElementById('accountMessage').innerText = "Withdrawal successful!";
        } else {
            document.getElementById('accountMessage').innerText = "Insufficient funds.";
        }
        showAccountMenu();
    }
}

function transfer() {
    const recipientName = document.getElementById('transferRecipient').value;
    const recipientNickname = document.getElementById('transferRecipientNickname').value;
    const transferAmount = parseInt(document.getElementById('transferAmount').value);

    if (currentUserIndex !== null) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].name === recipientName && users[i].nickname === recipientNickname) {
                if (transferAmount <= users[currentUserIndex].balance) {
                    users[currentUserIndex].balance -= transferAmount;
                    users[i].balance += transferAmount;
                    document.getElementById('accountMessage').innerText = "Transfer successful!";
                } else {
                    document.getElementById('accountMessage').innerText = "Insufficient funds.";
                }
                showAccountMenu();
                return;
            }
        }
        document.getElementById('accountMessage').innerText = "Recipient not found.";
        showAccountMenu();
    }
}

function logout() {
    currentUserIndex = null;
    showMainMenu();
}
