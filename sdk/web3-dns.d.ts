export interface Profile {displayName:string;description:string;addresses:Array<{network:string;addr:string}>;contacts:{email:string;phone:string;telegram:string;twitter:string;discord:string;website:string};metadata:{avatar:string;banner:string;tags:string[]};web_target:string;id_target:string}
export interface Domain {name:string;registered?:boolean;inGrace?:boolean;graceEnds?:number;owner?:string;cid?:string;registry?:string;registryVersion?:1|2;legacy?:boolean;wrapped?:boolean;expiresAt?:number|null;expired?:boolean;profile?:Profile|null;profileError?:string}
export interface Storage {organized:boolean;mfsPath?:string;warning?:string}
export interface Network {code:string;name:string;kind:string;chainId:number|null;symbol:string;decimals:number;testnet:boolean;explorer:string;browserPayable:boolean}
export interface PaymentAddress extends Network {network:string;address:string;uri:string;explorerUrl:string}
/** address/network/payment are the default (or requested) network; addresses lists every verified network for a name. */
export interface Payee {kind:'name'|'address';name:string|null;address:string;network:string;payment:PaymentAddress|null;addresses:PaymentAddress[];evmNetworks?:Network[];owner?:string;expiresAt?:number|null;source?:'on-chain'|'profile';displayName:string;avatar:string;description:string}
export interface WalletRecord {schemaVersion:number;wallet:string;revision:number;createdAt:string;updatedAt:string;profile:Profile;domains:Record<string,unknown>;assets:unknown[];publication:unknown}
export interface Upload {cid:string;profile:Profile;organized:boolean;mfsPath:string;warning?:string;revision?:number}
export interface Registration {name:string;cid:string;records:Profile['addresses'];signature:string;registryVersion:1|2;deadline?:number;nonce?:string;fee:string;registry:string;chainId:number}
export class Web3DNSError extends Error {status:number;data:unknown;constructor(message:string,status:number,data:unknown)}
export class Web3DNS {
 constructor(options?:{baseUrl?:string;fetch?:typeof fetch;timeout?:number});
 request<T=unknown>(path:string,body?:unknown):Promise<T>;
 config():Promise<{chainId:number;registryVersion:1|2;revision?:number;registryReady:boolean;signerReady:boolean;wrapperReady:boolean;chainName:string;registry:string;wrapper:string;wrapperAddress?:string;legacyRegistry:string;registrationEnabled:boolean;paused?:boolean;siteSigner?:string;registrationFee?:string;rpc:boolean;block?:number;explorer:string;gateway:string;readinessError?:string}>;
 health():Promise<{ok:boolean;service:string;mode:string;registrationEnabled:boolean}>;
 search(name:string):Promise<Domain>;resolve(name:string):Promise<Domain>;resolveMany(names:string|string[]):Promise<{results:Array<Domain&{query:string;error?:string}>}>;reverse(address:string):Promise<{name:string|null;address:string;registry?:string}>;
 session():Promise<{session:{address:string;expires:number}|null;isAdmin:boolean}>;domains():Promise<{domains:Domain[];errors:string[]}>;status():Promise<Record<string,unknown>>;
 login(address:string,signMessage:(message:string)=>Promise<string>):Promise<{address:string;isAdmin:boolean;storage:Storage}>;logout():Promise<{ok:boolean}>;
 dnsChallenge(name:string):Promise<{name:string;host:string;value:string;expires:number}>;
 verifyDns(name:string):Promise<{verified:boolean;name:string;method:string}>;verifyEns(name:string):ReturnType<Web3DNS['verifyDns']>;verifySubdomain(name:string):Promise<{verified:boolean;name:string;method:string;parent?:string}>;
 prepareRegistration(input:{name:string;mode?:'native'|'dns'|'ens'|'subdomain';profile?:Partial<Profile>}):Promise<Registration>;
 /** Revision 3 registries return no signature: call renewName(name) with the fee (anyone may renew a name for its holder). */
 prepareRenewal(name:string):Promise<{name:string;revision:number;signature?:string;deadline?:number;fee:string;expiresAt:number;termSeconds:number;registry:string}>;
 /** On a V2 registry this returns only {name}; release by calling deleteName from the owner wallet. */
 prepareRelease(name:string):Promise<{name:string;signature?:string}>;
 /** Original (V1) registry only; throws on V2 registries. */
 prepareLegacyRecords(name:string,profile:Partial<Profile>,baseCid:string):Promise<{name:string;cid:string;baseCid:string;method:'addAddress'|'removeAddress'|'updateNameCid';args:string[];fee:string;done:boolean}>;
 uploadProfile(name:string,profile:Partial<Profile>):Promise<Upload>;
 confirmProfile(name:string,cid:string):Promise<{name:string;cid:string;verified:boolean;publication:unknown;storage:Storage}>;
 payee(nameOrAddress:string,network?:string):Promise<Payee>;
 networks():Promise<{home:string;networks:Network[]}>;
 walletSummary():Promise<{address:string;chainId:number;explorer:string;balance:string|null;receiving:Array<{name:string;eth:string;matches:boolean}>|null;activity:Array<{hash:string;from:string;to:string;value:string;ok:boolean;time:string|null;method:string|null}>|null}>;
 payUrl(nameOrAddress:string,network?:string):string;badgeUrl(name:string):string;
 uploadImage(type:'image/png'|'image/jpeg'|'image/webp',base64:string):Promise<{cid:string;url:string;organized:boolean;warning?:string}>;
 walletProfile():Promise<WalletRecord>;exportWallet():Promise<{wallet:WalletRecord;profiles:Record<string,Profile>}>;
 /** Saves a local draft only; nothing is published. */
 saveWalletProfile(profile:Partial<Profile>,revision?:number):Promise<WalletRecord>;
 /** Saves and publishes to public IPFS. cid is null when publishing failed (see storage.warning). */
 publishWalletProfile(profile:Partial<Profile>,revision?:number):Promise<Omit<Upload,'cid'>&WalletRecord&{cid:string|null;domains:Domain[];storage:Storage}>;
 websiteUrl(name:string):string;identityUrl(name:string):string;
}
