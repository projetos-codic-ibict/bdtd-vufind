async function getIndicatorsByType() {
  const data = await getIndicatorsBy(
    "search?type=AllFields&facet[]=format&facet[]=institution&sort=relevance&page=1&limit=0"
  );
  return data;
}

function fillInstitution(institutions) {
  const articlesElement = document.querySelector("#institution");
  articlesElement.textContent = formatNumber(institutions.length);
}

function fillMasterThesis(value) {
  const masterThesisElement = document.querySelector("#masterThesis");
  masterThesisElement.textContent = formatNumber(value);
}


function fillDoctorThesis(value) {
  const doctorThesisElement = document.querySelector("#doctorThesis");
  doctorThesisElement.textContent = formatNumber(value);
}



function fillTotal(total) {
  const totalElement = document.querySelector("#total");
  totalElement.textContent = formatNumber(total);
}

function getMasterThesisCount(formats) {
  const masterThesis = formats.filter(
    (format) => format.value == "masterThesis"
  );
  let value = 0;
  value = masterThesis.reduce((value, item) => value + item.count, 0);
  return value;
}

function getDoctorThesisCount(formats) {
  const doctorThesis = formats.filter((format) => format.value == "doctoralThesis");
  let value = 0;
  value = doctorThesis.reduce((value, item) => value + item.count, 0);
  return value;
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await getIndicatorsByType();
  fillInstitution(data.facets.institution);
  const masterThesisCount = getMasterThesisCount(data.facets.format);
  fillMasterThesis(masterThesisCount);
  const doctorThesisCount = getDoctorThesisCount(data.facets.format);
  fillDoctorThesis(doctorThesisCount);
  fillTotal(masterThesisCount + doctorThesisCount);
});
