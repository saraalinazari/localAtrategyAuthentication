$(document).ready(function() {
    console.log("inside regoster.js");
    var signUpButton = $(".signup");
    var usernameInput = $("input#username-input");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var firstnameInput = $("input#firstname-input");
    var lastnameInput = $("input#lastname-input");
    var addressInput = $("input#address-input");
    var phoneInput = $("input#phone-input");
  //repeat-password-input
  //repeat-email-input
    var repeatPasswordInput = $("input#repeat-password-input");
    var repeatEmailInput = $("input#repeat-email-input");
  
    // Username "on-the-fly" validation
    usernameInput.bind('input propertychange', function() {
      if (usernameInput.val().trim().length < 6) {
        $("#username-form").removeClass("has-success");
  
        $("#username-form").addClass("has-error");
        $("#username-feedback").text("username must be at least 6 characters long");
      } else {
        $("#username-form").removeClass("has-error");
  
        $("#username-form").addClass("has-success");
        $("#username-feedback").text("Username valid!");
      }
    });
  
    // Email "on-the-fly" validation
    emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    emailInput.bind('input propertychange', function() {
      if (!emailRegEx.test($(this).val()))
      {
        $("#email-form").removeClass("has-success");
  
        $("#email-form").addClass("has-error");
        $("#email-feedback").text("Invalid Email");
        $("#email-additional-feedback").text("Ex: someone@example.com");
      
      } else {
        $("#email-form").removeClass("has-error");
  
        $("#email-form").addClass("has-success");
        $("#email-feedback").text("Valid Email!");
        $("#email-additional-feedback").text("");
      }
    });
  
    // Check "on-the-fly" if repeated email matches email
    repeatEmailInput.bind('input propertychange', function() {
      if (emailInput.val().trim() !== repeatEmailInput.val().trim()) {
        $("#email-repeat-form").removeClass("has-success");
  
        $("#email-repeat-form").addClass("has-error");
        $("#email-repeat-feedback").text("Emails Don't Match");
      }else if(emailInput.val().trim() == null){
        $("#email-repeat-form").removeClass("has-success");
  
        $("#email-repeat-form").addClass("has-error");
        $("#email-repeat-feedback").text("Emails Don't leave null");
      } 
      else {
        $("#email-repeat-form").removeClass("has-error");
  
        $("#email-repeat-form").addClass("has-success");
        $("#email-repeat-feedback").text("Emails Match!");    
      }
    });
    var passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    passwordInput.bind('input propertychange', function() {
      if (!passwordRegEx.test($(this).val())) {
        $("#password-form").removeClass("has-success");
  
        $("#password-form").addClass("has-error");
        $("#password-feedback").text("Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and must be at least 8 characters long.");
      } 
      else if(passwordInput === null){
        $("#password-form").removeClass("has-success");
  
        $("#password-form").addClass("has-error");
        $("#password-feedback").text("Password should not be left null");
        }
      else {
        $("#password-form").removeClass("has-error");
  
        $("#password-form").addClass("has-success");
        $("#password-feedback").text("Password set correctly!");    
      }
    });
    repeatPasswordInput.bind('input propertychange', function() {
      if (passwordInput.val().trim() !== repeatPasswordInput.val().trim()) {
        $("#password-repeat-form").removeClass("has-success");
  
        $("#password-repeat-form").addClass("has-error");
        $("#password-repeat-feedback").text("Password Don't Match");
      }else if(repeatPasswordInput.val().trim() === null){
        $("#password-repeat-form").removeClass("has-success");
  
        $("#password-repeat-form").addClass("has-error");
        $("#password-repeat-feedback").text("Password Don't leave null");
      } 
      else {
        $("#password-repeat-form").removeClass("has-error");
  
        $("#password-repeat-form").addClass("has-success");
        $("#password-repeat-feedback").text("Password Match!");    
      }
    });
    signUpButton.on("click", function(event) {
        // Replace all alerts with modals
    
        var userData = {
          username: usernameInput.val().trim(),
          email: emailInput.val().trim(),
          password: passwordInput.val().trim(),
          firstname: firstnameInput.val().trim(),
          lastname: lastnameInput.val().trim(),
          address: addressInput.val().trim(),
          phonenumber: phoneInput.val().trim() 
        };
    
        if (!userData.username || !userData.email || !userData.password || !userData.firstname) {
          return alert("Please don't leave fields blank");
        }
    
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.username, userData.email, userData.password,userData.firstname,userData.lastname,userData.address,userData.phonenumber);
        emailInput.val("");
        passwordInput.val("");
        usernameInput.val("");
        repeatPasswordInput.val("");
        repeatEmailInput.val("");
        firstnameInput.val("");
        lastnameInput.val("");
        addressInput.val("");
        phoneInput.val(""); 
      });
 
      // Does a post to the signup route. If succesful, we are redirected to the members page
      // Otherwise we log any errors
      function signUpUser(username, email, password,firstname,lastname,address,phonenumber) {
        $.post("/login/new", {
          username: username,
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          address: address,
          phonenumber: phonenumber
        }).then(function(data) {
          if (data.duplicateUser) {
            // Replace with Modal
            alert("Sorry, that username has been taken");
          } else {
            window.location = data.redirect;
          }
        }).catch(function(err) {
          console.log(err);
        });
      }
    
    });