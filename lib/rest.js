import axios from 'axios';

const Rest = {
  httpRequest: async (obj) => {
    try{
    let options = {
      method: obj.method,
      url: obj.url,
      headers: obj.headers ||'',
      data: obj.body || '',
      params: obj.params || ''
    }
    let response =  await axios(options);
    return response.data;
    } catch(err){
      throw err;
    } 
  },
  httpRequestAlwaysReturn: async (obj) => {
    try{
    let options = {
      method: obj.method,
      url: obj.url,
      headers: obj.headers ||'',
      data: obj.body || '',
      params: obj.params || ''
    }
    let response =  await axios(options);
    return response.data;
    } catch(err){
      return false;
    } 
  }
}
export default Rest;
