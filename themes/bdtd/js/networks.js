async function getAllNetworks() {
  try {
    showLoader();
    const response = await axios.get(`${REMOTE_API_URL}/networks`);
    hideLoader();
    const networks = response.data;
    return networks;
  } catch (errors) {
    hideLoader();
    showMessageError("#networks-page");
    console.error(errors);
  }
}
async function getNetworks() {
  try {
    showLoader();
    const response = await axios.get(
      `${API_BASE_URL}/search?facet[]=network_acronym_str&sort=relevance&limit=0`
    );
    hideLoader();
    const networks = response.data.facets.network_acronym_str;
    return networks;
  } catch (errors) {
    hideLoader();
    showMessageError("#networks-page");
    console.error(errors);
  }
}

function exportsCSV(networks, allNetworks) {
  const btnExport = document.querySelector(".btn-export-csv");
  btnExport.addEventListener("click", () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Convert JSON to CSV & Display CSV
    csvContent = csvContent + ConvertToCSV(networks, allNetworks);
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  });
}

function ConvertToCSV(objArray, allNetworks) {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let csv = "Biblioteca,Instituição,Quantidade de itens";
  csv += "\r\n";
  array.forEach((item) => {
    let line =
      `"${allNetworks.find((n) => n.acronym === item.value).name || ""}"` +
      "," +
      `"${item.value}"` +
      "," +
      item.count;
    line = line.replaceAll("#", "%23");
    csv += line + "\r\n";
  });
  return csv;
}

document.addEventListener("DOMContentLoaded", async () => {
  const allNetworks = await getAllNetworks();
  const networks = await getNetworks();
  new gridjs.Grid({
    columns: [
      {
        name: "Biblioteca",
        sort: true,
      },
      {
        name: "Instituição",
        sort: true,
      },
      {
        name: "Documentos",
        sort: true,
      },
    ],
    search: true,
    pagination: {
      limit: 20,
      summary: false,
    },
    language: {
      search: {
        placeholder: "🔍 Buscar por...",
      },
      pagination: {
        previous: "Anterior",
        next: "Próximo",
        showing: "😃 Mostrando",
        results: () => "Resultado",
      },
    },
    data: networks.map((network) => [
      allNetworks.find((n) => n.acronym === network.value).name || "",
      network.value,
      gridjs.html(
        `<a href='../Search/Results?${network.href}'>${network.count}</a>`
      ),
    ]),
  }).render(document.getElementById("networksWrapper"));
  exportsCSV(networks, allNetworks);
});
