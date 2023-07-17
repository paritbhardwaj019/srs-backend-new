# Signup/Login Routes

POST /api/users/signup
{

    "fullName": "Parit Bhardwaj",
    "email":"paritbhardwaj@outlook.com",
    "password": "b14k-cyph3R",
    "phone": "9119025592",
    "dateOfBirth": "19-10-2006",
    "role": "admin"

}

POST /api/users/login
{

    "email":"paritbhardwaj@outlook.com",
    "password": "b14k-cyph3R"

}

# BUY PACKAGE

PUT http://localhost:3001/api/admin/packages
RESTRICT TO (admin, trainer, trainee)
{
"packageId": "642032ece353f88c1c3081b7"
}
