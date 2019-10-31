// objeto constructor para formateo dinero
var formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
})

// variables para manejar el cambio de cifras en la interfaz
var monto60quincenas = $('#60quincenas')
var monto48quincenas = $('#48quincenas')
var monto36quincenas = $('#36quincenas')
var monto24quincenas = $('#24quincenas')
let valorPlazo = 1
let montoCredito = 0
let textMonto = $('#monto')

function calcularPlazos() {
  monto60quincenas.html(formatter.format((montoCredito / 60).toFixed(2)))
  monto48quincenas.html(formatter.format((montoCredito / 48).toFixed(2)))
  monto36quincenas.html(formatter.format((montoCredito / 36).toFixed(2)))
  monto24quincenas.html(formatter.format((montoCredito / 24).toFixed(2)))
}

// rangeslider
// slider para seleccionar el monto del credito
var $element = $('input[type="range"]')
var $handle

$element
  .rangeslider({
    polyfill: false,
    onInit: function() {
      $handle = $('.rangeslider__handle', this.$range)
      updateHandle($handle[0], this.value)
      $handle.addClass('shake-active')
    },
  })
  .on('input', function() {
    updateHandle($handle[0], this.value)
  })

function updateHandle(el, val) {
  el.textContent = ' ' + formatter.format(val) + ' '
  montoCredito = parseInt(val)
  textMonto.html(formatter.format(montoCredito.toFixed(2)))
  calcularPlazos()
}

$(document).ready(function() {
  $('#form-upload').hide()
  $('#mensaje').hide()
  $('#nss').hide()
  $('#confirmacion').hide()
  //when slider changes, hide start message
  $("input[type='range']").on('change', function() {
    $('#helper').fadeOut('slow')
    $handle.removeClass('shake-active')
  })
})

$('#btn-enviar').click(function() {
  $('#mensaje').show()
  $('html, body').animate({
    scrollTop: $(document).height() - $(window).height(),
  })
})

var btnContinue = $('#btn-continue')
btnContinue.click(function() {
  console.log('clicked')
  $('#form-upload').show()
  $('html, body').animate({
    scrollTop: $(document).height() - $(window).height(),
  })
})

var btnModal = $('#btn-modal')
btnModal.click(function() {
  $('#modalINE').modal('toggle')
  $('#card-ine').addClass('active')
  $('#nss').show()
  $('html, body').animate({
    scrollTop: $(document).height() - $(window).height(),
  })
})

$('#input-nss').change(function() {
  $('#confirmacion').show()
})

$('#input-nss').focusout(function() {
  $('html, body').animate({
    scrollTop: $(document).height() - $(window).height(),
  })
})

document.addEventListener('DOMContentLoaded', function() {
  var q = document.querySelectorAll('.cb')
  for (var i in q) {
    if (+i < q.length) {
      q[i].addEventListener('click', function() {
        let c = this.classList,
          p = 'pristine'
        if (c.contains(p)) {
          c.remove(p)
        }
      })
    }
  }
})

function ui_single_update_active(element, active) {
  element.find('div.progress').toggleClass('d-none', !active)
  element.find('input[type="text"]').toggleClass('d-none', active)
  element.find('input[type="file"]').prop('disabled', active)
}

function ui_error_upload(element) {
  var text = element.find('span')
  text.html('No se pudo validar tu archivo.')
  text.addClass('text-danger')
}

function ui_single_update_progress(element, percent, active) {
  active = typeof active === 'undefined' ? true : active

  var bar = element.find('div.progress-bar')
  var text = element.find('span')
  bar.width(percent + '%').attr('aria-valuenow', percent)
  bar.toggleClass('progress-bar-striped progress-bar-animated', active)

  if (percent === 0) {
    bar.html('')
  }
  if (percent === 100) {
    text.html('Se validó con éxito')
    text.addClass('text-success')
  } else {
    bar.html(percent + '%')
  }
}

function ui_single_update_progress_card(element, percent, active) {
  active = typeof active === 'undefined' ? true : active

  var bar = element.find('div.progress-bar')
  var card = element.find('div.card-id-upload')
  bar.width(percent + '%').attr('aria-valuenow', percent)
  bar.toggleClass('progress-bar-striped progress-bar-animated', active)

  if (percent === 0) {
    bar.html('')
  }
  if (percent === 100) {
    card.addClass('active')
  } else {
    bar.html(percent + '%')
  }
}

