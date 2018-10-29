export default class PlusAddressFactory {

  static construct(srcAddress, signupDomainOrUrlString, diceWord) {

    if (!srcAddress || !signupDomainOrUrlString) { return undefined; }

    const emComps = srcAddress.split('@');
    const emUnOrUndef = emComps.length > 1 && emComps[0].length > 0 ? emComps[0] : undefined;
    const emDom = emComps[emComps.length - 1];

    let suDom = extractDomainNameOrUndef(signupDomainOrUrlString) || signupDomainOrUrlString;

    const resPrefix = emUnOrUndef !== undefined ? emUnOrUndef + '+' : '';
    const resUn = resPrefix + suDom + '-' + diceWord
    return resUn + '@' + emDom;
  }
}

function extractDomainNameOrUndef(signupDomainOrUrlString) {
  try {
    return extractDomainNameOrThrow(signupDomainOrUrlString);
  } catch (e) { }
  return undefined;
}

function extractDomainNameOrThrow(urlString) {
  const suUrl = new URL(urlString.toLocaleLowerCase());
  let hostnameComps = suUrl.hostname.split('.');
  if (hostnameComps[0] === 'www') {
    hostnameComps = hostnameComps.slice(1);
  }
  return hostnameComps.join('.');
}