import { beginCell } from '@ton/ton';

function createPayload(domain) {
  const comment = `Buy“${domain}”NFT@pig.tg`;
  const body = beginCell()
    .storeUint(0, 32)
    .storeStringTail(comment)
    .endCell();

  return body.toBoc().toString("base64");
}

const domains = ['are.tg',
'bad.tg',
'bag.tg',
'bar.tg',
'bay.tg',
'bed.tg',
'bee.tg',
'big.tg',
'bin.tg',
'boy.tg',
'but.tg',
'bin.tg',
'big.tg',
'bed.tg',
'bee.tg',
'bay.tg',
'bar.tg',
'bag.tg',
'bad.tg',
'are.tg',
'dad.tg',
'did.tg',
'dry.tg',
'eat.tg',
'end.tg',
'fan.tg',
'far.tg',
'fat.tg',
'few.tg',
'fig.tg',
'gun.tg',
'hat.tg',
'has.tg',
'him.tg',
'how.tg',
'kid.tg',
'leg.tg',
'let.tg',
'lie.tg',
'men.tg',
'mix.tg',
'mom.tg',
'out.tg',
'our.tg',
'pen.tg',
'pie.tg',
'put.tg',
'sad.tg',
'see.tg',
'set.tg',
'she.tg',
'tea.tg',
'use.tg',
'war.tg'];  // 正确列出所有域名

const payloads = domains.map(domain => ({
  domain,
  payload: createPayload(domain)
}));

console.log(payloads);
