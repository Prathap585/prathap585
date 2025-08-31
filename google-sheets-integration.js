// Google Sheets Integration Configuration
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzh1WagGmTg2j4QUk7i8FipF0W_-X2jIhtP5ZkKBVKJ0h0bU2HSQpCL_BLbpgntxDtX/exec";

document
  .getElementById("rsvpForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const loading = document.getElementById("loading");
    const submitBtn = document.querySelector(".submit-btn");
    const confirmationMessage = document.getElementById("confirmationMessage");

    // Show loading state with animation
    loading.style.display = "block";
    submitBtn.disabled = true;
    submitBtn.classList.add("submitting");
    submitBtn.textContent = "Submitting...";

    // Collect form data
    const formData = new FormData(e.target);
    const rsvpData = {
      timestamp: new Date().toISOString(),
      attendance: formData.get("attendance"),
      fullName: formData.get("fullName"),
      contact: formData.get("contact"),
      numberOfPeople: formData.get("numberOfPeople"),
    };

    try {
      // Send data to Google Sheets
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rsvpData),
      });

      // Simulate submission for demo (remove this when using real Google Script)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Hide loading first
      loading.style.display = "none";

      // Create confetti effect
      createConfetti();

      // Get elements
      const form = document.getElementById("rsvpForm");
      const confirmationMessage = document.getElementById(
        "confirmationMessage"
      );

      // Hide form immediately
      form.style.display = "none";

      // Get the selected attendance option
      const selectedAttendance = rsvpData.attendance;
      let messageText = "";
      let backgroundColor = "";
      let shadowColor = "";

      // Customize message and colors based on attendance choice
      if (selectedAttendance === "Yes") {
        messageText =
          "🎉 Thank you for your RSVP! We are looking forward to your presence and celebrating together!";
        backgroundColor = "linear-gradient(135deg, #27ae60, #2ecc71)";
        shadowColor = "rgba(46, 204, 113, 0.3)";
      } else if (selectedAttendance === "Maybe") {
        messageText =
          "🤔 Thank you for your response! We hope you can make it. We'll keep you updated with any details that might help you decide!";
        backgroundColor = "linear-gradient(135deg, #f39c12, #e67e22)";
        shadowColor = "rgba(243, 156, 18, 0.3)";
      } else if (selectedAttendance === "No") {
        messageText =
          "😔 Sorry to miss you! We understand you can't make it. We'll be thinking of you and will share photos from the celebration!";
        backgroundColor = "linear-gradient(135deg, #e74c3c, #c0392b)";
        shadowColor = "rgba(231, 76, 60, 0.3)";
      }

      // Update the confirmation message content and styling
      confirmationMessage.innerHTML = messageText;
      confirmationMessage.style.cssText = `
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        background: ${backgroundColor} !important;
        color: white !important;
        padding: 30px !important;
        border-radius: 15px !important;
        text-align: center !important;
        font-size: 1.2rem !important;
        font-weight: bold !important;
        margin-top: 20px !important;
        box-shadow: 0 5px 15px ${shadowColor} !important;
        position: relative !important;
        z-index: 9999 !important;
        width: 100% !important;
        height: auto !important;
        transform: none !important;
        line-height: 1.5 !important;
    `;

      console.log(
        "✅ Form submitted successfully - showing personalized confirmation!"
      );
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("There was an error submitting your RSVP. Please try again.");

      // Reset button state
      loading.style.display = "none";
      submitBtn.disabled = false;
      submitBtn.classList.remove("submitting");
      submitBtn.textContent = "Submit RSVP";
    }
  });

// Create confetti animation function
function createConfetti() {
  const rsvpSection = document.querySelector(".rsvp-section");
  const colors = ["#d4af37", "#e74c3c", "#27ae60", "#f39c12", "#9b59b6"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti-piece";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 3 + "s";
    confetti.style.animationDuration = Math.random() * 2 + 2 + "s";

    rsvpSection.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 5000);
  }
}

// Form validation and UX improvements
document.querySelectorAll(".form-input").forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value.trim() === "" && this.required) {
      this.style.borderColor = "#e74c3c";
    } else {
      this.style.borderColor = "#ddd";
    }
  });

  input.addEventListener("input", function () {
    if (this.style.borderColor === "rgb(231, 76, 60)") {
      this.style.borderColor = "#ddd";
    }
  });
});
