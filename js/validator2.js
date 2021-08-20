if (document.querySelector('#file')) {
  document.querySelector('#file').addEventListener('change', function(e) {
    var boxFile = document.querySelector('.boxFile');
    boxFile.classList.remove('attached');
    boxFile.innerHTML = boxFile.getAttribute("data-text");
    if(this.value != '') {
      var allowedExtensions = /(\.pdf|\.docx)$/i;
      if(allowedExtensions.exec(this.value)) {
        boxFile.innerHTML = e.target.files[0].name;
        console.log(e.target.files[0].name)
        boxFile.classList.add('attached');
      } else {
        this.value = '';
        alert('El archivo que intentas subir no está permitido.\nLos archivos permitidos son pdf o documentos Word');
        boxFile.classList.remove('attached');
      }
    }
  });
}

grecaptcha.ready(function () {
  grecaptcha.execute('6LcIyLYbAAAAABuraion0HLrDSe3_GEOLfWG6vLu', { action: 'homepage' }).then(function (token) {
    // Add your logic to submit to your backend server here.
    $('#google-response-2').val(token)
  });
});

$('document').ready(function () {


  // Validación para campos de texto exclusivo, sin caracteres especiales ni números
  var nameregex = /^[a-zA-Z ]+$/
  $.validator.addMethod('validname', function (value, element) {
    return this.optional(element) || nameregex.test(value)
  })
  var nameregex = /^[a-zA-Z ]+$/
  $.validator.addMethod('validsurname', function (value, element) {
    return this.optional(element) || nameregex.test(value)
  })
  // Máscara para validación de Email
  var eregex = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
  $.validator.addMethod('validemail', function (value, element) {
    return this.optional(element) || eregex.test(value)
  })
  
  $('#formulario-contacto2').validate({
    rules: {
      name: {
        required: true,
        minlength: 6,
      },
      surname: {
        required: true,
        minlength: 6,
      },
      email: {
        required: true,
        validemail: true,
      },
      subject: {
        required: true,
        minlength: 20,
        maxlength: 40,
      },
      message: {
        required: true,
        minlength: 20,
        maxlength: 300,
      },
    },
    messages: {
      name: {
        required: 'Your Name are Important',
        minlength: 'Your name is too short',
      },
      surname: {
        required: 'Your Surname are Important',
        minlength: 'Your surname is too short',
      },
      email: {
        required: 'Please enter an email address',
        validemail: 'Enter your email correctly',
      },
      subject: {
        required: 'Please enter a subject',
        minlength: 'Your subject is too short. Minimum length 20 characters ar required',
        maxlength: 'Your subject exceeds 40 characters',
      },
      message: {
        required: 'Your message is important',
        minlength: 'Your message is too short. Minimum length 20 characters ar required',
        maxlength: 'Your message exceeds 300 characters',
      },
    },
    errorPlacement: function (error, element) {
      $(element).closest('.form-group').find('.help-block').html(error.html())
    },
    highlight: function (element) {
      $(element)
        .closest('.form-group')
        .removeClass('has-success')
        .addClass('has-error')
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element)
        .closest('.form-group')
        .removeClass('has-error')
        .addClass('has-success')
      $(element).closest('.form-group').find('.help-block').html('')
    },
    submitHandler: function (form) {

      
        if ($('.boxFile').hasClass('attached')) {
          form.action = './enviarcv.php'
          form.submit()
          alert('Formulario de curriculum enviado correctamente')
        } else {
          alert('Debes adjuntar tu CV')
        }
     
   

      
      
    },
  })
})
