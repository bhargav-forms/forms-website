function toggleForm(showRegister) {
  document.getElementById("login-section").style.display = showRegister ? "none" : "block";
  document.getElementById("register-section").style.display = showRegister ? "block" : "none";
  document.getElementById("msg").innerText = '';
}

function sendOTP() {
  const email = document.getElementById("reg_email").value;
  const username = document.getElementById("reg_username").value;

  if (!email || !username) {
    alert("Please enter both username and email.");
    return;
  }

  fetch("send_otp.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `email=${email}&username=${username}`
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("otp").style.display = "block";
    document.getElementById("verifyBtn").style.display = "block";
    document.getElementById("msg").innerText = data;
  });
}

function verifyOTP() {
  const email = document.getElementById("reg_email").value;
  const otp = document.getElementById("otp").value;

  fetch("verify_otp.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `email=${email}&otp=${otp}`
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("msg").innerText = data;

    if (data.includes("success")) {
      // ✅ Reset fields
      document.getElementById("reg_username").value = "";
      document.getElementById("reg_email").value = "";
      document.getElementById("otp").value = "";

      // ✅ Hide OTP field and button
      document.getElementById("otp").style.display = "none";
      document.getElementById("verifyBtn").style.display = "none";

      // ✅ Switch back to login
      toggleForm(false);
      alert("OTP verified successfully! You can now log in.");
    }
  });
}