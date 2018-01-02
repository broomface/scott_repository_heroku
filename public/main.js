$(document).ready(function () {  // Starts the program with jQuery

// first ajax will be for the GET, will dynamically populate the front end list with the createTable Function
$.ajax({
    contentType: 'application/json',
    type:'GET',
    url: 'messages'
}).done((data) =>{
  data.forEach((ele)=>{
    $('#container').append(createTable(ele.id, ele.name, ele.message));
  }); // End of forEach

// BEGINNING OF EDIT CLICK REQUEST
$('.edit').click(function(event) {   // set up click request for edit

  let id = $(this).data('id');
  let name = $(`#name${id}`).html();
  let message = $(`#name${id}`).html();

  $('#name').val(name);
  $('#message').val(message);
  $('#edit-id').val(id);

  $('#postButton').hide();  // DEFAULT HIDE THE POST BUTTON
  $('#editButton').show();  // DEFAULT SHOW EDIT BUTTON
}); // END OF EDIT

// BEGINNING OF DELETE FUNCTION/request
$('.delete').click(function (event) {
  let id = $(this).data('id');
  let name = $(`#name${id}`).html();
  let message = $(`#message${id}`).html();

  $.ajax({
    contentType: 'application/json',
    type: 'DELETE',
    url: `/messages/${id}`
  }).done((data) => {
    window.location.href='/';
  }).fail((err) => {
    console.log(err);
  }); // END OF DELETE REQUEST
}); // END OF DELETE FUNCTION

// BEGINNING OF POST
$('#postButton').click(function (event) {  // setting up function with variables
  event.preventDefault();
  let name = $('#name').val();
  let message = $('#message').val();

  $.ajax({
    contentType: 'application/json',
    type: 'POST',
    url: '/messages',
    data: JSON.stringify({name, message})
  }).done((data) => {   // Promise Callback...when its done, do this function...
    window.location.href = '/';  // This is the entire path reassigned to '/'
  }).fail((err) => {
    console.log(err);
  }); // END OF AJAX CALL
}); // END OF POST

// BEGINNING OF PATCH REQUEST
$('#editButton').click(function() {  // setting up the variables for the Patch
  event.preventDefault();
  let id = $('#edit-id').val();
  let name = $('#name').val();
  let message = $('#message').val();

  $.ajax(
    {
      url: `/messages/${id}`,
      type: 'PATCH',
      data: {name, message}
    }).then((data) => {
      window.location.href = '/';
    }).fail((err) => {
      console.log(err);
    });
  $('#name').val('');
  $('#message').val('');
});  // END OF PATCH

}) // END OF DONE FUNCTION IN GET REQUEST
.fail((err) => {
  console.log(err);
});  // END OF GET REQUEST

function createTable(id, name, message){   // This creates each line of the table shown on the landing page
  return $(`<p id="message${id}">${id} - <span id="name${id}">${name}</span> - <span id="messages${id}">${message}</span> - <button class="edit" data-id="${id}">Edit</button> - <button class="delete" data-id=${id}>Delete</button>`);
}  // END OF CREATETABLE FUNCTION

}); // End of JQUERY
