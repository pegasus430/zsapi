// FORM VALIDATION
(function($, W, D) {
    var JQUERY4U = {};

    JQUERY4U.UTIL = {
        setupFormValidation: function() {
            //form validation rules
            $("#busi-form").validate({
                rules: {
                    businessname: "required",
                    address: "required",
                    weburl: {
                        required: true,
                        url: true
                    }
                },
                messages: {
                    businessname: "Please enter your Company name",
                    address: "Please enter your Company Address",
                    weburl: "Please provide your company url"
                },
                submitHandler: function(form) {
                    form.submit();
                }
            });
        }
    }

    //when the dom has loaded setup form validation rules
    $(D).ready(function($) {
        JQUERY4U.UTIL.setupFormValidation();
    });

})(jQuery, window, document);



(function($, W, D) {
    var JQUERY4U = {};

    JQUERY4U.UTIL = {
        setupFormValidation: function() {
            //form validation rules
            $("#info-form").validate({
                rules: {
                    firstname: "required",
                    lastname: "required",
                    emailaddress: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        minlength: 5
                    },
                    cpassword: {
                        required: true,
                        minlength: 5
                    }
                },
                messages: {
                    firstname: "Enter your first name",
                    lastname: "Enter your last name",
                    emailaddress: "Please provide your Email address",
                    password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    cpassword: {
                        required: "Please retype the password",
                        minlength: "Your password must be at least 5 characters long"
                    }
                },
                submitHandler: function(form) {
                    form.submit();
                }
            });
        }
    }

    //when the dom has loaded setup form validation rules
    $(D).ready(function($) {
        JQUERY4U.UTIL.setupFormValidation();
    });

})(jQuery, window, document);


(function($, W, D) {
    var JQUERY4U = {};

    JQUERY4U.UTIL = {
        setupFormValidation: function() {
            //form validation rules
            $("#profile-form").validate({
                rules: {
                    emailaddress: {
                        required: true,
                        email: true
                    },
                    newpassword: {
                        required: true,
                        minlength: 5
                    },
                    password: {
                        required: true,
                        minlength: 5
                    },
                    cpassword: {
                        required: true,
                        minlength: 5
                    }
                },
                messages: {
                    emailaddress: "Please provide your Email address",
                    newpassword: {
                        required: "Please enter your current password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    password: {
                        required: "Enter a New password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    cpassword: {
                        required: "Please retype the New password",
                        minlength: "Your password must be at least 5 characters long"
                    }
                },
                submitHandler: function(form) {
                    form.submit();
                }
            });
        }
    }

    //when the dom has loaded setup form validation rules
    $(D).ready(function($) {
        JQUERY4U.UTIL.setupFormValidation();
    });

})(jQuery, window, document);
