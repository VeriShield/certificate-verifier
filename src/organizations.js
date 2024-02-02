const Organization = require("./classOrg.js");

let organisations = [];
let totalOrg = 0;
let allowedAddresses = [];

function createOrganisation(name, walletAddress, description) {
  let newOrganisation = new Organization(name, walletAddress, description);
  totalOrg = totalOrg + 1;
  newOrganisation.id = totalOrg;
  organisations.push(newOrganisation);
  allowedAddresses.push(newOrganisation.walletAddress);
  return newOrganisation;
}

function getOrganisations() {
  let organisationList = organisations.map((org) => {
    return org.getOrganizationDetails();
  });
  return organisationList;
}

function getOrganisation(index) {
  organisations.map((org, key) => {
    if (index === key) {
      console.log("org at ", index, " is ", org.name);
      return org.getOrganizationDetails();
    }
  });
}

module.exports = {
  createOrganisation,
  getOrganisation,
  getOrganisations,
  organisations,
  allowedAddresses,
};
