const dataInput = document.getElementById('dataInput');
const submitButton = document.getElementById('submitButton');

function submitData() {
  const data = dataInput.value;

  fetch('http://localhost:2300/submit-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result.message);
      console.log(data);

      dataInput.value = '';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

submitButton.addEventListener('click', submitData);

dataInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    submitData();
  }
});
