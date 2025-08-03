const API_URL = "https://6888d1f5adf0e59551bb8bcb.mockapi.io/database";

// Fungsi membuat kode otomatis
function buatKodeBarang(nama, kategori, merek, urutan) {
  const ambil3 = (text) =>
    text.trim().toUpperCase().replace(/\s+/g, "").substring(0, 3) || "XXX";

  const kodeNama = ambil3(nama);
  const kodeKat = kategori.charAt(0).toUpperCase() || "X";
  const kodeMerk = merek.charAt(0).toUpperCase() || "X";
  const kodeUrut = String(urutan).padStart(3, "0");

  return `${kodeNama}${kodeKat}${kodeMerk}${kodeUrut}`;  // Misal: MILMM001
}


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

  fetch(API_URL)
    .then(res => res.json())
    .then(dataSemua => {
      const jumlah = dataSemua.length + 1;
      const kode = buatKodeBarang(nama, kategori, merek, jumlah);

      const data = {
        kode,
        nama,
        kategori,
        merek,
        hargaLevel1: parseInt(hargaLevel1),
        hargaLevel2: parseInt(hargaLevel2),
        hargaLevel3: parseInt(hargaLevel3)
      };

      return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
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

function importDariExcel() {
  const fileInput = document.getElementById("excelFile");
  const file = fileInput.files[0];
  if (!file) return alert("Pilih file Excel terlebih dahulu!");

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);

    if (rows.length === 0) {
      alert("File Excel kosong atau format tidak sesuai.");
      return;
    }

    // Ambil data dulu untuk tahu jumlah awal
    fetch(API_URL)
      .then(res => res.json())
      .then(existingData => {
        let sukses = 0, gagal = 0;
        let jumlahAwal = existingData.length;

        rows.forEach((item, index) => {
          const nama = item.nama || "";
          const kategori = item.kategori || "";
          const merek = item.merek || "";

          const kode = buatKodeBarang(nama, kategori, merek, jumlahAwal + index + 1);

          const produk = {
            kode,
            nama,
            hargaLevel1: parseInt(item.hargaLevel1) || 0,
            hargaLevel2: parseInt(item.hargaLevel2) || 0,
            hargaLevel3: parseInt(item.hargaLevel3) || 0,
            kategori,
            merek
          };

          fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produk)
          })
          .then(res => {
            if (res.ok) sukses++;
            else gagal++;
            if (index === rows.length - 1) {
              alert(`Import selesai.\nSukses: ${sukses}, Gagal: ${gagal}`);
            }
          })
          .catch(() => {
            gagal++;
            if (index === rows.length - 1) {
              alert(`Import selesai.\nSukses: ${sukses}, Gagal: ${gagal}`);
            }
          });
        });
      });
  };

  reader.readAsArrayBuffer(file);
}

window.onload = isiDatalistKategoriMerek;
