// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract AccessControlDPMonney is AccessControlEnumerable {
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor(address creator) {
        _grantRole(ADMIN_ROLE, creator);
        _setRoleAdmin(USER_ROLE, ADMIN_ROLE);
        _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
    }
}