function ui_single_update_status(element, message, color) {
  color = typeof color === 'undefined' ? 'muted' : color

  element
    .find('small.status')
    .prop('class', 'status text-' + color)
    .html(message)
}

// carga de docs

$('#drag-and-drop-foto').dmUploader({
  //
  url: 'https://httpstat.us/200', // url publica para recibir un status 'ok' y ver funcionar la animacion
  maxFileSize: 3000000, // 3 Megs
  multiple: false,
  onDragEnter: function() {
    // Happens when dragging something over the DnD area
    this.addClass('active')
  },
  onDragLeave: function() {
    // Happens when dragging something OUT of the DnD area
    this.removeClass('active')
  },
  onInit: function() {
    // Plugin is ready to use
    console.log('Penguin initialized :)', 'info')

    this.find('input[type="text"]').val('')
  },
  onComplete: function() {
    // All files in the queue are processed (success or error)
    console.log('All pending tranfers finished')
  },
  onNewFile: function(id, file) {
    // When a new file is added using the file selector or the DnD area
    console.log('New file added #' + id)
  },
  onBeforeUpload: function(id) {
    // about tho start uploading a file
    console.log('Starting the upload of #' + id)
    ui_single_update_progress_card(this, 0, true)
    ui_single_update_active(this, true)

    ui_single_update_status(this, 'Uploading...')
  },
  onUploadProgress: function(id, percent) {
    // Updating file progress
    ui_single_update_progress_card(this, percent)
  },
  onUploadSuccess: function(id, data) {
    var response = JSON.stringify(data)

    // A file was successfully uploaded
    console.log('Server Response for file #' + id + ': ' + response)
    console.log('Upload of file #' + id + ' COMPLETED', 'success')

    ui_single_update_active(this, false)
    ui_single_update_status(this, 'Upload completed.', 'success')
  },
  onUploadError: function(id, xhr, status, message) {
    // Happens when an upload error happens
    ui_single_update_active(this, false)
    ui_error_upload(this)
    ui_single_update_status(this, 'Error: ' + message, 'danger')
  },
  onFallbackMode: function() {
    // When the browser doesn't support this plugin :(
    console.log('Plugin cant be used here, running Fallback callback', 'danger')
  },
  onFileSizeError: function(file) {
    ui_single_update_status(this, 'File excess the size limit', 'danger')

    console.log(
      "File '" + file.name + "' cannot be added: size excess limit",
      'danger',
    )
  },
  onFileTypeError: function(file) {
    ui_single_update_status(this, 'File type is not an image', 'danger')

    console.log(
      "File '" + file.name + "' cannot be added: must be an image (type error)",
      'danger',
    )
  },
  onFileExtError: function(file) {
    ui_single_update_status(this, 'File extension not allowed', 'danger')

    console.log(
      "File '" +
        file.name +
        "' cannot be added: must be an image (extension error)",
      'danger',
    )
  },
})

$('#drag-and-drop-ine-frente').dmUploader({
  //
  url: 'https://httpstat.us/500', // url publica para recibir un status 'ok' y ver funcionar la animacion
  maxFileSize: 3000000, // 3 Megs
  multiple: false,
  onDragEnter: function() {
    // Happens when dragging something over the DnD area
    this.addClass('active')
  },
  onDragLeave: function() {
    // Happens when dragging something OUT of the DnD area
    this.removeClass('active')
  },
  onInit: function() {
    // Plugin is ready to use
    console.log('Penguin initialized :)', 'info')

    this.find('input[type="text"]').val('')
  },
  onComplete: function() {
    // All files in the queue are processed (success or error)
    console.log('All pending tranfers finished')
  },
  onNewFile: function(id, file) {
    // When a new file is added using the file selector or the DnD area
    console.log('New file added #' + id)

    if (typeof FileReader !== 'undefined') {
      var reader = new FileReader()
      var img = this.find('img')

      reader.onload = function(e) {
        img.attr('src', '')
      }
      reader.readAsDataURL(file)
    }
  },
  onBeforeUpload: function(id) {
    // about tho start uploading a file
    console.log('Starting the upload of #' + id)
    ui_single_update_progress(this, 0, true)
    ui_single_update_active(this, true)

    ui_single_update_status(this, 'Uploading...')
  },
  onUploadProgress: function(id, percent) {
    // Updating file progress
    ui_single_update_progress(this, percent)
  },
  onUploadSuccess: function(id, data) {
    var response = JSON.stringify(data)

    // A file was successfully uploaded
    console.log('Server Response for file #' + id + ': ' + response)
    console.log('Upload of file #' + id + ' COMPLETED', 'success')

    ui_single_update_active(this, false)

    var img = this.find('img')
    img.attr('src', '../assets/images/check2.png')
    ui_single_update_status(this, 'Upload completed.', 'success')
  },
  onUploadError: function(id, xhr, status, message) {
    // Happens when an upload error happens
    ui_single_update_active(this, false)
    ui_error_upload(this)
    ui_single_update_status(this, 'Error: ' + message, 'danger')
  },
  onFallbackMode: function() {
    // When the browser doesn't support this plugin :(
    console.log('Plugin cant be used here, running Fallback callback', 'danger')
  },
  onFileSizeError: function(file) {
    ui_single_update_status(this, 'File excess the size limit', 'danger')

    console.log(
      "File '" + file.name + "' cannot be added: size excess limit",
      'danger',
    )
  },
  onFileTypeError: function(file) {
    ui_single_update_status(this, 'File type is not an image', 'danger')

    console.log(
      "File '" + file.name + "' cannot be added: must be an image (type error)",
      'danger',
    )
  },
  onFileExtError: function(file) {
    ui_single_update_status(this, 'File extension not allowed', 'danger')

    console.log(
      "File '" +
        file.name +
        "' cannot be added: must be an image (extension error)",
      'danger',
    )
  },
})

