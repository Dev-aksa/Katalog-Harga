const API_URL = 'https://6888d1f5adf0e59551bb8bcb.mockapi.io/login';

function loginUser() {
  const uname = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const error = document.getElementById('error');

  fetch(API_URL)
    .then(res => res.json())
    .then(users => {
      const user = users.find(u => u.username === uname && u.password === pass);

      if (user) {
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);

        // ✅ Redirect berdasarkan role
        if (user.role === 'admin') {
          location.href = "dashboard.html";
        } else {
          location.href = "user-dashboard.html"; // << Perbaiki ini
        }
      } else {
        error.style.display = "block";
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      error.style.display = "block";
    });
}
