export const uploadFileToS3 = async (file: File) => {
    const { name: fileName, type: fileType } = file;

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);
        formData.append('fileType', fileType);

        const response = await fetch('/api/resume/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to get upload URL: ${response.statusText}`);
        }

        console.log('File uploaded successfully!');
        const data = await response.json();
        console.log('Response:', data);
        const uploadUrl = data.awsURL;
        console.log('awsURL:', uploadUrl);
        return uploadUrl;
    } catch (error) {
        console.error('Error:', error);
        if (error instanceof Error) {
            alert(`Error: ${error.message}`);
        } else {
            alert('An unknown error occurred');
        }
    }
};
