document.addEventListener('DOMContentLoaded', function(e) {
    // Create a container for 
    // validation rule names.
    var ruleNames = [];
    var forEach = Array.prototype.forEach;
    
    // Fills array with rule names. 
    // Looks for all SPANs with the data-rule 
    // attribute and then adds the rule 
    // name to the array.
    var ruleElements = document.querySelectorAll('span[data-rule]'); 
    forEach.call(ruleElements, function(element) {
      var ruleName = element.getAttribute('data-rule');
      if (ruleNames.indexOf(ruleNames) < 0) {
        ruleNames.push(ruleName);
      }
    });
    
    // First clear the UI by hiding all 
    // validation messages. Then run 
    // validation rules on the selected form.
    var validate = function() {
      var messages = document.querySelectorAll(".validation-messages span");
      forEach.call(messages, function(message){
        message.classList.add('hide')
      });
      document.getElementById('change-email-form').checkValidity();
    };
    
    // Check each input element to determine 
    // which element is invalid. Once an 
    // invalid state is detected, then loop 
    // through the validation rules to find 
    // out which is broken and therefore 
    // which message to display to the user.
    var validationFail = function(e) {
      var element, validity;
      
      element = e.currentTarget;
      validity = element.validity;
    
      if (!validity.valid) {
        ruleNames.forEach(function(ruleName) {
          checkRule(validity,ruleName,element);
        });
        e.preventDefault();
      }
    };
    
    // Uses the instance of the input element's 
    // ValidityState object to run a validation 
    // rule. If the validation rule returns 
    // 'true' then the rule is broken and 
    // the appropriate validation message 
    //is exposed to the user. 
    var checkRule = function(state, ruleName, element) {
      if (state[ruleName]) {
        
        var rules = element
                     .nextElementSibling
                     .querySelectorAll('[data-rule="' + ruleName + '"]');
        
        forEach.call(rules, function(rule){
          rule.classList.remove('hide');
        });
      }
    };
    
    // Attaches validation event handlers to 
    // all input elements that are NOT buttons.
    var inputElements = document.querySelectorAll('input:not(button)');
    forEach.call(inputElements, function(input) {
        input.oninvalid = validationFail;
        input.onblur = validate;
    });
    
    document.getElementById('login-button').addEventListener('click', validate, false);
  });