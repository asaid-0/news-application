import SimpleSchema from "simpl-schema";

SimpleSchema.setDefaultMessages({
    messages: {
      en: {
        passwordMismatch: 'Passwords do not match',
      },
    },
  });


export default new SimpleSchema({
    name: {
        type: String,
        required: true,
        label: "Full Name",
        min: 3,
        max: 64
    },
    email: {
        type: String,
        required: true,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String,
        required: true,
        label: "Password",
        min: 8,
    },
    confirmPassword: {
        type: String,
        required: true,
        label: "Password Confirmation",
        min: 8,
        custom() {
            if (this.value !== this.field('password').value) {
                return "passwordMismatch";
            }
        },
    }

});