$(document).ready(function ()
     {
         var url = "https://api.themoviedb.org/3/trending/person/day";

		 $("#books").html("Loading ...");
		 $.ajax({
			 type: "GET",
			 url: url,
			 beforeSend: function (xhr) {
				 xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQwN2E5OWRlYTUyNGQ3ZWViYzM3MDFlODAyNmM4MyIsInN1YiI6IjY0YmIzNjc0OWQ1OTJjMDBhZTg1YTdmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MlyY2rxFcFOd-MJgoUqVLqzvrJTFTDf4OplLuP7e51U");
			 }
		 }).done(function (jsonData) {
			 $("#books").html("<h2>Popular People</h2>");
			 $.each(jsonData.results, function (index, book)
             {
				 var url = "https://image.tmdb.org/t/p/w500" + book.profile_path;
				 var error = " onerror=\"this.onerror=null; this.src='default.png'\""
                 $("#books").append("<img class='bookicon' id='" + book.id + "' src='" + url + "' " + error + "width=80 />");
             });
             $(".bookicon").on('click', function () { getBookDetails($(this).attr("id")); });
		 });
		 

     });

     function getBookDetails(id)
     {
		 var url = 'https://api.themoviedb.org/3/person/' + id;
		 
		 $.ajax({
			 type: "GET",
			 url: url,
			 beforeSend: function (xhr) {
				 xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQwN2E5OWRlYTUyNGQ3ZWViYzM3MDFlODAyNmM4MyIsInN1YiI6IjY0YmIzNjc0OWQ1OTJjMDBhZTg1YTdmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MlyY2rxFcFOd-MJgoUqVLqzvrJTFTDf4OplLuP7e51U");
			 }
		 }).done(function (json) {
			  var image_url = "https://image.tmdb.org/t/p/w500" + json.profile_path;
			  $('#person').html('<image width="100" height="100" src="' + image_url + '" />');
			  $('#person').append('<p> <strong>Name :</strong> ' + json.name+ '</p>');
			  $('#person').append('<p> <strong>Biography:</strong> ' + json.biography+ '</p>');
			  $('#person').append('<p> <strong>Birthday:</strong> ' + json.birthday+ '</p>');
			  $('#person').append('<p> <strong>Department:</strong> ' + json.known_for_department+ '</p>');
			  $('#person').append('<p> <strong>Place of Birth:</strong> ' + json.place_of_birth+ '</p>');
			  $('#person').append('<p> <strong>Popularity:</strong> ' + json.popularity+ '</p>');
		 });
     }



