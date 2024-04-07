const fs = require('node:fs')

const formData = new URLSearchParams();
formData.append('grant_type', 'client_credentials')
formData.append('client_id', process.env.CLIENT_ID)
formData.append('client_secret', process.env.CLIENT_SECRET)

const getToken = async() => {

  const response = await fetch(process.env.ACCESS_TOKEN_URL,   {
    method: 'POST',
    body: formData
  })

  const { access_token } = await response.json()
  return access_token
}

const getGTFSData = async() => {

  let token = await getToken()

  const response = await fetch(process.env.GTFS_URL, {
    method: 'GET',
    headers:  {Authorization: `Bearer ${token}`}
  })

  const data = await response.arrayBuffer()
  const buffer = Buffer.from(data, 'binary')

  fs.writeFile('/db-data/data.zip', buffer, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('File written successfully');
    }
  });

}

getGTFSData()

