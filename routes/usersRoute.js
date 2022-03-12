const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post('/register', async(req, res) => {/**ova putanja rute ce odg req sa /register */

    const newuser = new User(req.body) /**ovdje je uskladisten novi user */

    try {
        const user = await newuser.save() //Da sacuva novog korisnika u bazu
        res.send('User Registered Successfully') /**ako nema error-a salje ovu poruku */
    } catch (error) {
        return res.status(400).json({error});
    }

});

router.post('/login', async(req, res) => {

    const {email, password} = req.body /**radimo destructuring jer cemo postavljati uslove */

   try {
    const user = await User.findOne({email : email, password : password}) /**email==email password==password ako se poklapaju try blok ce se izvrsiti*/
    if(user) { //u if provjeravamo da li je user prisutan ili ne
        const temp = {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            _id: user._id
         
        }//stavili smo da vraca temp, a ne user da ne bi vracao password na frontend
        res.send(temp) //saljemo user-a na frontend ako je login success
        
    }
    else { //tj ako nema user-a login je false pa treba error da vrati
        return res.status(400).json({message: 'Login faield'});
    }
   } catch (error) {
      return res.status(400).json({error});
   }




});

router.get('/getallusers', async(req, res) => {
    try {
        const result = await User.find();
        res.send(result)
    } catch (error) {
        return res.status(400).json({ error });
    }

});

module.exports = router