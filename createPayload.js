// 假设你已经有一个函数可以为单个域名创建payload
function createPayload(domain) {
  const message = `Your comment for ${domain}`;
  return btoa(message); // 使用btoa函数进行base64编码
}

// 列出所有的域名
const domains = [
  'act.tg', 'aim.tg', 'ale.tg', 'are.tg', 'arm.tg', 'awe.tg', 'bad.tg', 'bag.tg', 
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
  'use.tg', 'war.tg', 'was.tg', 'way.tg', 'wet.tg', 'wit.tg'
];

// 为每个域名生成payload
const payloads = domains.map(domain => ({
  domain: domain,
  payload: createPayload(domain)
}));

console.log(payloads);
