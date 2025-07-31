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
      <td>
        <button class="edit-btn" onclick="tampilkanFormEdit('${item.id}')">✏️</button>
        <button class="delete-btn" onclick="hapusProduk('${item.id}')">🗑️</button>
      </td>
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

function hapusProduk(id) {
  if (confirm("Yakin ingin menghapus barang ini?")) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        alert("Barang dihapus.");
        location.reload();
      })
      .catch(console.error);
  }
}

function tampilkanFormEdit(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("editId").value = data.id;
      document.getElementById("editNama").value = data.nama;
      document.getElementById("editLevel1").value = data.hargaLevel1 || 0;
      document.getElementById("editLevel2").value = data.hargaLevel2 || 0;
      document.getElementById("editLevel3").value = data.hargaLevel3 || 0;
      document.getElementById("editKategori").value = data.kategori;
      document.getElementById("editMerek").value = data.merek;
      document.getElementById("editForm").style.display = "block";
      window.scrollTo(0, document.body.scrollHeight);
    });
}

function simpanEdit() {
  const id = document.getElementById("editId").value;
  const data = {
    nama: document.getElementById("editNama").value,
    hargaLevel1: parseInt(document.getElementById("editLevel1").value),
    hargaLevel2: parseInt(document.getElementById("editLevel2").value),
    hargaLevel3: parseInt(document.getElementById("editLevel3").value),
    kategori: document.getElementById("editKategori").value,
    merek: document.getElementById("editMerek").value,
  };

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(() => {
      alert("Perubahan disimpan!");
      location.reload();
    })
    .catch(err => {
      alert("Gagal menyimpan");
      console.error(err);
    });
}

function batalEdit() {
  document.getElementById("editForm").style.display = "none";
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
