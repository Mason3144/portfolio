const BlockChain =
  `import * as crypto from "crypto";

interface CalculateHash {
  prevHash: string;
  height: number;
  data: string;
} // class Block의 메소드 caculateHash의 파라미터들을 정의

interface BlockShape extends CalculateHash {
  hash: string;
} // class Block을 위한 hash라는 파라미터를 추가

class Block implements BlockShape {
  // interface BlockShape 을 상속시켜줌
  public readonly hash: string;
  constructor(
    public readonly prevHash: string,
    public readonly height: number,
    public readonly data: string // readonly 옵션을 추가하여 해킹방지
  ) {
    this.hash = this.calculateHash({ prevHash, height, data });
    // 메소드를 이용하여 hash값을 구함
  }
  private calculateHash({ prevHash, height, data }: CalculateHash) {
    // interface CalculateHash 상속
    const toHash = ` +
  "`${prevHash}${height}${data}`" +
  `;
    // argument들을 이용하여 hash값을 정의한후
    return crypto.createHash("sha256").update(toHash).digest("hex");
    // crypto를 이용하여 암호화
  }
} // 이 class를 이용하여 interface BlockShape형태의 obj를 형성

class Blockchain {
  private blocks: Block[];
  // blocks는 class Block형태의 array집단 이라 정의
  constructor() {
    this.blocks = [];
  } // blocks의 초기값은 empty array

  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  } //Block의 인스턴스를 위한 prevHash 값 구하기

  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  } // Block 인스턴스 생성후 Blockchain에 생성된 Block 추가하기

  public getBlock(): readonly Block[] {
    return this.blocks;
  } // Blockchain에 생선된 Block들 확인하는 함수, readonly옵션으로 해킹방지
}

const block = new Blockchain();
block.addBlock("first");
block.addBlock("second");
block.addBlock("third");
//block.getBlock()[0].data = "forth" 와 같은 해킹 불가

console.log(block.getBlock());
/* 결과값
[
  Block {
    prevHash: '',
    height: 1,
    data: 'first',
    hash: 'e301b2a66451b8a27e1bec518a7b7eb713c9d21061de49ee9bff3b98fdbb83e6'
  },
  Block {
    prevHash: 'e301b2a66451b8a27e1bec518a7b7eb713c9d21061de49ee9bff3b98fdbb83e6',
    height: 2,
    data: 'second',
    hash: '5874487ddd240fcab471f9e3a2a8ba6983fd03c17657e562a778f2871814a324'
  },
  Block {
    prevHash: '5874487ddd240fcab471f9e3a2a8ba6983fd03c17657e562a778f2871814a324',
    height: 3,
    data: 'third',
    hash: 'ee3fbc57f4579dd20ddfbbc554a61635f0a9a7e50de5b845d68deb3db63411a5'
  }
]
*/
`;

export default BlockChain;
