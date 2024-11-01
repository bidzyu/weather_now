export const checkScroll = () => {
  return (
    window.innerWidth - document.body.clientWidth !== 0 ||
    document.documentElement.scrollHeight > window.innerHeight ||
    document.body.clientHeight > window.innerHeight
  );
};
