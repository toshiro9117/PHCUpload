const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { bin } = req.query;
  const file = req.body;

  if (!bin || !file) {
    return res.status(400).json({ error: 'Missing bin or file data.' });
  }

  try {
    const response = await fetch(`https://filebin.net/${bin}`, {
      method: 'POST',
      body: file
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const fileUrl = response.url; // Assuming Filebin returns the URL in the response
    res.json({ url: fileUrl });
  } catch (error) {
    console.error('Error uploading file to Filebin:', error);
    res.status(500).json({ error: 'Error uploading file to Filebin.' });
  }
};
