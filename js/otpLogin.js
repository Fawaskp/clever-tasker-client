const otpModal = document.getElementById("otp-modal");
const closeModalButton = document.getElementById("close-otp-modal");

function openModal() {
  otpModal.style.display = "block";
  window.location.hash = "modal";
}

function closeModal() {
  otpModal.style.display = "none";
  history.pushState(null, '', window.location.pathname);
}

closeModalButton.addEventListener("click", closeModal);

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#modal") {
    otpModal.style.display = "block";
  } else {
    otpModal.style.display = "none";
  }
});

if (window.location.hash === "#modal") {
  otpModal.style.display = "block";
}

const otpInputs = document.querySelectorAll('input[id^="otp"]');

otpInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      e.target.value = value.replace(/\D/g, "");
    }

    if (e.target.value.length === 1 && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
      otpInputs[index - 1].focus();
    }
  });

  input.addEventListener("paste", (e) => {
    const pastedData = e.clipboardData.getData("Text");
    const numericData = pastedData.replace(/\D/g, "");

    let targetIndex = index;
    for (let i = 0; i < numericData.length; i++) {
      if (targetIndex < otpInputs.length) {
        otpInputs[targetIndex].value = numericData[i];
        targetIndex++;
      }
    }

    if (targetIndex < otpInputs.length) {
      otpInputs[targetIndex].focus();
    }

    e.preventDefault();
  });
});


// OTP form submission handling
document.getElementById("otp-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const otp = [];
    for (let i = 1; i <= 4; i++) {
      otp.push(document.getElementById("otp" + i).value);
    }

    let queryParams = new URLSearchParams(window.location.search);
    const otpValue = otp.join("");
    const email = queryParams.get("email");

    if (otpValue.length === 4) {
      try {
        const response = await fetch(`${AUTH_API_URL}/login/otp/verify/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: otpValue, email }),
        });

        if (response.ok) {
          const tokens = await response.json();
          console.log("Response:> ", tokens);

          setToken(tokens);
          setCurrentUser(tokens.access);
          window.location.href = "index.html";
        } else {
          alert("something went wrong");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please enter the complete OTP.");
    }
  });



// Login with OTP form submission handling
document  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const submitButton = document.getElementById('login-submit-btn');
    const buttonText = document.getElementById('login-submit-btn-text');
    const loadingSpinner = document.getElementById('login-submit-loader');

    buttonText.classList.add('hidden')
    loadingSpinner.classList.remove('hidden')
    submitButton.disabled = true

    const email = document.getElementById("email-field").value;

    fetch(`${AUTH_API_URL}/login/otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server Response:", data);
        openModal();

        const currentHash = window.location.hash;
        history.pushState(null, '', `?email=${email}${currentHash}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      }).finally(()=>{
        buttonText.classList.remove('hidden')
        loadingSpinner.classList.add('hidden')
        submitButton.disabled = false
      });
  });
