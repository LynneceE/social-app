const { User } = require('../models');


const userController = {
    // GET ALL USERS
    getAllUser(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },


    // GET ONE PIZZA BY ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        //populate friends
        .populate({
          path: 'friends',
          select: '- __v'
        })

        // populate thoughts
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },


    // CREATE A USER
    createUser({ body }, res) {
        console.log("BODY", body);
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // UPDATE USER BY ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      },


      // DELETE USER
      deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      },



      // add or delete friends
      addFriend({ params }, res ) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $addToSet: { friends: params.friendId } }, // add friend to the specific user, using the new friends id
          //changed $push to $addToSet but still returns 'Wrong Route'
          { new: true}  // update user document to incluse new friend 
        )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ mssage: 'No user found with this id' });
            return;
          }
          res.jsob(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
      },

      deleteFriend({ params }, res ) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: {friends: params.friendId } }, // remove specific friend by pulling it by its id
          { new: true } // update the user document without the removed friend
        )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ mssage: 'No user found with this id' });
            return;
          }
          res.jsob(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
        
      }

};


module.exports = userController;