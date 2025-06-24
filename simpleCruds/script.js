MOCK_API_URL = "https://6857e06121f5d3463e5670dc.mockapi.io/users";

const usersContainer = document.querySelector("#users-container");
const editUserBtn = document.querySelector("#edit-btn");
const removeUserBtn = document.querySelector("#remove-btn");
const createUserBtn = document.querySelector("#create-btn");

let users = [];

editUserBtn.addEventListener("click", () => editUserAsync());
removeUserBtn.addEventListener("click", () => removeUserAsync());
createUserBtn.addEventListener("click", () => createUserAsync());

// render users function
const renderUsers = () => {
    usersContainer.innerHTML = "";
    users.forEach(user => {
        const userWrapper = document.createElement("section");
        const userName = document.createElement("h3");
        const userCity = document.createElement("p");
        const userAvatar = document.createElement("img");

        userName.textContent = `Name: ${user.name}`;
        userCity.textContent = `City: ${user.city}`;
        userAvatar.src = user.avatar;

        userWrapper.append(userName, userCity, userAvatar);
        usersContainer.append(userWrapper);
    })
}

// create a new user function
const createUserAsync = async () => {
    try {
        console.log("CREATING A NEW USER START.");

        const response = await fetch(MOCK_API_URL, {
            method: "POST",
            body:JSON.stringify({
                name: "NewUser",
                city: "London",
                avatar: "https://www.perunica.ru/uploads/posts/2011-10/1319832745_0_6065c_b70de565_l.jpg",
            }),
            headers: {
                "Content-type": "application/json"
            }
        });

        const createdUser = await response.json();
        users.push(createdUser);
        renderUsers();

    } catch (error) {
        console.log("CREATING A NEW USER ERROR.", error.message);
    } finally {
        console.log("CREATING A NEW USER FINISH.");
    }
}


// delete an existing user function
const removeUserAsync = async () => {
    try {
        const ID = "7";

        console.log("DELETING CURRENT USER START.");
        const response = await fetch(`${MOCK_API_URL}/${ID}`, {
            method: "DELETE", 
        });
        const deletedUser = await response.json();

        if (response.status === 404) {
            throw new Error(`ID ${ID}`);
        }

        users = users.filter(user => user.id !== deletedUser.id);
        renderUsers();
    } catch (error) {
        console.log("DELETING CURRENT USER ERROR.", error.message);
    } finally {
        console.log("DELETING CURRENT USER FINISH.");
    }
}

// edit an existing user function
const editUserAsync = async () => {
    try {
        const ID = "6";

        console.log("EDITING CURRENT USER START.");
        const response = await fetch(`${MOCK_API_URL}/${ID}`, {
            method: "PUT",
            body: JSON.stringify({
                name: "EditedUser",
                city: "New-York",
                avatar: "https://grizly.club/uploads/posts/2023-08/1693294873_grizly-club-p-kartinki-avatarki-dlya-ds-bez-fona-22.jpg",
            }),
            headers: {
                "Content-type": "application/json"
            }
        });

        const editedUser = await response.json();

        users = users.map((user) => {
            if (user.id === editedUser.id) {
                return editedUser;
            } 
            return user;
        });

        renderUsers();
    } catch (error) {
         console.error("EDITING CURRENT USER ERROR", error.message);
    } finally {
        console.log("EDITING CURRENT USER FINISH.");
    }
}

// get all users function
const getUsersAsync = async () => {
    try {
        console.log("GETTING ALL USERS START.");
        const response = await fetch(MOCK_API_URL);
        users = await response.json();

        console.log(users);
        renderUsers();
    } catch (error) {
        console.error("GETTING ALL USERS ERROR", error.message);
    } finally {
        console.log("GETTING ALL USERS FINISH.");
    }
}

getUsersAsync();