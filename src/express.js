

const verify = require('@noble/ed25519').verify
const fs = require('fs');
const { PublicKey } = require('@solana/web3.js');
const spawn = require('child_process').spawn;
const axios = require('axios')
let messages = []
const express = require('express');
const app = express();
const port = 3000;
const bs58 = require('bs58');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/postyposty', (req, res) => {


    var { message, signature, publicKey } = req.body;
    console.log(req.body);
publicKey = new PublicKey(publicKey);
if (!verify(bs58.decode(signature),bs58.decode( message ), publicKey.toBytes())) throw new Error('Invalid signature!');
messages.push({ message, signature, publicKey });

res.send('done')

});
setInterval(async function(){
for (var object of messages) {
     var { message, signature, publicKey } = object 
    console.log(object);

publicKey = new PublicKey(publicKey);

const  url = "https://api.helius.xyz/v0/addresses/"+publicKey.toBase58()+"/transactions?api-key="
const parseTransactions = async () => {
  const { data } = await axios.get(url)
    console.log("transactions: ", data)
   for (var tx of data ) {
       if (tx.type == 'TRANSFER'){
        console.log(tx.nativeTransfers)
        for (var transfer of tx.nativeTransfers) {
            if (transfer.toUserAccount == "BjNXgzwaCPVN4KvHXthBsVWkWYnCUpebB2NQZTpxuurF" && transfer.amount == 13.8 * 10 ** 9){
             // winner winer chickum dinner   
            }
        }
       }
   }


}
parseTransactions()
console.log(message)
const lines = message.split('\n')
const address = lines[0]
const fee = lines[1]
// glob the ~/Released directory and select a random .png 
for (var file in fs.readdirSync ('/home/stacc/Released')) {
    if (file.endsWith('.png')) {
        var file = file;
        break;
    }

}
// spawn subprocess sudo ./target/release/ord wallet inscribe --destination $(address) --fee-rate 37 ~/released/$(file)
/*
spawn('sudo', ['./target/release/ord', 'wallet', 'inscribe', '--destination', address, '--fee-rate', fee, '/home/ubuntu/Released/' + file], (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(stdout);
    console.log(stderr);
    res.send(stdout);
})

// fs move the file to /home/ubuntu/Inscribed
fs.rename('/home/ubuntu/Released/' + file, '/home/ubuntu/Inscribed/' + file, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('File moved!');
});
*/
}
}, 5000)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
