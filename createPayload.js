import { beginCell } from '@ton/ton';

function createPayload(domain) {
  const comment = `Buy“${domain}”NFT@pig.tg`;
  const body = beginCell()
    .storeUint(0, 32)
    .storeStringTail(comment)
    .endCell();

  return body.toBoc().toString("base64");
}

const domains = ['are.tg', 'bad.tg', 'bag.tg', 'bar.tg', 'bay.tg', 'bed.tg', 'bee.tg', 'big.tg', 'bin.tg', 'boy.tg', 'but.tg', 'buy.tg', 'can.tg', 'cap.tg', 'car.tg', 'cat.tg', 'cut.tg', 'dad.tg', 'did.tg', 'dog.tg', 'dot.tg', 'dry.tg', 'eat.tg', 'end.tg', 'fan.tg', 'far.tg', 'fat.tg', 'fee.tg', 'few.tg', 'fig.tg', 'fun.tg', 'gas.tg', 'get.tg', 'god.tg', 'gun.tg', 'hat.tg', 'has.tg', 'her.tg', 'hey.tg', 'him.tg', 'hot.tg', 'how.tg', 'job.tg', 'joy.tg', 'key.tg', 'kid.tg', 'lab.tg', 'leg.tg', 'let.tg', 'lie.tg', 'low.tg', 'man.tg', 'map.tg', 'men.tg', 'mix.tg', 'mom.tg', 'net.tg', 'new.tg', 'not.tg', 'now.tg', 'one.tg', 'our.tg', 'out.tg', 'pen.tg', 'pet.tg', 'pie.tg', 'pig.tg', 'put.tg', 'red.tg', 'run.tg', 'sad.tg', 'see.tg', 'set.tg', 'she.tg', 'sky.tg', 'sun.tg', 'tea.tg', 'top.tg', 'try.tg', 'two.tg', 'use.tg', 'war.tg', 'way.tg', 'win.tg', 'yes.tg', 'you.tg', 'zip.tg', 'zoo.tg'];  // 正确列出所有域名

const payloads = domains.map(domain => ({
  domain,
  payload: createPayload(domain)
}));

console.log(payloads);
