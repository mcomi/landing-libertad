$(document).ready(function() {
  $('#form').hide()
})
$('form').submit(function(event) {
  event.preventDefault()
  $('#login').hide()
  $('#form').show()
})

function ui_single_update_active(element, active) {
  element.find('div.progress').toggleClass('d-none', !active)
  element.find('input[type="text"]').toggleClass('d-none', active)

  element.find('input[type="file"]').prop('disabled', active)
  element.find('.btn').toggleClass('disabled', active)

  element.find('.btn i').toggleClass('fa-circle-o-notch fa-spin', active)
  element.find('.btn i').toggleClass('fa-folder-o', !active)
}

function ui_single_update_progress(element, percent, active) {
  active = typeof active === 'undefined' ? true : active

  var bar = element.find('div.progress-bar')
  var percentText = element.find('span')

  bar.width(percent + '%').attr('aria-valuenow', percent)
  bar.toggleClass('progress-bar-animated', active)

  if (percent === 0) {
    percentText.html('')
  } else {
    percentText.html(percent + '%')
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

$('#drag-and-drop-cv').dmUploader({
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

$('#drag-and-drop-ine').dmUploader({
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

$('#drag-and-drop-licencia').dmUploader({
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

$('#drag-and-drop-antecedentes').dmUploader({
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

$('#drag-and-drop-rfc').dmUploader({
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

$('#drag-and-drop-comprobante').dmUploader({
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

$('#drag-and-drop-tarjeta-circulacion').dmUploader({
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
