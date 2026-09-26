const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Kiểm tra HTML validation trước
  if (!contactForm.reportValidity()) {
    return;
  }

  // Lấy dữ liệu từ form
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

    // Gửi dữ liệu tới Express
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    // Nếu backend trả lỗi
    if (!response.ok) {
      throw new Error(result.message || "Có lỗi xảy ra.");
    }

    // =========================
    // GỬI THÀNH CÔNG
    // =========================

    console.log("SERVER RESPONSE:", result);

    // Xóa form
    contactForm.reset();

    // Hiện thông báo
    formSuccess.textContent =
      "🎉 Cảm ơn bạn! Lời nhắn đã được gửi thành công 🐾";

    formSuccess.classList.add("show");

    // Ẩn thông báo sau 4 giây
    setTimeout(() => {
      formSuccess.classList.remove("show");
    }, 4000);

  } catch (error) {

    // =========================
    // GỬI THẤT BẠI
    // =========================

    console.error("Contact form error:", error);

    formSuccess.textContent =
      "❌ Không thể gửi lời nhắn. Vui lòng thử lại.";

    formSuccess.classList.add("show");

  } finally {

    // Cho phép bấm lại button
    submitButton.disabled = false;
    submitButton.textContent = "🦴 Gửi lời nhắn";
  }
});