grecaptcha.ready(function () {
  grecaptcha.execute('6LcIyLYbAAAAABuraion0HLrDSe3_GEOLfWG6vLu', { action: 'homepage' }).then(function (token) {
    // Add your logic to submit to your backend server here.
    $('#google-response-1').val(token)
  });
});

$('document').ready(function () {
  // Validación para campos de texto exclusivo, sin caracteres especiales ni números
  var nameregex = /^[a-zA-Z ]+$/
  $.validator.addMethod('validname', function (value, element) {
    return this.optional(element) || nameregex.test(value)
  })
  // Máscara para validación de Email
  var eregex = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
  $.validator.addMethod('validemail', function (value, element) {
    return this.optional(element) || eregex.test(value)
  })
  //Validar numero
  var phoneregex = /^[0-9]{3,16}$/
  $.validator.addMethod('validnumber', function (value, element) {
    return this.optional(element) || phoneregex.test(value)
  })
  $('#formulario-contacto1').validate({
    rules: {
      name: {
        required: true,
        minlength: 8,
      },
      email: {
        required: true,
        validemail: true,
      },
      phone: {
        required: true,
        validnumber: true,
      },
      message: {
        required: true,
        minlength: 20,
        maxlength: 300,
      },
    },
    messages: {
      name: {
        required: 'Your Name and Surname are Important',
        minlength: 'Your name is too short',
      },
      email: {
        required: 'Please enter an email address',
        validemail: 'Enter your email correctly',
      },
      phone: {
        required: 'Por Favor, introduzca un teléfono',
        validnumber: 'Introduzca solo numeros en el telefono',
      },
      message: {
        required: 'Your message is important',
        minlength: 'Your message is too short. Minimum length 20 characters ar required.',
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

      
          form.action = './enviar.php'
          form.submit()
          alert('Formulario de contacto enviado correctamente')
    

      
      
    },
  })
})
