import smoothscroll from 'smoothscroll-polyfill';

//     Polyfill to enable smooth scroll on Safari.
export const onClientEntry = () => {
smoothscroll.polyfill();
}
