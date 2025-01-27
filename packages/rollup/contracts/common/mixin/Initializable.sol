pragma solidity ^0.8.19;

contract Initializable {
    bool _inited = false;

    modifier initializer() {
        require(!_inited, 'already inited');
        _inited = true;
        
        _;
    }
}
