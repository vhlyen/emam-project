require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Google Apps Script Web App URL
const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;

// Cho phép server đọc JSON
app.use(express.json());

// Cho phép server phục vụ website
app.use(express.static(path.join(__dirname, "..")));


// Test API
app.get("/api", (req, res) => {
  res.json({
    message: "Yêu Vải Vụn API is running!"
  });
});


// Nhận contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Kiểm tra dữ liệu
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin."
      });
    }

    // Gửi dữ liệu sang Google Apps Script
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim()
      })
    });

    const result = await response.json();

    // Nếu Google Apps Script báo lỗi
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message || "Không thể lưu vào Google Sheets."
      });
    }

    // Thành công
    console.log("New contact message saved to Google Sheets:", {
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      message: "Lời nhắn đã được gửi thành công!"
    });

  } catch (error) {
    console.error("Contact form error:", error);

    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi gửi lời nhắn."
    });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}`
  );
});