// Proteksi agar hanya admin yang bisa mengakses halaman ini
const role = localStorage.getItem("role");
if (role !== "admin") {
  alert("Akses ditolak. Halaman ini hanya untuk admin.");
  window.location.href = "login.html";
}

// Ambil elemen tabel
const tabel = document.querySelector("#tabelBarang tbody");

// Fetch dan tampilkan data barang dari MockAPI
fetch("https://6888d1f5adf0e59551bb8bcb.mockapi.io/database")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.nama}</td>
        <td>Rp ${item.harga}</td>
        <td>${item.kategori}</td>
        <td>${item.merek}</td>
        <td>
          <button onclick="editBarang('${item.id}')">✏ Edit</button>
          <button onclick="hapusBarang('${item.id}')">🗑 Hapus</button>
        </td>
      `;
      tabel.appendChild(tr);
    });
  });

// Fungsi hapus barang
function hapusBarang(id) {
  if (confirm("Yakin ingin menghapus barang ini?")) {
    fetch(`https://6888d1f5adf0e59551bb8bcb.mockapi.io/database/${id}`, {
      method: "DELETE"
    }).then(() => location.reload());
  }
}

// Fungsi edit barang
function editBarang(id) {
  localStorage.setItem("editId", id);
  window.location.href = "edit.html";
}

// Fungsi logout
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
