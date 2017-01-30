# increntaHSForms
Wrapper for the hubspot forms. This allows you to set a dynamic redirect URL after submit the form

Usage:

Add hubspot and increntaForm js files:
```
<script charset="utf-8" type="text/javascript" src="http://js.hsforms.net/forms/v2.js"></script>
<script charset="utf-8" type="text/javascript" src="../src/increntaForm.js"></script>
```

create a new increntaForm instance
```javascript
$(document).ready(function(){
  new increntaForm({
    portalId: '2296942',
    formId: '4c60baee-19fa-4f1e-8063-af8e0da5a59b',
    target: '#forWrapperSelector',
    getRedirect: function(form){
      return 'http://josep.com';
    }
  });
});
```
increntaForm Options:
---

    portalId: (string)[Required] Hubspot portalID
    formId = (string)[Required] Hubspot formID
    target =(string)[Recommended] CSS Selector
    formReady = (function) Function to execute when hubspot form get ready
    onSend = (function) Function to execute before send the data to Hubspot
    this.getRedirect = (function) Return url to redirect
