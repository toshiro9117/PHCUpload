document.getElementById('uploadForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    showMessage('Please select a file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    showMessage(`File uploaded successfully. URL: ${data.url}`);
  } catch (error) {
    console.error('Error uploading file:', error);
    showMessage('Error uploading file.');
  }
});

function showMessage(message) {
  document.getElementById('message').innerText = message;
}
