const API_URL = "https://6888d1f5adf0e59551bb8bcb.mockapi.io/database";
let semuaProduk = [];

function tampilkanProduk(data) {
  const tbody = document.getElementById("produkTabel");
  tbody.innerHTML = "";

  data.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.nama}</td>
      <td>Rp ${parseInt(item.hargaLevel1 || 0).toLocaleString()}</td>
      <td>Rp ${parseInt(item.hargaLevel2 || 0).toLocaleString()}</td>
      <td>Rp ${parseInt(item.hargaLevel3 || 0).toLocaleString()}</td>
      <td>${item.kategori}</td>
      <td>${item.merek}</td>
    `;
    tbody.appendChild(row);
  });
}

function filterProduk() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const kategori = document.getElementById("kategoriFilter").value;

  const hasil = semuaProduk.filter(p =>
    (p.nama.toLowerCase().includes(keyword) ||
     p.merek.toLowerCase().includes(keyword) ||
     p.kategori.toLowerCase().includes(keyword)) &&
    (kategori === "" || p.kategori === kategori)
  );

  tampilkanProduk(hasil);
}

function isiDropdownKategori(data) {
  const kategoriSet = new Set(data.map(p => p.kategori));
  const select = document.getElementById("kategoriFilter");
  kategoriSet.forEach(kat => {
    const option = document.createElement("option");
    option.value = kat;
    option.textContent = kat;
    select.appendChild(option);
  });
}

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    semuaProduk = data;
    tampilkanProduk(data);
    isiDropdownKategori(data);
  })
  .catch(err => {
    console.error("Gagal memuat data:", err);
    document.getElementById("produkTabel").innerText = "Gagal memuat data!";
  });
