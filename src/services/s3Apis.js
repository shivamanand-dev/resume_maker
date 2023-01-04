export const s3Apis = { s3Put };

async function s3Put(url, data) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: data,
  };
  return await fetch(url, options);
}