$('#drag-and-drop-ine-reverso').dmUploader({
  //
  url: 'https://httpstat.us/200', // url publica para recibir un status 'ok' y ver funcionar la animacion
  maxFileSize: 3000000, // 3 Megs
  multiple: false,
  onDragEnter: function() {
    // Happens when dragging something over the DnD area
    this.addClass('active')
  },
  onDragLeave: function() {
    // Happens when dragging something OUT of the DnD area
    this.removeClass('active')
  },
  onInit: function() {
    // Plugin is ready to use
    console.log('Penguin initialized :)', 'info')

    this.find('input[type="text"]').val('')
  },
  onComplete: function() {
    // All files in the queue are processed (success or error)
    console.log('All pending tranfers finished')
  },
  onNewFile: function(id, file) {
    // When a new file is added using the file selector or the DnD area
    console.log('New file added #' + id)

    if (typeof FileReader !== 'undefined') {
      var reader = new FileReader()
      var img = this.find('img')

      reader.onload = function(e) {
        img.attr('src', '')
      }
      reader.readAsDataURL(file)
    }
  },
  onBeforeUpload: function(id) {
    // about tho start uploading a file
    console.log('Starting the upload of #' + id)
    ui_single_update_progress(this, 0, true)
    ui_single_update_active(this, true)

    ui_single_update_status(this, 'Uploading...')
  },
  onUploadProgress: function(id, percent) {
    // Updating file progress
    ui_single_update_progress(this, percent)
  },
  onUploadSuccess: function(id, data) {
    var response = JSON.stringify(data)

    // A file was successfully uploaded
    console.log('Server Response for file #' + id + ': ' + response)
    console.log('Upload of file #' + id + ' COMPLETED', 'success')

    ui_single_update_active(this, false)

    var img = this.find('img')
    img.attr('src', '../assets/images/check2.png')
    ui_single_update_status(this, 'Upload completed.', 'success')
  },
  onUploadError: function(id, xhr, status, message) {
    // Happens when an upload error happens
    ui_single_update_active(this, false)
    ui_error_upload(this)
    ui_single_update_status(this, 'Error: ' + message, 'danger')
  },
  onFallbackMode: function() {
    // When the browser doesn't support this plugin :(
    console.log('Plugin cant be used here, running Fallback callback', 'danger')
  },
  onFileSizeError: function(file) {
    ui_single_update_status(this, 'File excess the size limit', 'danger')

    console.log(
      "File '" + file.name + "' cannot be added: size excess limit",
      'danger',
    )
  },
  onFileTypeError: function(file) {
    ui_single_update_status(this, 'File type is not an image', 'danger')

    console.log(
      "File '" + file.name + "' cannot be added: must be an image (type error)",
      'danger',
    )
  },
  onFileExtError: function(file) {
    ui_single_update_status(this, 'File extension not allowed', 'danger')

    console.log(
      "File '" +
        file.name +
        "' cannot be added: must be an image (extension error)",
      'danger',
    )
  },
})
