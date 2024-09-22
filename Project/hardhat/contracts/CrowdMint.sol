// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrowdMint {
    address public admin;

    struct Project {
        string title;
        string description;
        uint256 goal;
        uint256 fundsRaised;
        address payable creator;
        bool isCompleted;
    }

    Project[] public projects;

    event ProjectCreated(uint256 projectId, string title, string description, uint256 goal, address creator);
    event DonationReceived(uint256 projectId, address donor, uint256 amount);
    event FundsWithdrawn(uint256 projectId, address creator, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender; // Set the contract deployer as the admin
    }

    // Create a new project
    function createProject(string memory _title, string memory _description, uint256 _goal) public {
        require(_goal > 0, "Goal must be greater than zero");

        projects.push(Project({
            title: _title,
            description: _description,
            goal: _goal,
            fundsRaised: 0,
            creator: payable(msg.sender),
            isCompleted: false
        }));

        emit ProjectCreated(projects.length - 1, _title, _description, _goal, msg.sender);
    }

    // Donate to a project
    function donateToProject(uint256 _projectId) public payable {
        require(_projectId < projects.length, "Project does not exist");
        require(msg.value > 0, "Donation must be greater than zero");

        Project storage project = projects[_projectId];
        require(msg.sender != project.creator, "Project creator cannot donate to their own project");
        require(!project.isCompleted, "Project has already reached its goal");

        project.fundsRaised += msg.value;

        if (project.fundsRaised >= project.goal) {
            project.isCompleted = true;
        }

        emit DonationReceived(_projectId, msg.sender, msg.value);
    }

    // Withdraw funds by the creator when the goal is reached
    function withdrawFunds(uint256 _projectId) public {
        require(_projectId < projects.length, "Project does not exist");

        Project storage project = projects[_projectId];
        require(msg.sender == project.creator, "Only the project creator can withdraw funds");
        require(project.isCompleted, "Funds can only be withdrawn after the goal is met");

        uint256 amount = project.fundsRaised;
        project.fundsRaised = 0;
        project.creator.transfer(amount);

        emit FundsWithdrawn(_projectId, project.creator, amount);
    }

    // Get project details
    function getProjects() public view returns (Project[] memory) {
        return projects;
    }
}
