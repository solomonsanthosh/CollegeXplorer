export const uploadToCloudinary = async (fileUri, fileName, fileType) => {
  try {
    const data = new FormData();
    data.append('file', { uri: fileUri, type: fileType, name: fileName });
    data.append('upload_preset', 'notes'); // Set your Cloudinary upload preset here
    data.append('cloud_name', 'myNotes'); // Set your Cloudinary cloud name here

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/your_cloud_name_here/upload', // Your Cloudinary upload URL
      {
        method: 'POST',
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload file to Cloudinary');
    }

    const json = await response.json();
    return json.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
};
