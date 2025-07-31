const API_URL = "https://6888d1f5adf0e59551bb8bcb.mockapi.io/database";

function tambahBarang() {
  const nama = document.getElementById("nama").value.trim();
  const hargaLevel1 = document.getElementById("hargaLevel1").value.trim();
  const hargaLevel2 = document.getElementById("hargaLevel2").value.trim();
  const hargaLevel3 = document.getElementById("hargaLevel3").value.trim();
  const kategori = document.getElementById("kategori").value.trim();
  const merek = document.getElementById("merek").value.trim();

  if (!nama || !hargaLevel1 || !hargaLevel2 || !hargaLevel3 || !kategori || !merek) {
    alert("Semua field harus diisi!");
    return;
  }

  const data = {
    nama,
    kategori,
    merek,
    hargaLevel1: parseInt(hargaLevel1),
    hargaLevel2: parseInt(hargaLevel2),
    hargaLevel3: parseInt(hargaLevel3)
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(() => {
      alert("Barang berhasil ditambahkan!");
      window.location.href = "katalog.html";
    })
    .catch(error => {
      alert("Gagal menambahkan barang!");
      console.error(error);
    });
}

function isiDatalistKategoriMerek() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const kategoriSet = new Set();
      const merekSet = new Set();

      data.forEach(item => {
        if (item.kategori) kategoriSet.add(item.kategori);
        if (item.merek) merekSet.add(item.merek);
      });

      const listKategori = document.getElementById("listKategori");
      const listMerek = document.getElementById("listMerek");

      kategoriSet.forEach(kat => {
        const option = document.createElement("option");
        option.value = kat;
        listKategori.appendChild(option);
      });

      merekSet.forEach(merk => {
        const option = document.createElement("option");
        option.value = merk;
        listMerek.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Gagal mengambil kategori/merek:", error);
    });
}

window.onload = isiDatalistKategoriMerek;
