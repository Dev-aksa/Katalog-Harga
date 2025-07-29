const API_URL = "https://6888d1f5adf0e59551bb8bcb.mockapi.io/database";

function tambahBarang() {
  const nama = document.getElementById("nama").value;
  const harga = document.getElementById("harga").value;
  const kategori = document.getElementById("kategori").value;
  const merek = document.getElementById("merek").value;

  if (!nama || !harga || !kategori || !merek) {
    alert("Semua field harus diisi!");
    return;
  }

  const data = { nama, harga, kategori, merek };

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
