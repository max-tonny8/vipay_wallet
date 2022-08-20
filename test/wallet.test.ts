import * as Ethereum from '../src/wallet/ethereum';
import * as Solana from '../src/wallet/solana';
import * as Bitcoin from '../src/wallet/bitcoin';
import * as Ripple from '../src/wallet/ripple';


interface EthWallet {
    address: string;
    privateKey: string;
    mnemonic: string;
    nonce: number;
}

interface SolWallet {
    address: string;
    privateKey: string;
    mnemonic: string;
}

interface BtcWallet {
    address: string;
    privateKey: string;
    mnemonic: string;
}

interface RootRippleWallet {
    wallet: {
        address: string;
        secret: string;
    }
}

interface NormalRippleWallet {
    publicKey: string;
    privateKey: string;
    classicAddress: string;
    seed: string;
}

describe('Ethereum Wallet Test', () => {

    let createdWallet: EthWallet, importedWallet: EthWallet;

    it('Create Wallet', async () => {
        createdWallet = await Ethereum.createWallet({
        })

        expect(typeof createdWallet).toBe('object');
    })

    it('Import Wallet', async () => {
        importedWallet = await Ethereum.importWallet({
            mnemonic: createdWallet.mnemonic,
            nonce: createdWallet.nonce
        })

        expect(importedWallet).toEqual(createdWallet);
    })

    it('Create master seed & account', async () => {
        const seed = await Ethereum.createMasterSeed({
            mnemonic: createdWallet.mnemonic
        })

        const account = await Ethereum.createAccount({
            rootKey: seed,
            nonce: 0
        })

        expect(typeof account).toBe('object');
    })

    it('Import Account', async () => {
        const account = await Ethereum.importAccount({
            privateKey: importedWallet.privateKey
        })

        expect(typeof account).toBe('object');
    })

    it('Get Balance', async () => {
        const balance = await Ethereum.getBalance({
            defaultProviderRpcUrl: 'https://bsc-dataseed1.defibit.io/',
            address: '0x60610c2756fEDfbfB32E94D433cFD08740683771'
        })

        expect(typeof balance).toBe('object');
    })
})

describe('Solana Test', () => {
    let createdWallet: SolWallet, importedWallet: SolWallet;

    it('Create Wallet', async () => {
        const wallet = await Solana.createWallet({});

        createdWallet = wallet;

        expect(typeof wallet).toBe('object');
    })

    it('Import Wallet', async () => {
        const wallet = await Solana.importWallet({
            mnemonic: createdWallet.mnemonic
        })

        importedWallet = wallet;

        expect(importedWallet).toEqual(wallet);
    })

    it('Import Account', async () => {
        const account = await Solana.importAccount({
            privateKey: importedWallet.privateKey
        });

        expect(typeof account).toBe('object');
    })

    it('Get Balance', async () => {
        const solBalance = await Solana.getBalance({
            rpcUrl: 'https://api.devnet.solana.com',
            address: '9DSRMyr3EfxPzxZo9wMBPku7mvcazHTHfyjhcfw5yucA'
        })

        const tokenBalance = await Solana.getBalance({
            rpcUrl: 'https://api.devnet.solana.com',
            address: '9DSRMyr3EfxPzxZo9wMBPku7mvcazHTHfyjhcfw5yucA',
            tokenAddress: '6xRPFqbtpkS7iVd9SysZDXdYn6iWceXF7p3T91N3EcAc'
        })

        expect(typeof solBalance).toBe('object');
        expect(typeof tokenBalance).toBe('object');
    })
})

describe('Test Bitcoin', () => {

    let createdWallet: BtcWallet, importedWallet: BtcWallet, randomWallet: BtcWallet;

    it('Create Wallet', async () => {
        createdWallet = await Bitcoin.createWallet({
            network: 'bitcoin'
        })

        randomWallet = await Bitcoin.createWallet({
            network: 'bitcoin'
        })
        expect(typeof createdWallet).toBe('object');
    })

    it('Import Wallet', async () => {
        importedWallet = await Bitcoin.importWallet({
            network: 'bitcoin',
            mnemonic: createdWallet.mnemonic
        })
        expect(typeof importedWallet).toBe('object');
    })

    it('Get balance', async () => {
        const balance = await Bitcoin.getBalance({
            address: '34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo'
        })
        expect(typeof balance).toBe('object');
    })
})

describe('Ripple Test', () => {

    let createdWallet: RootRippleWallet, importedWallet: NormalRippleWallet;

    it('Create Wallet', async () => {
        createdWallet = await Ripple.createWallet();
        expect(typeof createdWallet).toBe('object');
    })

    it('Import Wallet', async () => {
        importedWallet = await Ripple.importWallet({
            secretKey: createdWallet.wallet.secret
        });
        expect(typeof importedWallet).toBe('object');
    })

    it('Get Balance', async () => {
        const balance = await Ripple.getBalance({
            address: 'rJmE49v6V6p6YLNZyncgCR6d1gs8DiVXJc'
        })
        expect(typeof balance).toBe('object');
    })
})