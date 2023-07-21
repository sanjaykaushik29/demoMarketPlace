const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

let addresses = ["0x90F79bf6EB2c4f870365E785982E1f101E93b906", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", "0x90F79bf6EB2c4f870365E785982E1f101E93b906",];

// Hash leaves
let leaves = addresses.map((addr) => keccak256(addr));
console.log(leaves);

// Create tree
let merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const buf2hex = (addr) => "0x" + addr.toString("hex");
console.log("buf2hex", buf2hex(merkleTree.getRoot()));
let rootHash = merkleTree.getRoot().toString("hex"); 

console.log(merkleTree.toString());
console.log(rootHash);

let address = addresses[0];
let hashedAddress = keccak256(address);
console.log(hashedAddress);
let proof = merkleTree.getHexProof(hashedAddress);
console.log(proof);

let v = merkleTree.verify(proof, hashedAddress, rootHash);
console.log(v);