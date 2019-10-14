function main(){
    var url = "https://www.googleapis.com/youtube/v3/search";
    var myKey = "AIzaSyA9eVmaUgRwBTJy-nbAlSGkLcNCSiigLsk";
    var nextPageToken = ""; //link from the JSON
    var prevPageToken = ""; //link from the JSON

    $("#searchBtn").on("click", function( event ){
        event.preventDefault();

        var queryTerm = $("#searchTerm").val();
        $("#videoList").html("");

        $.ajax({
            url: url,
            data : {
                q : queryTerm,
                part: "id, snippet",
                key : myKey,
                maxResults : 10,
            },
            dataType : "json",
            type : "GET",
            success : function(response){
              response.items.forEach((item)=>{
                      var newHTML = $(`<li>
                                          <p>${item.snippet.title}</p>
                                            <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                              <img src="${item.snippet.thumbnails.default.url}">
                                            </a>
                                      </li>`);
                      $("#videoList").append(newHTML);
              });
              //keep control of page token
              if(response.nextPageToken){
                      $("#nextPage").attr("class", "");
                      nextPageToken = response.nextPageToken;
              }else{
                      $("#nextPage").attr("class", "Hidden");
                      nextPageToken = "";
              }
              if(response.prevPageToken){
                      $("#prevPage").attr("class", "");
                      prevPageToken = response.prevPageToken;
              }else{
                      $("#prevPage").attr("class", "Hidden");
                      prevPageToken = "";
              }
            },
            error : function(err){
                console.log(err);
            }
        });

    });


    $("button").on("click", function( event ){
        event.preventDefault();

        $("#videoList").html("");
        var queryTerm = $("#searchTerm").val();

        var pageTK;
        // to target correct action (prev or next)
        if(event.target.id === "nextPage"){
            pageTK = nextPageToken;
        }else{
            pageTK = prevPageToken;
        }

        $.ajax({
            url : url,
            data : {
                q : queryTerm,
                part: "id, snippet",
                key : myKey,
                maxResults : 10,
                pageToken : pageTK,
            },
            dataType : "json",
            type : "GET",
            success : function(response){
              response.items.forEach((item)=>{
                      // add video to the list in the html
                      var newHTML = $(`<li>
                                          <p>${item.snippet.title}</p>
                                            <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                              <img src="${item.snippet.thumbnails.default.url}">
                                            </a>
                                      </li>`);
                      $("#videoList").append(newHTML);
              });
              //keep control of page token
              if(response.nextPageToken){
                      $("#nextPage").attr("class", "");
                      nextPageToken = response.nextPageToken;
              }else{
                      $("#nextPage").attr("class", "Hidden");
                      nextPageToken = "";
              }

              if(response.prevPageToken){
                      $("#prevPage").attr("class", "");
                      prevPageToken = response.prevPageToken;
              }else{
                      $("#prevPage").attr("class", "Hidden");
                      prevPageToken = "";
              }

            },
            error : function(err){
                console.log(err);
            }

        });
    });
}

main();
