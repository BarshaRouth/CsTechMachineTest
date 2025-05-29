import axios from 'axios';
import { useState } from 'react';

export default function UploadCSV() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('file', file); // `file` is the selected file from input

  const token = localStorage.getItem('token'); // ✅ Fetch token from localStorage

  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}` // ✅ Send token in header
      }
    };

    const response = await axios.post(
      'http://localhost:5000/api/tasks/upload',
      formData,
      config
    );

    console.log('Upload success:', response.data);
    alert('Upload successful!');
  } catch (error) {
    console.error('Upload failed:', error);
    alert('Upload failed: ' + error.response?.data?.message || error.message);
  }
};


  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload CSV</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" accept=".csv, .xlsx, .xls" onChange={(e) => setFile(e.target.files[0])} className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Upload
        </button>
      </form>
    </div>
  );
}
