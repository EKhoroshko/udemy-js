const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await res.json();
}

const getResurce = async (url) => {
  return await axios.get(url);
}

export { postData, getResurce }