$(document).ready(function ()
     {
         var servicesite="https://api.themoviedb.org/3/search/movie?query=";

		 $("#btn_search").click(function ()
         {
            var url=servicesite + $("#txt_search").val() + "&api_key=bdd07a99dea524d7eebc3701e8026c83";
			searchBooks(url);
			
			document.getElementById("pages").style.visibility = "visible";
			$("#pages").html("Pages: ");
			for (i=1;i<=5;i++)
				if (i == 1) 
				{
					$("#pages").append("<a class='page active' href='#'>"+i+"</a> ");
				} else 
				{
					$("#pages").append("<a class='page' href='#'>"+i+"</a> ");
				}
				
         });
		 
		 $("#btn_popular_movie").click(function ()
         {
			searchPopularMovies();
			document.getElementById("pages").style.visibility = "hidden";
         });
		 
		 $("#pages").on('click', function (event)
         {
             var number = event.target.textContent;
			 var current = document.getElementsByClassName("active");
			 var pages = document.getElementsByClassName("page");
			 current[1].className = current[1].className.replace(" active", "");
			 pages[number-1].className += " active";
             var url=servicesite + $("#txt_search").val()+"&page="+(number) + "&api_key=bdd07a99dea524d7eebc3701e8026c83";
             searchBooks(url);
         });

     });

     function searchBooks(servicePoint)
     {
         $("#books").html("Loading ...");
         $.getJSON(servicePoint, function (jsonData)
         {
             $("#books").html("<h2>Results</h2>");
             $.each(jsonData.results, function (index, book)
             {
				 var url = "https://image.tmdb.org/t/p/w500" + book.poster_path;
				 var error = " onerror=\"this.onerror=null; this.src='default.png'\""
                 $("#books").append("<img class='bookicon' id='" + book.id + "' src='" + url + "' " + error + "width=80 />");
             });
             $(".bookicon").on('click', function () { getBookDetails($(this).attr("id")); });
         });
     }
	 
	 function searchPopularMovies()
     {
		 var url = "https://api.themoviedb.org/3/movie/popular";
         $("#books").html("Loading ...");
		 $.ajax({
			 type: "GET",
			 url: url,
			 beforeSend: function (xhr) {
				 xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQwN2E5OWRlYTUyNGQ3ZWViYzM3MDFlODAyNmM4MyIsInN1YiI6IjY0YmIzNjc0OWQ1OTJjMDBhZTg1YTdmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MlyY2rxFcFOd-MJgoUqVLqzvrJTFTDf4OplLuP7e51U");
			 }
		 }).done(function (jsonData) {
			 $("#books").html("<h2>Results</h2>");
			 $.each(jsonData.results, function (index, book)
             {
				 var url = "https://image.tmdb.org/t/p/w500" + book.poster_path;
				 var error = " onerror=\"this.onerror=null; this.src='default.png'\""
                 $("#books").append("<img class='bookicon' id='" + book.id + "' src='" + url + "' " + error + "width=80 />");
             });
             $(".bookicon").on('click', function () { getBookDetails($(this).attr("id")); });
		 });
     }

     function getBookDetails(id)
     {
		 var url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=bdd07a99dea524d7eebc3701e8026c83';
		  $.getJSON(url, function(json) {
			  var image_url = "https://image.tmdb.org/t/p/w500" + json.poster_path;
			  $('#single_book').html('<image width="100" height="100" src="' + image_url + '" />');
			  $('#single_book').append('<p> <strong>Title :</strong> ' + json.title+ '</p>');
			  $('#single_book').append('<p> <strong>Original Language:</strong> ' + json.original_language+ '</p>');
			  $('#single_book').append('<p> <strong>Overview:</strong> ' + json.overview+ '</p>');
			  $('#single_book').append('<p> <strong>Release Date:</strong> ' + json.release_date+ '</p>');
			  $('#single_book').append('<p> <strong>Popularity:</strong> ' + json.popularity+ '</p>');
			  $('#single_book').append('<p> <strong>Vote Average:</strong> ' + json.vote_average+ '</p>');
			  $('#single_book').append('<p> <strong>Vote Count:</strong> ' + json.vote_count+ '</p>');
		   });
     }

