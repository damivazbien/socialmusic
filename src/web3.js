import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and matamask is running.
    //web3 = new Web3(window.web3.currentProvider);
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    console.log("POR AQUÍ PASO");
} else {
    // we are on the server Or the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://ropsten.infura.io/v3/4375928b57154ff79454c41e0220b431'
    );
    web3 = new Web3(provider);
    console.log(web3);
}

export default web3;
