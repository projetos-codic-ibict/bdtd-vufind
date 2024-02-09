async function getAllNetworks() {
  try {
    showLoader();
    const response = await axios.get(`${REMOTE_API_URL}/networks?sourceType=Biblioteca Digital de Teses e Dissertações`);
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

function exportsCSV(allNetworks) {
  const btnExport = document.querySelector(".btn-export-csv");
  btnExport.addEventListener("click", () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Convert JSON to CSV & Display CSV
    csvContent = csvContent + ConvertToCSV(allNetworks);
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  });
}

function ConvertToCSV(allNetworks) {
  let csv = "Biblioteca,Instituição,Quantidade de itens";
  csv += "\r\n";
  allNetworks.forEach((item) => {
    let line =
      `"${item.name || ""}"` +
      "," +
      `"${item.institution}"` +
      "," +
      item.validSize;
    line = line.replaceAll("#", "%23");
    csv += line + "\r\n";
  });
  return csv;
}

document.addEventListener("DOMContentLoaded", async () => {
  const allNetworks = await getAllNetworks();
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
    data: allNetworks.map((network) => [
      network.name,
      network.institution || '---',
      gridjs.html(
        `<a href='../Search/Results?${network.sourceUrl}'>${network.validSize}</a>`
      ),
    ]),
  }).render(document.getElementById("networksWrapper"));
  exportsCSV(allNetworks);
});
