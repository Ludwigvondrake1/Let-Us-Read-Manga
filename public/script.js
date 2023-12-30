async function searchManga() {
    const mangaTitle = document.getElementById("txtMangaSearch").value; // Use value to get input value
   const col3 = document.querySelectorAll('.col-3');

  col3.forEach(col3 => {
    col3.remove();
});
    try {
       
      const response = await fetch(`https://api.mangadex.org/manga?limit=100&title=${mangaTitle}`); // Replace with your server URL
      if (response.ok) {
        const data = await response.json();
        const element = document.getElementById("searchedrow");
        for(i=0;i<data.data.length;i++){
            getMangaArtCover(data.data[i].id,element,data.data[i].attributes.title.en)
            console.log(data.data[i].id,element,data.data[i].attributes.title.en)
        }

       ; // Handle manga data here
  
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
async function getMangaArtCover(id,element,title){
    try{  
        const response = await fetch(`https://api.mangadex.org/cover?limit=10&manga%5B%5D=${id}&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5Bvolume%5D=asc&includes%5B%5D=manga`); 
        if (response.ok) {
          const data = await response.json();
          console.log(data.data[0].attributes); // Handle manga data here
          var filename = (data.data[0].attributes.fileName)
          var srcname = `https://uploads.mangadex.org/covers/${id}/${filename}`

          

          const anc = document.createElement("a");

          const manga_id = id;
          const manga_cover = filename;
          const manga_title = title;

          anc.href = `mangainfo?id=${manga_id}&filename=${manga_cover}&title=${manga_title}`
          anc.target = "_blank"

      
        
          const div = document.createElement("div");
          div.classList.add("col-3");
          div.style.height = "400px";
          const h3 = document.createElement("h3");
          h3.textContent = title
          
         

          const img = document.createElement("img");
          img.src = srcname
          img.height = "200"
          img.width = "200"



        
          anc.appendChild(img);
          anc.appendChild(h3);
          div.appendChild(anc);

          element.appendChild(div);
       } else {
        throw new Error('Network response was not ok.');
      }}catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    } 


    function getVariablesFromUrl() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
  
      const variables = {};
  
      for (const [key, value] of urlParams.entries()) {
          variables[key] = value;
      }
  
      return variables;
  }
 

       

  
