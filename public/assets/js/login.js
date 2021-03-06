$(document).ready(function() {
    $('#loginBtn').on('click',function(event){

    });
    var loginForm = $("form.login");
    var usernameInput = $("input#username-input");
    var passwordInput = $("input#password-input");
    var clickRegisterLink  = $("#registerLink");
    
    clickRegisterLink.on("click",function(event){
      console.log("you got the click");
    });
    // When the form is submitted, we validate there's an email and password entered
    //$('#loginBtn').on('click',function(event){
     loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.username) {
        usernameInput.css("border", "solid 1px red");
        $("#username-feedback").text("Please enter a username");
        return;
      }
  
      if (!userData.password) {
        passwordInput.css("border", "solid 1px red");
        $("#password-feedback").text("Please enter a password");
        return;
      }
  
  
      // If we have an email and password we run the loginUser function and clear the form
      console.log("userData.username",userData.username);
      console.log("userData.password",userData.password);
      loginUser(userData.username, userData.password);
      usernameInput.val("");
      passwordInput.val("");
    });
  

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(username, password) {
        console.log("userData.username",username);
        console.log("userData.password",password);
      $.post("/login", {
        username: username,
        password: password

      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, log the error
      }).catch(function(err) {
        $("#password-feedback").text("Incorrect Username or Password");
      });
    }
  
});