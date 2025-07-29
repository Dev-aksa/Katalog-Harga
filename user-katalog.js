const API_URL = "https://6888d1f5adf0e59551bb8bcb.mockapi.io/database";
const tbody = document.querySelector("#tabelBarang tbody");
const searchInput = document.getElementById("search");
const filterKategori = document.getElementById("filterKategori");

let dataBarang = [];

// Cek role
if (localStorage.getItem("role") !== "user") {
  alert("Halaman ini hanya untuk pengguna.");
  location.href = "login.html";
}

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    dataBarang = data;
    renderTabel(data);
    isiFilter(data);
  });

// Tampilkan tabel
function renderTabel(barang) {
  tbody.innerHTML = "";
  barang.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nama}</td>
      <td>Rp ${item.harga}</td>
      <td>${item.kategori}</td>
      <td>${item.merek}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Isi filter kategori
function isiFilter(data) {
  const kategoriUnik = [...new Set(data.map(b => b.kategori))];
  kategoriUnik.forEach(kat => {
    const opt = document.createElement("option");
    opt.value = kat;
    opt.textContent = kat;
    filterKategori.appendChild(opt);
  });
}

// Event pencarian
searchInput.addEventListener("input", () => {
  filterData();
});

// Event filter
filterKategori.addEventListener("change", () => {
  filterData();
});

function filterData() {
  const keyword = searchInput.value.toLowerCase();
  const kategori = filterKategori.value;

  const hasil = dataBarang.filter(item => {
    const cocokNama = item.nama.toLowerCase().includes(keyword);
    const cocokKategori = kategori === "" || item.kategori === kategori;
    return cocokNama && cocokKategori;
  });

  renderTabel(hasil);
}

// Tombol kembali
function kembali() {
  window.location.href = "user-dashboard.html";
}
