const getFlagFromCountry = (c: string) =>
  c.replace(/./g,(ch)=>String.fromCodePoint(
    0x1f1a5+ch.toUpperCase().charCodeAt(0)
  ));

export default  getFlagFromCountry;