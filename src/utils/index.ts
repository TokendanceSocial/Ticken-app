import axios from 'axios';
export const handleAddress = (address: string) => {
  const s = address.slice(0, 6);
  const e = address.slice(address.length - 5);
  return s + '.....' + e;
};
export const renderNftImg = (image: string) => {
  if (image.startsWith('ipfs://')) {
    const idReg = /\/\/.*\//g;
    const match = image?.match(idReg);
    if (match) {
      const idMatch = match[0];
      const id = idMatch.slice(2, idMatch.length - 1);
      const nameIndex = image.lastIndexOf('/');
      const name = image.slice(nameIndex + 1);
      return `https://${id}.ipfs.nftstorage.link/${name}`;
    }
  }
  return image;
};

export async function getMeta(mataURL: string): Promise<{
  image: string;
  location: string;
  description: string;
}> {
  const data = await axios.request({
    method: 'get',
    url: mataURL
  });
  return data.data;
}
