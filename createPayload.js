import { beginCell } from '@ton/ton';

function createPayload(domain) {
  const comment = `Buy“${domain}”NFT@pig.tg`;
  const body = beginCell()
    .storeUint(0, 32)
    .storeStringTail(comment)
    .endCell();

  return body.toBoc().toString("base64");
}

const domains = ['act.tg', 'aim.tg', 'ale.tg', 'are.tg', 'arm.tg', 'awe.tg', 'bad.tg', 'bag.tg', 
  'bar.tg', 'bay.tg', 'bee.tg', 'beg.tg', 'big.tg', 'bin.tg', 'boy.tg', 'bra.tg', 
  'bud.tg', 'but.tg', 'cab.tg', 'can.tg', 'cup.tg', 'dad.tg', 'die.tg', 'dig.tg', 
  'dry.tg', 'dug.tg', 'eat.tg', 'end.tg', 'ego.tg', 'elf.tg', 'elm.tg', 'fan.tg', 
  'far.tg', 'fat.tg', 'fed.tg', 'few.tg', 'fig.tg', 'fin.tg', 'gun.tg', 'had.tg', 
  'ham.tg', 'hat.tg', 'has.tg', 'hen.tg', 'him.tg', 'how.tg', 'hum.tg', 'ink.tg', 
  'ion.tg', 'its.tg', 'jar.tg', 'kid.tg', 'kit.tg', 'lag.tg', 'lap.tg', 'leg.tg', 
  'let.tg', 'lie.tg', 'men.tg', 'mix.tg', 'mob.tg', 'mom.tg', 'mud.tg', 'oak.tg', 
  'our.tg', 'out.tg', 'pat.tg', 'pen.tg', 'pie.tg', 'pot.tg', 'put.tg', 'rig.tg', 
  'rip.tg', 'rob.tg', 'rod.tg', 'rug.tg', 'sad.tg', 'sap.tg', 'sat.tg', 'say.tg', 
  'see.tg', 'set.tg', 'she.tg', 'sit.tg', 'sly.tg', 'tea.tg', 'tie.tg', 'tot.tg', 
  'use.tg', 'war.tg', 'was.tg', 'way.tg', 'wet.tg', 'wit.tg'];  // 正确列出所有域名

const payloads = domains.map(domain => ({
  domain,
  payload: createPayload(domain)
}));

console.log(payloads);
