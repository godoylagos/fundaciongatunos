$(document).ready(function() {
    // Contact form

			$("#submit_btn").on("click", function() {

			var proceed = true;
			//simple validation at client's end
			//loop through each field and we simply change border color to red for invalid fields		
			$("#contact_form input[required], #contact_form textarea[required]").each(function() {
			$(this).css('border-color', '');
			if (!$.trim($(this).val())) { //if this field is empty 
			  $(this).css('border-color', '#e44747');
			  $("#contact_results").html('<br><div class="alert alert-danger">Por favor complete los campos requeridos.</div>').show();
			  
			  proceed = false; //set do not proceed flag
			}
			//check mail invalido
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if ($(this).attr("type") === "email" && !email_reg.test($.trim($(this).val()))) {
				$(this).css('border-color', '#e44747'); 
				$("#contact_results").html('<br><div class="alert alert-danger">Por favor ingresa un email válido.</div>').show();
				proceed = false; //set do not proceed flag				
			}

			//check telefono
			var telefono_reg = /^([\w-\.]+[\w-]{2,4})?$/;
			if ($(this).attr("type") === "telefono" && !telefono_reg.test($.trim($(this).val()))) {
				$(this).css('border-color', '#e44747'); 
				$("#contact_results").html('<br><div class="alert alert-danger">Por favor ingresa un teléfono válido.</div>').show();
				proceed = false; //set do not proceed flag				
			}

			});

			if (proceed) //everything looks good! proceed...
			{
			//get input field values data to be sent to server
			var post_data = {
				'user_name': $('input[name=name]').val(),
				'user_run': $('input[name=run]').val(),
				'user_nacimiento': $('input[name=nacimiento]').val(),
				'regiones': $('select[name=regiones]').val(),
				'comunas': $('select[name=comunas]').val()
			};

			//Ajax post data to server
			$.post('php/sendmail.php', post_data, function(response) {
				if (response.type === 'error') { //load json data from server and output message     
					var output = '<br><div class="alert">' + response.text + '</div>';
				} else {
					var output = '<br><div class="success">' + response.text + '</div>';
					//reset values in all input fields
					$("#contact_form input, #contact_form textarea").val('');

				}

				$("#contact_results").hide().html(output).slideDown();
			}, 'json');
			}
			});

			//reset previously set border colors and hide all message on .keyup()
			$("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() {
			$(this).css('background-color', '');
			$("#result").slideUp();
			});
});
