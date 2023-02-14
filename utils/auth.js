const withAuth = async (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {

    // Check if user exists in the database
    const { email, password } = req.session;
    const user = await user.findOne({ where: { email } });
    if (!user) {
      // If the user doesnt exist, throw error
      res.redirect('/login');
    } else {
      // If the user exists, check if the password matches
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        // If the password is correct, continue with the request
        next();
      } else {
        // If the password is incorrect, throw error
        res.redirect('/login');
      }
    }
  }
};


module.exports = withAuth;
