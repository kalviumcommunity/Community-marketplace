// export const uploadToCloudinary = async (uri) => {
//   try {
//     // Create form data
//     const formData = new FormData();
//     const filename = uri.split('/').pop();
//     const match = /\.(\w+)$/.exec(filename);
//     const type = match ? `image/${match[1]}` : `image`;

//     formData.append('file', {
//       uri,
//       name: filename,
//       type
//     });
    
//     formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // You'll get this from Cloudinary
    
//     // Upload to Cloudinary
//     const response = await fetch(
//       'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload',
//       {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );

//     const data = await response.json();
//     return data.secure_url;
//   } catch (error) {
//     console.error('Error uploading to Cloudinary:', error);
//     throw error;
//   }
// };