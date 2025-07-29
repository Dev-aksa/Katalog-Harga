// Cek role: hanya user yang boleh masuk ke halaman ini
const role = localStorage.getItem("role");
if (role !== "user") {
  alert("Halaman ini hanya untuk pengguna.");
  window.location.href = "login.html";
}

// Fungsi buka katalog khusus user
function bukaKatalog() {
  window.location.href = "user-katalog.html";
}

// Fungsi logout
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
