// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "../promiselab/databases";

// Function to fetch user data from multiple databases
async function getUserData(id) {
  try {
    // Fetch the database identifier from the central database
    const database = await central(id);
    // Fetch user's basic information from the corresponding database
    const basicInfo = await dbs[database](id);
    // Fetch the user's personal data from the vault database
    const personalData = await vault(id);
    // Construct the final user object
    const user = {
      id,
      name: personalData.name,
      username: basicInfo.username,
      email: personalData.email,
      address: JSON.parse(personalData.address),
      phone: personalData.phone,
      website: basicInfo.website,
      company: JSON.parse(basicInfo.company),
    };
    return user;
  } catch (error) {
    // Handle any errors that occur during the process
    return Promise.reject(error);
  }
}
// Testing the function with different id values
const testIds = [
  // Valid numbers (1 to 10)
  ...Array.from({ length: 10 }, (_, i) => i + 1),
  // Invalid numbers (0, 11, and beyond)
  0, 11, 12, 20,
  // Invalid data types (strings and booleans)
  'invalid', true, false
];
testIds.forEach(async (id) => {
  try {
    const user = await getUserData(id);
    console.log(`User data for id ${id}:`, user);
  } catch (error) {
    console.error(`Error for id ${id}:`, error);
  }
});