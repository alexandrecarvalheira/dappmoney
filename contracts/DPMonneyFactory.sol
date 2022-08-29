//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "./AccessControlDPMonney.sol";

// Import this file to use console.log
import "hardhat/console.sol";

contract DPMoneyFactory {
    uint currentResourceId; //@dev - resource ID is counted from 0
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    address owner;
    string resourceName;

    struct ResourceStruct {
        uint Id;
        address resourceAddress;
        string Name;
    }

    ResourceStruct[] ResourceList;

    address[] public resourceAddresses; //@dev - Every resource's addresses created are stored into this array
    mapping(uint => ResourceStruct) ResourceId;

    /**
     * @dev - Constructor
     */
    constructor() {
        owner = msg.sender;
    }

    function createNewResource(string memory name) public returns (address) {
        AccessControlDPMonney accessControlDPMonney = new AccessControlDPMonney(
            owner,
            name
        );
        resourceAddresses.push(address(accessControlDPMonney));
        ResourceStruct storage resource = ResourceId[currentResourceId];
        resource.Id = currentResourceId;
        resource.resourceAddress = address(accessControlDPMonney);
        resource.Name = name;
        ResourceList.push(resource);
        currentResourceId++;
        return address(accessControlDPMonney);
    }

    function getResource(uint resourceId)
        public
        view
        returns (address resourceAddress)
    {
        return resourceAddresses[resourceId];
    }

    function getCurrentResourceId()
        public
        view
        returns (uint _currentResourceId)
    {
        return currentResourceId;
    }

    function getResourceStruct(uint Id)
        public
        view
        returns (ResourceStruct memory)
    {
        return ResourceId[Id];
    }
    // TODO:
    // Resource Struct that contains : Name,ID, UserToRole mapping

    // function setRoleMemberCount() public {
    //     AccessControlDPMonney accessControlDPMonney;
    //     uint index;
    //     for(index = 0; index < currentResourceId; index++){
    //     accessControlDPMonney = AccessControlDPMonney(
    //         resourceAddresses[index]
    //     );
    //     uint adminCount = accessControlDPMonney.getRoleMemberCount(ADMIN_ROLE);
    //     uint userCount = accessControlDPMonney.getRoleMemberCount(USER_ROLE);
    //     uint adminIndex;
    //     uint userIndex;
    //      for (adminIndex = 0; adminIndex < adminCount; adminIndex++){
    //          address adminUser = accessControlDPMonney.getRoleMember(ADMIN_ROLE, adminIndex);
    //          adminOnResource[resourceAddresses[index]].push(adminUser);
    //      }
    //      for (userIndex = 0; userIndex < userCount; userIndex++){
    //          address userUser = accessControlDPMonney.getRoleMember(USER_ROLE, userIndex);
    //          userOnResource[resourceAddresses[index]].push(userUser);
    //      }
    //     }
    // }

    // function getUsersFromResource(address resource) public view returns (address[] memory) {
    //     return userOnResource[resource];
    // }

    // function getAdminFromResource(address resource) public view returns (address[] memory) {
    //     return adminOnResource[resource];
    // }
}
