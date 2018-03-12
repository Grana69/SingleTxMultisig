pragma solidity 0.4.19;

import "./Factory.sol";
import "./SingleMultisig.sol";

/// @title MultiSigFactory Factory - Allows creation of Multisignature Contracts.
/// @author Victor Grana - <victor.grana@srax.com>

contract MultiSigFactory is Factory {

    /*
     * Public functions
     */
    /// @dev Allows verified creation of Multisignature contract.
    /// @param _owners Array for owners.
    /// @param _required unsigned integer to required contract value.
    /// @return Returns Multi Signature Contract Address.
    function create(address[] _owners, uint _required)
        public
        returns (address multisigAddress)
    {
        multisigAddress = new SingleMultiSig(_owners, _required);
        register(multisigAddress);
    }
}