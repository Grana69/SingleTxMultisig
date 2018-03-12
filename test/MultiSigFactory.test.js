const multisigFactory = artifacts.require('MultiSigFactory');
const singleMultisig = artifacts.require('SingleMultisig')
const utils = require('./helpers/utils')

contract('MultiSignature Contract factory', accounts => {

    let factoryInstance
    const owners = [accounts[0], accounts[1], accounts[2]]
    const required = 2

    beforeEach(async () => {
        factoryInstance = await multisigFactory.new()
        assert.ok(factoryInstance);
    })
    it('Deploy', async () => {
        //Create Factory contract
        const multisig = await factoryInstance.create(owners, required, { from: accounts[0] })
        const multisigAddress = utils.getParamFromTxEvent(multisig, 'instantiation', null, 'ContractInstantiation')
        const initCount = await factoryInstance.getInstantiationCount(accounts[0])
        const multisigAddressConfirmation = await factoryInstance.instantiations(accounts[0], initCount.sub(1).toNumber())
        //check multisigAddress is same as multisig address
        assert.equal(multisigAddress, multisigAddressConfirmation)
        assert.ok(factoryInstance.isInstantiation(multisigAddress))

        const multisigInstance = singleMultisig.at(multisigAddress);
        console.log(await multisigInstance.getOwners())
    })
})