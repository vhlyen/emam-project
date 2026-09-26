const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

// Google Apps Script Web App URL
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyaVYywywj-2JgKp9j4rekT4H_yDPyTx2UxkPnn7Pbg15ROpKu4yMMz_13cwzJMt1xv/exec";


contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // =========================
  // KIỂM TRA FORM
  // =========================

  if (!contactForm.reportValidity()) {
    return;
  }

  // =========================
  // LẤY DỮ LIỆU
  // =========================

  const data = {
    name: document.getElementById("cf-name").value.trim(),
    email: document.getElementById("cf-email").value.trim(),
    message: document.getElementById("cf-msg").value.trim()
  };

  const submitButton = contactForm.querySelector(
    'button[type="submit"]'
  );

  try {
    // =========================
    // ĐANG GỬI
    // =========================

    submitButton.disabled = true;
    submitButton.textContent = "Đang gửi...";


    // =========================
    // TẠO FORM ẨN
    // =========================

    const hiddenForm = document.createElement("form");

    hiddenForm.method = "POST";
    hiddenForm.action = GOOGLE_SHEET_URL;
    hiddenForm.target = "googleSheetFrame";
    hiddenForm.style.display = "none";


    // Name
    const nameInput = document.createElement("input");
    nameInput.type = "hidden";
    nameInput.name = "name";
    nameInput.value = data.name;


    // Email
    const emailInput = document.createElement("input");
    emailInput.type = "hidden";
    emailInput.name = "email";
    emailInput.value = data.email;


    // Message
    const messageInput = document.createElement("input");
    messageInput.type = "hidden";
    messageInput.name = "message";
    messageInput.value = data.message;


    // Thêm dữ liệu vào form
    hiddenForm.appendChild(nameInput);
    hiddenForm.appendChild(emailInput);
    hiddenForm.appendChild(messageInput);


    // Thêm form vào website
    document.body.appendChild(hiddenForm);


    // =========================
    // TẠO IFRAME ẨN
    // =========================

    let iframe = document.getElementById("googleSheetFrame");

    if (!iframe) {
      iframe = document.createElement("iframe");

      iframe.id = "googleSheetFrame";
      iframe.name = "googleSheetFrame";

      iframe.style.display = "none";

      document.body.appendChild(iframe);
    }


    // =========================
    // GỬI FORM
    // =========================

    hiddenForm.submit();


    // Chờ một chút để Google Apps Script xử lý
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });


    // =========================
    // THÀNH CÔNG
    // =========================

    contactForm.reset();

    formSuccess.textContent =
      "🎉 Cảm ơn bạn! Lời nhắn đã được gửi thành công 🐾";

    formSuccess.classList.add("show");


    // Xóa form tạm
    hiddenForm.remove();


    // Ẩn thông báo sau 4 giây
    setTimeout(() => {
      formSuccess.classList.remove("show");
    }, 4000);


  } catch (error) {

    // =========================
    // LỖI
    // =========================

    console.error("Contact form error:", error);

    formSuccess.textContent =
      "❌ Không thể gửi lời nhắn. Vui lòng thử lại.";

    formSuccess.classList.add("show");

  } finally {

    // =========================
    // ENABLE BUTTON
    // =========================

    submitButton.disabled = false;
    submitButton.textContent = "🦴 Gửi lời nhắn";
  }
});