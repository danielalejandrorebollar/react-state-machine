// export const fetchCountries =  () =>
//   fetch('https://restcountries.com/v3.1/region/ame')
//     .then((response) => response.json()); 
export const fetchCountries = async () => {
  try{
  const response =  await fetch('https://restcountries.com/v3.1/region/ame')
  return response.json();
 
  }
    catch(e){
      console.log(e);
      return e
    }
}


// export const fetchCountries = () => {
//   return fetch('https://restcountries.com/v3.1/region/ame')
//     .then((res) => {
//       if (!res.ok) throw new Error('Fetch failed');
//       return res.json();
//     });
// };