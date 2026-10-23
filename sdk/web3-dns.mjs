export class Web3DNSError extends Error{constructor(message,status,data){super(message);this.name='Web3DNSError';this.status=status;this.data=data;}}
export class Web3DNS{
 constructor({baseUrl=globalThis.location?.origin,fetch:transport=globalThis.fetch,timeout=60000}={}){if(!baseUrl)throw new Error('Set baseUrl in Node.js');const url=new URL(baseUrl);if(!['http:','https:'].includes(url.protocol)||url.username||url.password)throw new Error('Use an HTTP(S) base URL without credentials');this.baseUrl=url.origin;this.fetch=transport;this.timeout=timeout;}
 async request(path,body){const response=await this.fetch(this.baseUrl+'/api/v1/'+path,{method:body===undefined?'GET':'POST',credentials:'include',cache:'no-store',headers:body===undefined?{}:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(this.timeout)});let data;try{data=await response.json();}catch{throw new Web3DNSError('API returned a non-JSON response',response.status,null);}if(!response.ok)throw new Web3DNSError(data.error||'Request failed',response.status,data);return data;}
 config(){return this.request('config');} health(){return this.request('health');}
 search(name){return this.request('search?'+new URLSearchParams({name}));}
 resolve(name){return this.request('resolve?'+new URLSearchParams({name}));}
 resolveMany(names){return this.request('resolve/batch?'+new URLSearchParams({names:[].concat(names).join(',')}));}
 reverse(address){return this.request('reverse?'+new URLSearchParams({address}));}
 session(){return this.request('auth/session');} domains(){return this.request('domains');} status(){return this.request('status');}
 async login(address,signMessage){const {message}=await this.request('auth/challenge',{address});const signature=await signMessage(message);return this.request('auth/verify',{signature});}
 logout(){return this.request('auth/logout',{});}
 dnsChallenge(name){return this.request('verify/dns/challenge',{name});}
 verifyDns(name){return this.request('verify/dns',{name});} verifyEns(name){return this.request('verify/ens',{name});} verifySubdomain(name){return this.request('verify/subdomain',{name});}
 prepareRegistration({name,mode='native',profile={}}){return this.request('register/prepare',{name,mode,profile});}
 prepareRenewal(name){return this.request('renew/prepare',{name});}
 prepareRelease(name){return this.request('release/prepare',{name});}
 prepareLegacyRecords(name,profile,baseCid){return this.request('records/prepare',{name,profile,baseCid});}
 uploadProfile(name,profile){return this.request('profile/upload',{name,profile});}
 confirmProfile(name,cid){return this.request('profile/confirm',{name,cid});}
 payee(to,network){return this.request('payee?'+new URLSearchParams(network?{to,network}:{to}));}
 networks(){return this.request('networks');}
 walletSummary(){return this.request('wallet/summary');}
 payUrl(nameOrAddress,network){return this.baseUrl+'/pay/'+encodeURIComponent(nameOrAddress)+(network?'?network='+encodeURIComponent(network):'');}
 badgeUrl(name){return this.baseUrl+'/badge/'+encodeURIComponent(name)+'.svg';}
 uploadImage(type,data){return this.request('ipfs/image',{type,data});}
 walletProfile(){return this.request('wallet/profile');} exportWallet(){return this.request('wallet/export');}
 saveWalletProfile(profile,revision){return this.request('wallet/profile',{profile,revision});}
 publishWalletProfile(profile,revision){return this.request('wallet/publish',{profile,revision});}
 websiteUrl(name){return this.baseUrl+'/api/v1/resolve/web3/'+encodeURIComponent(name);}
 identityUrl(name){return this.baseUrl+'/api/v1/resolve/id/'+encodeURIComponent(name);}
}
