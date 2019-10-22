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
  $('#btn-enviar').hide()
  $('#mensaje').hide()
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
  $('.card-id-upload').addClass('active')
  $('#btn-enviar').show()
})
