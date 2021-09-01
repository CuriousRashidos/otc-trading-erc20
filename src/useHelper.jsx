const useHelper = () => {
  const shortAddr = (address) => {
    return address.substr(0, 5) + "..." + address.substr(38, 41);
  };
  return { shortAddr };
};

export default useHelper;
// sm = 30em, md = 48em, lg = 62em, xl = 80em
