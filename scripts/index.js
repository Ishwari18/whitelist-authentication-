 //1. cnnect metamask to our site . get user's address
 var account = null;
 var contract = null;
 const URI = " ";
 const ABI = [];
 const ADDRESS = "";
 (async () => {
   if (window.ethereum) {
     await window.ethereum.send("eth_requestAccounts");
     window.web3 = new Web3(window.ethereum);

     var accounts = await web3.eth.getAccounts();
     account = accounts[0];
     document.getElementById("wallet-address").textContent = account;

     contract = new web3.eth.Contract(ABI, ADDRESS);
     //updateCurrentCount();
     document.getElementById("mint").onclick = () => {
       contract.methods
         .safeMint(account, URI)
         .send({ from: account, value: "100000000000000" });
     };
   }
 })();