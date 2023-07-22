$(document).ready(function ()
     {
         var servicesite="https://api.themoviedb.org/3/search/tv?query=";

		 $("#btn_search_tv").click(function ()
         {
            var url=servicesite + $("#txt_search").val() + "&api_key=bdd07a99dea524d7eebc3701e8026c83";
			searchBooks(url);
			
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

     function getBookDetails(id)
     {
		 var url = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=bdd07a99dea524d7eebc3701e8026c83';
		  $.getJSON(url, function(json) {
			  var image_url = "https://image.tmdb.org/t/p/w500" + json.poster_path;
			  $('#single_show').html('<image width="100" height="100" src="' + image_url + '" />');
			  $('#single_show').append('<p> <strong>Title :</strong> ' + json.name+ '</p>');
			  $('#single_show').append('<p> <strong>Original Language:</strong> ' + json.original_language+ '</p>');
			  $('#single_show').append('<p> <strong>Overview:</strong> ' + json.overview+ '</p>');
			  $('#single_show').append('<p> <strong>First Air Date:</strong> ' + json.first_air_date+ '</p>');
			  $('#single_show').append('<p> <strong>Last Air Date:</strong> ' + json.last_air_date+ '</p>');
			  $('#single_show').append('<p> <strong>Number of Episodes:</strong> ' + json.number_of_episodes+ '</p>');
			  $('#single_show').append('<p> <strong>Number of Seasons:</strong> ' + json.number_of_seasons+ '</p>');
			  $('#single_show').append('<p> <strong>Status:</strong> ' + json.status+ '</p>');
			  $('#single_show').append('<p> <strong>Type:</strong> ' + json.type+ '</p>');
			  $('#single_show').append('<p> <strong>Popularity:</strong> ' + json.popularity+ '</p>');
			  $('#single_show').append('<p> <strong>Vote Average:</strong> ' + json.vote_average+ '</p>');
			  $('#single_show').append('<p> <strong>Vote Count:</strong> ' + json.vote_count+ '</p>');
		   });
     }


